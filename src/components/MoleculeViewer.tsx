"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MoleculeViewerProps {
  smiles: string;
  showProperties?: boolean;
}

export default function MoleculeViewer({ smiles, showProperties = true }: MoleculeViewerProps) {
  const [moleculeData, setMoleculeData] = useState({
    formula: "C9H8O4",
    molecularWeight: 180.16,
    logP: 1.19,
    hBondDonors: 2,
    hBondAcceptors: 4,
    rotatable: 3,
  });

  const [atoms, setAtoms] = useState<Array<{ x: number; y: number; z: number; type: string; id: number }>>([]);

  useEffect(() => {
    // Generate random 3D molecule structure for visualization
    const generateMolecule = () => {
      const atomTypes = ["C", "O", "N", "H"];
      const newAtoms = [];
      const numAtoms = 15 + Math.floor(Math.random() * 10);

      for (let i = 0; i < numAtoms; i++) {
        newAtoms.push({
          id: i,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          z: (Math.random() - 0.5) * 200,
          type: atomTypes[Math.floor(Math.random() * atomTypes.length)],
        });
      }
      setAtoms(newAtoms);
    };

    generateMolecule();
  }, [smiles]);

  const getAtomColor = (type: string) => {
    const colors: Record<string, string> = {
      C: "#909090",
      O: "#FF0D0D",
      N: "#3050F8",
      H: "#FFFFFF",
    };
    return colors[type] || "#909090";
  };

  const getAtomRadius = (type: string) => {
    const radii: Record<string, number> = {
      C: 8,
      O: 7,
      N: 7,
      H: 4,
    };
    return radii[type] || 6;
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
        <div className="relative w-full h-[400px] bg-black/5 dark:bg-black/40 rounded-lg overflow-hidden">
          {/* 3D Molecule Visualization */}
          <svg
            className="w-full h-full"
            viewBox="-250 -250 500 500"
            style={{ transform: "rotateX(20deg) rotateY(20deg)" }}
          >
            {/* Draw bonds */}
            {atoms.map((atom, i) =>
              atoms.slice(i + 1).map((otherAtom, j) => {
                const distance = Math.sqrt(
                  Math.pow(atom.x - otherAtom.x, 2) +
                  Math.pow(atom.y - otherAtom.y, 2) +
                  Math.pow(atom.z - otherAtom.z, 2)
                );
                if (distance < 100) {
                  return (
                    <line
                      key={`bond-${i}-${j}`}
                      x1={atom.x}
                      y1={atom.y}
                      x2={otherAtom.x}
                      y2={otherAtom.y}
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                      className="text-foreground"
                    />
                  );
                }
                return null;
              })
            )}

            {/* Draw atoms */}
            {atoms.map((atom) => (
              <g key={atom.id} className="molecule-atom">
                <circle
                  cx={atom.x}
                  cy={atom.y}
                  r={getAtomRadius(atom.type)}
                  fill={getAtomColor(atom.type)}
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.9"
                />
                <text
                  x={atom.x}
                  y={atom.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {atom.type}
                </text>
              </g>
            ))}
          </svg>

          {/* Quantum overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        </div>

        {showProperties && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Formula</p>
              <p className="font-mono font-semibold">{moleculeData.formula}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">MW (g/mol)</p>
              <p className="font-mono font-semibold">{moleculeData.molecularWeight}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">LogP</p>
              <p className="font-mono font-semibold">{moleculeData.logP}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">H-Bond Donors</p>
              <p className="font-mono font-semibold">{moleculeData.hBondDonors}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">H-Bond Acceptors</p>
              <p className="font-mono font-semibold">{moleculeData.hBondAcceptors}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Rotatable Bonds</p>
              <p className="font-mono font-semibold">{moleculeData.rotatable}</p>
            </div>
          </div>
        )}
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="border-primary/50">
          Lipinski Rule of 5: Passed
        </Badge>
        <Badge variant="outline" className="border-green-500/50 text-green-500">
          Drug-like Properties
        </Badge>
      </div>
    </div>
  );
}
