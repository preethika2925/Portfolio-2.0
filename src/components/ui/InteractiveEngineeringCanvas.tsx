'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Activity, Compass, Code2 } from 'lucide-react';

export const InteractiveEngineeringCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [frequency, setFrequency] = useState<number>(2.5);
  const [amplitude, setAmplitude] = useState<number>(28);
  const [activeLogic, setActiveLogic] = useState<'NAND' | 'XOR' | 'ADC' | 'PWM'>('NAND');
  const [pinState, setPinState] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Real-time Oscilloscope Signal Waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let step = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle oscilloscope grid lines
      ctx.strokeStyle = 'rgba(229, 229, 224, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);

      // Horizontal center & guide
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Vertical guides
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.setLineDash([]); // Reset dash

      // Draw Carrier Waveform
      ctx.lineWidth = 2.5;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#A7C7B5');
      gradient.addColorStop(0.5, '#171717');
      gradient.addColorStop(1, '#D8B8A5');
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        // Calculate interactive sinusoidal wave with harmonics
        const rad = (x / width) * Math.PI * 2 * frequency + step;
        const modulation = Math.sin(x * 0.02 + step * 0.5) * 6;
        const y = height / 2 + Math.sin(rad) * amplitude + modulation;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw leading probe glow point
      const probeX = ((step * 45) % width);
      const probeRad = (probeX / width) * Math.PI * 2 * frequency + step;
      const probeY = height / 2 + Math.sin(probeRad) * amplitude + Math.sin(probeX * 0.02 + step * 0.5) * 6;

      ctx.fillStyle = '#A7C7B5';
      ctx.beginPath();
      ctx.arc(probeX, probeY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(167, 199, 181, 0.3)';
      ctx.beginPath();
      ctx.arc(probeX, probeY, 9, 0, Math.PI * 2);
      ctx.fill();

      step += 0.035;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [frequency, amplitude]);

  // Subtle 3D tilt interaction based on mouse hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl bg-white border border-[#E5E5E0] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 flex flex-col justify-between overflow-hidden group select-none"
    >
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#A7C7B5]/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D8B8A5]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Header: System Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#E5E5E0] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#171717] font-semibold">
          <Activity className="w-4 h-4 text-[#A7C7B5] animate-pulse" />
          <span>ECE SIGNAL MATRIX</span>
        </div>
        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#F8F8F5] border border-[#E5E5E0] text-[#777777]">
          Live Telemetry
        </span>
      </div>

      {/* Middle Section 1: Real-time Oscilloscope */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#777777]">
          <span>Carrier Waveform (DSP)</span>
          <span className="text-[#171717] font-medium">{frequency.toFixed(1)}x Freq • {amplitude}px</span>
        </div>

        <div className="relative w-full h-32 rounded-2xl bg-[#F8F8F5] border border-[#E5E5E0] overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Interactive Wave Modulation Controls */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setFrequency((f) => (f >= 4.5 ? 1.5 : f + 1.0))}
            className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-[#E5E5E0] hover:border-[#171717] text-[10px] font-mono text-[#171717] transition-all"
          >
            Modulate Freq &rarr;
          </button>
          <button
            type="button"
            onClick={() => setAmplitude((a) => (a >= 38 ? 18 : a + 10))}
            className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-[#E5E5E0] hover:border-[#171717] text-[10px] font-mono text-[#171717] transition-all"
          >
            Modulate Amp &uarr;
          </button>
        </div>
      </div>

      {/* Middle Section 2: Interactive Hardware / Logic Register */}
      <div className="relative z-10 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#777777]">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#171717]" />
            Digital Logic Architecture
          </span>
          <button
            type="button"
            onClick={() => setPinState(!pinState)}
            className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
              pinState ? 'bg-[#A7C7B5]/20 text-[#171717] font-semibold' : 'bg-red-50 text-red-600'
            }`}
          >
            CLK: {pinState ? 'HIGH [1]' : 'LOW [0]'}
          </button>
        </div>

        {/* Logic Mode Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {(['NAND', 'XOR', 'ADC', 'PWM'] as const).map((logic) => (
            <button
              key={logic}
              type="button"
              onClick={() => setActiveLogic(logic)}
              className={`py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                activeLogic === logic
                  ? 'bg-[#171717] text-[#F8F8F5] shadow-sm'
                  : 'bg-[#F8F8F5] border border-[#E5E5E0] text-[#777777] hover:text-[#171717]'
              }`}
            >
              {logic}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Footer: ECE Coordinates & Academic Details */}
      <div className="relative z-10 pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-[11px] font-mono text-[#777777]">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#A7C7B5]" />
          <span>KIT • 11.0168° N</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#171717] font-medium">
          <Code2 className="w-3.5 h-3.5 text-[#A7C7B5]" />
          <span>Hardware &times; Code</span>
        </div>
      </div>
    </div>
  );
};
