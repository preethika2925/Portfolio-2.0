'use client';

import React from 'react';

interface ProjectDiagramProps {
  projectId: string;
  className?: string;
}

export const ProjectDiagram: React.FC<ProjectDiagramProps> = ({ projectId, className = '' }) => {
  switch (projectId) {
    case 'agriguide':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#111813] select-none ${className}`}
          aria-label="AgriGuide Geospatial Radar Schematic"
        >
          <defs>
            <radialGradient id="agriGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A7C7B5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111813" stopOpacity="0" />
            </radialGradient>
            <style>
              {`
                @keyframes radarSpin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes pulseGlow {
                  0%, 100% { opacity: 0.3; transform: scale(0.96); }
                  50% { opacity: 0.8; transform: scale(1.04); }
                }
                .radar-beam {
                  transform-origin: 200px 120px;
                  animation: radarSpin 4s linear infinite;
                }
                .radar-pulse {
                  transform-origin: 200px 120px;
                  animation: pulseGlow 2.5s ease-in-out infinite;
                }
              `}
            </style>
          </defs>
          <rect width="400" height="240" fill="#0f1712" />
          <circle cx="200" cy="120" r="95" fill="url(#agriGlow)" className="radar-pulse" />
          {/* Radar Grid Circles */}
          <circle cx="200" cy="120" r="30" stroke="#A7C7B5" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4" />
          <circle cx="200" cy="120" r="60" stroke="#A7C7B5" strokeWidth="1" fill="none" opacity="0.3" />
          <circle cx="200" cy="120" r="90" stroke="#A7C7B5" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" />
          
          {/* Animated Radar Sweep Line */}
          <g className="radar-beam">
            <line x1="200" y1="120" x2="290" y2="120" stroke="#A7C7B5" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="200,120 285,100 285,140" fill="#A7C7B5" fillOpacity="0.12" />
          </g>

          {/* Farm Grid Polygons */}
          <path d="M120 70 L170 85 L155 130 L110 115 Z" fill="#A7C7B5" fillOpacity="0.18" stroke="#A7C7B5" strokeWidth="1.2" />
          <path d="M220 130 L275 110 L290 155 L240 170 Z" fill="#D8B8A5" fillOpacity="0.18" stroke="#D8B8A5" strokeWidth="1.2" />
          
          {/* Telemetry Node Points */}
          <circle cx="155" cy="100" r="4" fill="#A7C7B5" className="animate-ping" style={{ transformOrigin: '155px 100px', animationDuration: '3s' }} />
          <circle cx="155" cy="100" r="3" fill="#A7C7B5" />
          <circle cx="255" cy="140" r="3.5" fill="#D8B8A5" />
          <circle cx="200" cy="120" r="5" fill="#ffffff" />
          
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            GEOSPATIAL TELEMETRY • LIVE SCAN
          </text>
        </svg>
      );

    case 'agrigate':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#0d1612] select-none ${className}`}
          aria-label="AgriGate Market Yield Matrix"
        >
          <defs>
            <style>
              {`
                @keyframes flowDash {
                  to { stroke-dashoffset: -40; }
                }
                .flow-line {
                  stroke-dasharray: 6 6;
                  animation: flowDash 2s linear infinite;
                }
              `}
            </style>
          </defs>
          <rect width="400" height="240" fill="#0d1612" />
          {/* Grid lines */}
          <line x1="50" y1="180" x2="350" y2="180" stroke="#25382e" strokeWidth="1" />
          <line x1="50" y1="130" x2="350" y2="130" stroke="#25382e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="80" x2="350" y2="80" stroke="#25382e" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Flowing animated Trend curves */}
          <path
            d="M 60 160 Q 130 140, 200 95 T 340 55"
            fill="none"
            stroke="#A7C7B5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 60 170 Q 140 165, 210 130 T 340 90"
            fill="none"
            stroke="#D8B8A5"
            strokeWidth="1.8"
            className="flow-line"
          />
          
          {/* Nodes */}
          <circle cx="200" cy="95" r="5" fill="#A7C7B5" stroke="#0d1612" strokeWidth="2" />
          <circle cx="340" cy="55" r="5" fill="#ffffff" />
          <text x="210" y="90" fill="#A7C7B5" fontSize="9" fontFamily="monospace">
            Peak Demand: Organic Pulse
          </text>
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            MARKET DEMAND MATCHING ENGINE
          </text>
        </svg>
      );

    case 'dynamic-contact-book':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#0f141c] select-none ${className}`}
          aria-label="Hash Indexed Dynamic Contact Schematic"
        >
          <defs>
            <style>
              {`
                @keyframes pulsePointer {
                  0%, 100% { opacity: 0.4; stroke-dashoffset: 0; }
                  50% { opacity: 1; stroke-dashoffset: -12; }
                }
                .pointer-anim {
                  stroke-dasharray: 4 4;
                  animation: pulsePointer 1.8s ease-in-out infinite;
                }
              `}
            </style>
          </defs>
          <rect width="400" height="240" fill="#0f141c" />
          {/* Hash Buckets */}
          <g transform="translate(60, 50)">
            <rect x="0" y="0" width="70" height="26" rx="4" fill="#1b2433" stroke="#3b4d6b" strokeWidth="1" />
            <text x="35" y="16" fill="#A7C7B5" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Bucket[0]
            </text>
            <rect x="0" y="38" width="70" height="26" rx="4" fill="#1b2433" stroke="#A7C7B5" strokeWidth="1" />
            <text x="35" y="54" fill="#A7C7B5" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Bucket[1]
            </text>
            <rect x="0" y="76" width="70" height="26" rx="4" fill="#1b2433" stroke="#3b4d6b" strokeWidth="1" />
            <text x="35" y="92" fill="#A7C7B5" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Bucket[2]
            </text>
          </g>
          {/* Pointers to Linked Nodes */}
          <line x1="130" y1="63" x2="190" y2="63" stroke="#A7C7B5" strokeWidth="1.5" className="pointer-anim" />
          <line x1="130" y1="101" x2="190" y2="101" stroke="#A7C7B5" strokeWidth="1.5" className="pointer-anim" />
          {/* Nodes */}
          <rect x="190" y="50" width="110" height="26" rx="4" fill="#1e2d42" stroke="#A7C7B5" strokeWidth="1" />
          <text x="245" y="66" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
            Record: Node_A
          </text>
          <rect x="190" y="88" width="110" height="26" rx="4" fill="#1e2d42" stroke="#A7C7B5" strokeWidth="1" />
          <text x="245" y="104" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
            Record: Node_B
          </text>
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            O(1) HASH INDEXED LOOKUP
          </text>
        </svg>
      );

    case 'corporate-hierarchy-manager':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#181124] select-none ${className}`}
          aria-label="Organizational Hierarchy Tree Schematic"
        >
          <rect width="400" height="240" fill="#181124" />
          {/* Root Node */}
          <circle cx="200" cy="50" r="16" fill="#2d1f42" stroke="#A7C7B5" strokeWidth="1.5" />
          <text x="200" y="53" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
            CEO
          </text>
          {/* Lines */}
          <line x1="190" y1="64" x2="130" y2="110" stroke="#A7C7B5" strokeWidth="1.2" />
          <line x1="210" y1="64" x2="270" y2="110" stroke="#A7C7B5" strokeWidth="1.2" />
          {/* Tier 2 */}
          <circle cx="130" cy="115" r="14" fill="#2d1f42" stroke="#D8B8A5" strokeWidth="1.2" />
          <text x="130" y="118" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            DIR_E
          </text>
          <circle cx="270" cy="115" r="14" fill="#2d1f42" stroke="#D8B8A5" strokeWidth="1.2" />
          <text x="270" y="118" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            DIR_O
          </text>
          {/* Tier 3 */}
          <line x1="120" y1="127" x2="85" y2="165" stroke="#684e8a" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="140" y1="127" x2="170" y2="165" stroke="#684e8a" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="85" cy="170" r="10" fill="#231736" stroke="#8c6db5" strokeWidth="1" />
          <circle cx="170" cy="170" r="10" fill="#231736" stroke="#8c6db5" strokeWidth="1" />
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            N-ARY HIERARCHICAL TREE MODEL
          </text>
        </svg>
      );

    case 'plant-watering-iot':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#1c180e] select-none ${className}`}
          aria-label="Closed-Loop Watering Hardware Schematic"
        >
          <defs>
            <style>
              {`
                @keyframes pulseCurrent {
                  0% { stroke-dashoffset: 40; }
                  100% { stroke-dashoffset: 0; }
                }
                .current-pulse {
                  stroke-dasharray: 6 4;
                  animation: pulseCurrent 1.2s linear infinite;
                }
              `}
            </style>
          </defs>
          <rect width="400" height="240" fill="#1c180e" />
          {/* Sensor block */}
          <rect x="50" y="80" width="75" height="45" rx="4" fill="#2d2616" stroke="#D8B8A5" strokeWidth="1.2" />
          <text x="87" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
            SOIL PROBE
          </text>
          <text x="87" y="112" fill="#D8B8A5" fontSize="7" fontFamily="monospace" textAnchor="middle">
            Capacitive
          </text>
          {/* MCU block */}
          <rect x="165" y="70" width="85" height="65" rx="4" fill="#382e1b" stroke="#A7C7B5" strokeWidth="1.5" />
          <text x="207" y="98" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
            MCU CORE
          </text>
          <text x="207" y="112" fill="#A7C7B5" fontSize="7" fontFamily="monospace" textAnchor="middle">
            ADC Loop
          </text>
          {/* Actuator MOSFET */}
          <rect x="290" y="80" width="70" height="45" rx="4" fill="#2d2616" stroke="#D8B8A5" strokeWidth="1.2" />
          <text x="325" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
            MOSFET GATE
          </text>
          <text x="325" y="112" fill="#D8B8A5" fontSize="7" fontFamily="monospace" textAnchor="middle">
            Pump Drive
          </text>
          {/* Active current traces */}
          <line x1="125" y1="102" x2="165" y2="102" stroke="#A7C7B5" strokeWidth="2" className="current-pulse" />
          <line x1="250" y1="102" x2="290" y2="102" stroke="#D8B8A5" strokeWidth="2" className="current-pulse" />
          <text x="200" y="215" textAnchor="middle" fill="#D8B8A5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            CLOSED-LOOP SENSORY REGULATION
          </text>
        </svg>
      );

    case 'fault-isolation-assistant':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#18111c] select-none ${className}`}
          aria-label="Automated Fault Isolation Netlist"
        >
          <defs>
            <style>
              {`
                @keyframes faultBeacon {
                  0%, 100% { transform: scale(1); opacity: 0.6; }
                  50% { transform: scale(1.35); opacity: 0.1; }
                }
                .beacon {
                  transform-origin: 220px 100px;
                  animation: faultBeacon 1.6s ease-out infinite;
                }
              `}
            </style>
          </defs>
          <rect width="400" height="240" fill="#18111c" />
          {/* Circuit PCB Trace Simulation */}
          <path d="M 60 70 H 160 V 130 H 250 V 90 H 340" fill="none" stroke="#3d2a45" strokeWidth="4" />
          <path d="M 60 150 H 130 V 100 H 220 V 170 H 340" fill="none" stroke="#3d2a45" strokeWidth="4" />
          {/* Isolated fault beacon */}
          <circle cx="220" cy="100" r="10" fill="#5c1d2e" stroke="#ff5555" strokeWidth="1.5" />
          <circle cx="220" cy="100" r="18" fill="none" stroke="#ff5555" strokeWidth="1.5" className="beacon" />
          <text x="220" y="132" fill="#ff7777" fontSize="8" fontFamily="monospace" textAnchor="middle">
            FAULT LOCUS: HIGH Z
          </text>
          {/* Test Nodes */}
          <circle cx="160" cy="130" r="4" fill="#A7C7B5" />
          <circle cx="250" cy="90" r="4" fill="#A7C7B5" />
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            TOPOLOGICAL NETLIST FAULT TRACER
          </text>
        </svg>
      );

    case 'course-prerequisite-graph':
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#0c141c] select-none ${className}`}
          aria-label="DAG Course Prerequisite Topological Graph"
        >
          <rect width="400" height="240" fill="#0c141c" />
          {/* Nodes */}
          <circle cx="70" cy="120" r="16" fill="#1b2a3b" stroke="#A7C7B5" strokeWidth="1.5" />
          <text x="70" y="123" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            CS101
          </text>
          <circle cx="160" cy="70" r="16" fill="#1b2a3b" stroke="#A7C7B5" strokeWidth="1.5" />
          <text x="160" y="73" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            CS201
          </text>
          <circle cx="160" cy="170" r="16" fill="#1b2a3b" stroke="#D8B8A5" strokeWidth="1.5" />
          <text x="160" y="173" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            MATH
          </text>
          <circle cx="260" cy="120" r="16" fill="#1b2a3b" stroke="#A7C7B5" strokeWidth="1.5" />
          <text x="260" y="123" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            ALGO
          </text>
          <circle cx="340" cy="120" r="16" fill="#1b2a3b" stroke="#ffffff" strokeWidth="1.5" />
          <text x="340" y="123" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">
            GRAD
          </text>
          {/* Directed Arrows */}
          <line x1="86" y1="112" x2="144" y2="78" stroke="#A7C7B5" strokeWidth="1.5" />
          <line x1="86" y1="128" x2="144" y2="162" stroke="#D8B8A5" strokeWidth="1.5" />
          <line x1="176" y1="78" x2="244" y2="112" stroke="#A7C7B5" strokeWidth="1.5" />
          <line x1="176" y1="162" x2="244" y2="128" stroke="#D8B8A5" strokeWidth="1.5" />
          <line x1="276" y1="120" x2="324" y2="120" stroke="#ffffff" strokeWidth="1.5" />
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            DIRECTED ACYCLIC GRAPH (DAG)
          </text>
        </svg>
      );

    case 'expression-tree-calculator':
    default:
      return (
        <svg
          viewBox="0 0 400 240"
          className={`w-full h-full bg-[#0d1614] select-none ${className}`}
          aria-label="Binary Expression Tree Parser"
        >
          <rect width="400" height="240" fill="#0d1614" />
          {/* Root Operator */}
          <circle cx="200" cy="50" r="16" fill="#1f332c" stroke="#A7C7B5" strokeWidth="1.5" />
          <text x="200" y="54" fill="#ffffff" fontSize="12" fontFamily="monospace" textAnchor="middle">
            +
          </text>
          {/* Branches */}
          <line x1="188" y1="62" x2="135" y2="105" stroke="#A7C7B5" strokeWidth="1.2" />
          <line x1="212" y1="62" x2="265" y2="105" stroke="#A7C7B5" strokeWidth="1.2" />
          {/* Sub Operators */}
          <circle cx="130" cy="115" r="14" fill="#1f332c" stroke="#D8B8A5" strokeWidth="1.2" />
          <text x="130" y="119" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">
            *
          </text>
          <circle cx="270" cy="115" r="14" fill="#1f332c" stroke="#D8B8A5" strokeWidth="1.2" />
          <text x="270" y="119" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">
            /
          </text>
          {/* Leaves */}
          <line x1="120" y1="127" x2="90" y2="165" stroke="#48695d" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="140" y1="127" x2="165" y2="165" stroke="#48695d" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="90" cy="170" r="10" fill="#14211d" stroke="#A7C7B5" strokeWidth="1" />
          <text x="90" y="173" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
            A
          </text>
          <circle cx="165" cy="170" r="10" fill="#14211d" stroke="#A7C7B5" strokeWidth="1" />
          <text x="165" y="173" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
            B
          </text>
          <text x="200" y="215" textAnchor="middle" fill="#A7C7B5" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
            SYNTAX TREE ARITHMETIC PARSER
          </text>
        </svg>
      );
  }
};
