"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, Sparkles } from "lucide-react";

interface MoleculeInputProps {
  onAnalyze?: (smiles: string) => void;
}

export default function MoleculeInput({ onAnalyze }: MoleculeInputProps) {
  const [smiles, setSmiles] = useState("CC(=O)Oc1ccccc1C(=O)O");

  const exampleMolecules = [
    { name: "Aspirin", smiles: "CC(=O)Oc1ccccc1C(=O)O" },
    { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
    { name: "Ibuprofen", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O" },
    { name: "Penicillin", smiles: "CC1(C)SC2C(NC(=O)Cc3ccccc3)C(=O)N2C1C(=O)O" },
  ];

  const handleAnalyze = () => {
    if (onAnalyze) {
      onAnalyze(smiles);
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
      <div className="space-y-2">
        <Label htmlFor="smiles-input">SMILES String</Label>
        <div className="flex gap-2">
          <Input
            id="smiles-input"
            placeholder="Enter SMILES notation (e.g., CC(=O)Oc1ccccc1C(=O)O)"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            className="font-mono"
          />
          <Button onClick={handleAnalyze} className="gap-2">
            <Search className="w-4 h-4" />
            Analyze
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Quick Examples</Label>
        <div className="flex flex-wrap gap-2">
          {exampleMolecules.map((mol) => (
            <Button
              key={mol.name}
              variant="outline"
              size="sm"
              onClick={() => setSmiles(mol.smiles)}
              className="gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {mol.name}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
