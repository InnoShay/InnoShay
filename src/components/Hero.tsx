import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load('https://prod.spline.design/b2TkwV9r1cxKpbgP/scene.splinecode');
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-bg-void overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} id="canvas3d" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-void/20 to-bg-void pointer-events-none" />
    </section>
  );
}
