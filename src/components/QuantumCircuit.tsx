"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Cpu } from "lucide-react";

interface QuantumCircuitProps {
  qubits?: number;
  depth?: number;
  showEnergy?: boolean;
}

export default function QuantumCircuit({ qubits = 4, depth = 6, showEnergy = true }: QuantumCircuitProps) {
  const [energy, setEnergy] = useState<number>(-1.8562);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Simulate VQE energy calculation
    setIsCalculating(true);
    const timer = setTimeout(() => {
      setEnergy(-1.8562 + (Math.random() - 0.5) * 0.1);
      setIsCalculating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [qubits, depth]);

  const gates = ["H", "RY", "RZ", "CNOT", "X", "Y", "Z"];
  const circuitWidth = 800;
  const qubitSpacing = 80;
  const gateSpacing = 120;

  // Generate random circuit layout
  const circuitGates = Array.from({ length: depth }, (_, col) =>
    Array.from({ length: qubits }, (_, row) => {
      const gateType = gates[Math.floor(Math.random() * gates.length)];
      return {
        type: gateType,
        qubit: row,
        col: col,
        rotation: gateType.startsWith("R") ? (Math.random() * Math.PI).toFixed(2) : null,
      };
    })
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-primary/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">VQE Quantum Circuit</h3>
          </div>
          {showEnergy && (
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-primary/50">
                {qubits} Qubits
              </Badge>
              <div className="px-3 py-1 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono">
                    E = {isCalculating ? "..." : energy.toFixed(4)} Ha
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Circuit Visualization */}
        <div className="relative w-full overflow-x-auto bg-black/5 dark:bg-black/40 rounded-lg p-6">
          <svg
            width={circuitWidth}
            height={qubits * qubitSpacing + 40}
            className="mx-auto"
          >
            {/* Qubit lines */}
            {Array.from({ length: qubits }).map((_, i) => (
              <g key={`qubit-${i}`}>
                <line
                  x1={40}
                  y1={40 + i * qubitSpacing}
                  x2={circuitWidth - 40}
                  y2={40 + i * qubitSpacing}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary/30 quantum-circuit-line"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                <text
                  x={20}
                  y={40 + i * qubitSpacing}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-current text-foreground"
                >
                  q{i}
                </text>
              </g>
            ))}

            {/* Gates */}
            {circuitGates.map((column, colIdx) =>
              column.map((gate, rowIdx) => {
                const x = 80 + colIdx * gateSpacing;
                const y = 40 + gate.qubit * qubitSpacing;

                if (gate.type === "CNOT") {
                  // Draw CNOT gate
                  const targetQubit = (gate.qubit + 1) % qubits;
                  const targetY = 40 + targetQubit * qubitSpacing;
                  return (
                    <g key={`gate-${colIdx}-${rowIdx}`}>
                      <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2={targetY}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="currentColor"
                        className="text-primary"
                      />
                      <circle
                        cx={x}
                        cy={targetY}
                        r="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                      <line
                        x1={x}
                        y1={targetY - 10}
                        x2={x}
                        y2={targetY + 10}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                      <line
                        x1={x - 10}
                        y1={targetY}
                        x2={x + 10}
                        y2={targetY}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                    </g>
                  );
                }

                return (
                  <g key={`gate-${colIdx}-${rowIdx}`}>
                    <rect
                      x={x - 20}
                      y={y - 15}
                      width="40"
                      height="30"
                      fill="currentColor"
                      className="text-primary/20"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                      rx="4"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-bold fill-current text-primary"
                    >
                      {gate.type}
                    </text>
                    {gate.rotation && (
                      <text
                        x={x}
                        y={y + 25}
                        textAnchor="middle"
                        className="text-[8px] fill-current text-muted-foreground"
                      >
                        θ={gate.rotation}
                      </text>
                    )}
                  </g>
                );
              })
            )}

            {/* Measurement */}
            {Array.from({ length: qubits }).map((_, i) => (
              <g key={`measure-${i}`}>
                <rect
                  x={circuitWidth - 100}
                  y={40 + i * qubitSpacing - 15}
                  width="50"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-foreground"
                  rx="4"
                />
                <path
                  d={`M ${circuitWidth - 90} ${40 + i * qubitSpacing + 5} Q ${circuitWidth - 75} ${40 + i * qubitSpacing - 10} ${circuitWidth - 60} ${40 + i * qubitSpacing + 5}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-foreground"
                />
                <line
                  x1={circuitWidth - 75}
                  y1={40 + i * qubitSpacing - 10}
                  x2={circuitWidth - 70}
                  y2={40 + i * qubitSpacing - 5}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-foreground"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Circuit stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{qubits}</p>
            <p className="text-xs text-muted-foreground">Qubits</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{depth * qubits}</p>
            <p className="text-xs text-muted-foreground">Gates</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{depth}</p>
            <p className="text-xs text-muted-foreground">Circuit Depth</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
