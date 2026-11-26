import { useEffect, useRef } from "react";

const CELL = 12;
const LINE_GAP = 15;
const POINT_GAP = 8;
const FRAME_MS = 1000 / 30;

// A small, self-contained take on the pointer-wake effect used in the About section.
export default function RippleLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !section || !ctx) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    let visible = false;
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let current = new Float32Array(0);
    let previous = new Float32Array(0);
    let frame = 0;
    let lastFrame = 0;
    let activeUntil = 0;
    let lastInteraction = 0;
    let lastPointer: { x: number; y: number; time: number } | null = null;

    const sample = (x: number, y: number) => {
      const gx = x / CELL + 1;
      const gy = y / CELL + 1;
      const ix = Math.floor(gx);
      const iy = Math.floor(gy);
      const fx = gx - ix;
      const fy = gy - iy;
      const a = current[iy * columns + ix];
      const b = current[iy * columns + ix + 1];
      const c = current[(iy + 1) * columns + ix];
      const d = current[(iy + 1) * columns + ix + 1];
      return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      for (let y = LINE_GAP / 2; y < height; y += LINE_GAP) {
        for (let x = 0; x <= width + POINT_GAP; x += POINT_GAP) {
          const px = Math.min(x, width);
          const dy = Math.max(-14, Math.min(14, sample(px, y) * 10));
          if (x === 0) ctx.moveTo(px, y + dy);
          else ctx.lineTo(px, y + dy);
        }
      }
      ctx.strokeStyle = "rgba(91, 119, 132, .2)";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      if (reducedMotion) return;
      ctx.beginPath();
      for (let y = LINE_GAP / 2; y < height; y += LINE_GAP) {
        let previousX = 0;
        let previousY = y;
        let drawing = false;
        for (let x = 0; x <= width + POINT_GAP; x += POINT_GAP) {
          const px = Math.min(x, width);
          const wave = sample(px, y);
          const py = y + Math.max(-14, Math.min(14, wave * 10));
          if (Math.abs(wave) > 0.07) {
            if (!drawing) ctx.moveTo(previousX, previousY);
            ctx.lineTo(px, py);
            drawing = true;
          } else {
            drawing = false;
          }
          previousX = px;
          previousY = py;
        }
      }
      ctx.strokeStyle = "rgba(34, 132, 157, .6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const step = () => {
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < columns - 1; x++) {
          const i = y * columns + x;
          previous[i] = ((current[i - 1] + current[i + 1] + current[i - columns] + current[i + columns]) * 0.5 - previous[i]) * 0.984;
        }
      }
      [current, previous] = [previous, current];
    };

    const tick = (now: number) => {
      if (!visible || reducedMotion || document.hidden) {
        frame = 0;
        return;
      }
      if (now - lastFrame >= FRAME_MS) {
        lastFrame = now;
        if (now < activeUntil) {
          step();
          step();
        } else {
          current.fill(0);
          previous.fill(0);
        }
        draw();
      }
      frame = now < activeUntil ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame && visible && !reducedMotion && !document.hidden) {
        lastFrame = 0;
        frame = requestAnimationFrame(tick);
      }
    };

    const inject = (x: number, y: number, amount: number) => {
      if (!width || !height || reducedMotion || !visible) return;
      const gx = Math.round(x / CELL) + 1;
      const gy = Math.round(y / CELL) + 1;
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const cx = gx + dx;
          const cy = gy + dy;
          if (cx < 1 || cy < 1 || cx >= columns - 1 || cy >= rows - 1) continue;
          current[cy * columns + cx] += amount * Math.exp(-(dx * dx + dy * dy) / 5);
        }
      }
      activeUntil = performance.now() + 3300;
      wake();
    };

    const point = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top, time: event.timeStamp };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const next = point(event);
      if (lastPointer) {
        const distance = Math.hypot(next.x - lastPointer.x, next.y - lastPointer.y);
        const speed = distance / Math.max(8, next.time - lastPointer.time);
        const count = Math.min(18, Math.ceil(distance / CELL));
        if (count > 0 && distance > 3) {
          for (let i = 1; i <= count; i++) {
            const t = i / count;
            inject(lastPointer.x + (next.x - lastPointer.x) * t, lastPointer.y + (next.y - lastPointer.y) * t, -Math.min(0.32, 0.1 + speed * 0.12));
          }
        }
      }
      lastPointer = next;
      lastInteraction = performance.now();
    };

    const onPointerDown = (event: PointerEvent) => {
      const next = point(event);
      inject(next.x, next.y, -1.4);
      lastInteraction = performance.now();
    };

    const onPointerLeave = () => { lastPointer = null; };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(width / CELL) + 3;
      rows = Math.ceil(height / CELL) + 3;
      current = new Float32Array(columns * rows);
      previous = new Float32Array(columns * rows);
      draw();
    };

    const onMotionChange = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        cancelAnimationFrame(frame);
        frame = 0;
        current.fill(0);
        previous.fill(0);
        draw();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
        current.fill(0);
        previous.fill(0);
        draw();
        lastPointer = null;
      }
    });
    observer.observe(section);

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    resize();
    const intro = window.setTimeout(() => inject(width * 0.7, height * 0.52, -1.3), 1000);
    const ambient = window.setInterval(() => {
      if (visible && performance.now() - lastInteraction > 4500) {
        inject(width * (0.35 + Math.random() * 0.3), height * (0.25 + Math.random() * 0.5), -0.8);
      }
    }, 6500);

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerdown", onPointerDown, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    motionPreference.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(intro);
      window.clearInterval(ambient);
      observer.disconnect();
      sizeObserver.disconnect();
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerdown", onPointerDown);
      section.removeEventListener("pointerleave", onPointerLeave);
      motionPreference.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="ripple-lines pointer-events-none absolute -inset-x-6 -top-8 -bottom-10 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
