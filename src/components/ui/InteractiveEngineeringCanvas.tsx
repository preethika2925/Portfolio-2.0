'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Activity, Compass, Code2, Sliders, Zap } from 'lucide-react';
import { TextScramble } from './TextScramble';

export const InteractiveEngineeringCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [frequency, setFrequency] = useState<number>(2.5);
  const [amplitude, setAmplitude] = useState<number>(28);
  const [activeLogic, setActiveLogic] = useState<'NAND' | 'XOR' | 'ADC' | 'PWM'>('NAND');
  const [pinState, setPinState] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [canvasCursor, setCanvasCursor] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Real-time Oscilloscope Signal Waveform with Mouse Interaction
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

      // Subtle oscilloscope grid
      ctx.strokeStyle = 'rgba(229, 229, 224, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);

      // Horizontal center & guide
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Vertical grid guides
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.setLineDash([]); // Reset dash

      // Dynamic harmonic carrier wave
      ctx.lineWidth = 2.5;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#A7C7B5');
      gradient.addColorStop(0.5, '#171717');
      gradient.addColorStop(1, '#D8B8A5');
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        // Dynamic mouse proximity distortion
        let mouseMod = 0;
        if (canvasCursor.active) {
          const dist = Math.abs(x - canvasCursor.x);
          if (dist < 80) {
            mouseMod = (1 - dist / 80) * 16 * Math.sin(step * 4);
          }
        }

        const rad = (x / width) * Math.PI * 2 * frequency + step;
        const harmonics = Math.sin(x * 0.02 + step * 0.5) * 6;
        const y = height / 2 + Math.sin(rad) * amplitude + harmonics + mouseMod;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Interactive Crosshair if mouse is hovering over canvas
      if (canvasCursor.active) {
        ctx.strokeStyle = 'rgba(167, 199, 181, 0.6)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);

        // Crosshair vertical
        ctx.beginPath();
        ctx.moveTo(canvasCursor.x, 0);
        ctx.lineTo(canvasCursor.x, height);
        ctx.stroke();

        // Crosshair horizontal
        ctx.beginPath();
        ctx.moveTo(0, canvasCursor.y);
        ctx.lineTo(width, canvasCursor.y);
        ctx.stroke();

        ctx.setLineDash([]);

        // Crosshair target circle
        ctx.fillStyle = '#A7C7B5';
        ctx.beginPath();
        ctx.arc(canvasCursor.x, canvasCursor.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Leading traveling oscilloscope trace point
      const probeX = (step * 50) % width;
      const probeRad = (probeX / width) * Math.PI * 2 * frequency + step;
      const probeY =
        height / 2 +
        Math.sin(probeRad) * amplitude +
        Math.sin(probeX * 0.02 + step * 0.5) * 6;

      ctx.fillStyle = '#A7C7B5';
      ctx.beginPath();
      ctx.arc(probeX, probeY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(167, 199, 181, 0.35)';
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
  }, [frequency, amplitude, canvasCursor]);

  // 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setCanvasCursor({ x: 0, y: 0, active: false });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCanvasCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  // Logic equations based on active mode
  const getLogicFormula = () => {
    switch (activeLogic) {
      case 'NAND':
        return pinState ? 'Y = ¬(A ∧ B) = 1 (Active High)' : 'Y = ¬(A ∧ B) = 0';
      case 'XOR':
        return pinState ? 'Y = (A ⊕ B) = 1 (Parity Match)' : 'Y = (A ⊕ B) = 0';
      case 'ADC':
        return pinState ? 'SAR-ADC: 10-Bit [0x3B2] 2.85V' : 'SAR-ADC: [0x000] 0.00V';
      case 'PWM':
        return pinState ? 'Timer1: 82% Duty • 25kHz' : 'Timer1: 0% Duty • Standby';
    }
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
          <TextScramble text="ECE SIGNAL MATRIX" />
        </div>
        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#F8F8F5] border border-[#E5E5E0] text-[#777777] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A7C7B5] animate-ping" />
          Live Telemetry
        </span>
      </div>

      {/* Middle Section 1: Interactive Real-time Oscilloscope */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#777777]">
          <span>Carrier Waveform (DSP)</span>
          <span className="text-[#171717] font-medium">
            {frequency.toFixed(1)}x Freq • {amplitude}px
          </span>
        </div>

        <div
          className="relative w-full h-32 rounded-2xl bg-[#F8F8F5] border border-[#E5E5E0] overflow-hidden cursor-crosshair group/canvas"
          data-cursor-text="PROBE"
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setCanvasCursor({ x: 0, y: 0, active: false })}
            className="w-full h-full block"
          />

          {canvasCursor.active && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-mono text-[#A7C7B5] pointer-events-none">
              V_p: {(canvasCursor.y / 20).toFixed(2)}V • t: {canvasCursor.x}μs
            </div>
          )}
        </div>

        {/* Interactive Wave Modulation Controls */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setFrequency((f) => (f >= 4.5 ? 1.5 : f + 1.0))}
            className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-[#E5E5E0] hover:border-[#171717] text-[10px] font-mono text-[#171717] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3 h-3 text-[#A7C7B5]" />
            Modulate Freq &rarr;
          </button>
          <button
            type="button"
            onClick={() => setAmplitude((a) => (a >= 38 ? 18 : a + 10))}
            className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-[#E5E5E0] hover:border-[#171717] text-[10px] font-mono text-[#171717] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3 h-3 text-[#A7C7B5]" />
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
            className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors cursor-pointer ${
              pinState ? 'bg-[#A7C7B5]/25 text-[#171717] font-semibold' : 'bg-red-50 text-red-600'
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
              className={`py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeLogic === logic
                  ? 'bg-[#171717] text-[#F8F8F5] shadow-sm'
                  : 'bg-[#F8F8F5] border border-[#E5E5E0] text-[#777777] hover:text-[#171717]'
              }`}
            >
              {logic}
            </button>
          ))}
        </div>

        {/* Live Logic Output Display */}
        <div className="px-3 py-1.5 rounded-lg bg-[#F8F8F5] border border-[#E5E5E0] text-[10px] font-mono text-[#171717] flex items-center justify-between">
          <span className="text-[#777777]">Output:</span>
          <span className="font-semibold text-[#171717]">{getLogicFormula()}</span>
        </div>
      </div>

      {/* Bottom Footer: ECE Coordinates & Academic Details */}
      <div className="relative z-10 pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-[11px] font-mono text-[#777777]">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#A7C7B5]" />
          <span>KIT COIMBATORE • 11.0168° N</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#171717] font-medium">
          <Code2 className="w-3.5 h-3.5 text-[#A7C7B5]" />
          <span>Hardware &times; Code</span>
        </div>
      </div>
    </div>
  );
};
