"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Atom, Sparkles, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import MoleculeInput from "@/components/MoleculeInput";
import MoleculeViewer from "@/components/MoleculeViewer";
import QuantumCircuit from "@/components/QuantumCircuit";
import PredictionResults from "@/components/PredictionResults";

export default function Home() {
  const [currentSmiles, setCurrentSmiles] = useState("CC(=O)Oc1ccccc1C(=O)O");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (smiles: string) => {
    setCurrentSmiles(smiles);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 text-primary" />
              Quantum-Enhanced Drug Discovery Platform
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Accelerate Drug Discovery with Quantum Computing
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combine classical ChemBERTa predictions with quantum VQE calculations for unprecedented accuracy in molecular analysis
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/results">
                <Button size="lg" className="gap-2">
                  View Results
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Zap className="w-4 h-4" />
                Documentation
              </Button>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            {[
              { icon: Atom, label: "Quantum Qubits", value: "4-8" },
              { icon: Sparkles, label: "Accuracy Boost", value: "+11.4%" },
              { icon: TrendingUp, label: "Molecules Analyzed", value: "10K+" },
              { icon: Zap, label: "Avg. Processing", value: "<2s" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Molecule Input */}
          <MoleculeInput onAnalyze={handleAnalyze} />

          {/* Analysis Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Atom className="w-6 h-6 text-primary" />
                  Molecular Structure
                </h2>
                <MoleculeViewer smiles={currentSmiles} />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  AI Predictions
                </h2>
                <PredictionResults isAnalyzing={isAnalyzing} />
              </div>
            </div>
          </div>

          {/* Quantum Circuit Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Quantum VQE Circuit
            </h2>
            <QuantumCircuit qubits={4} depth={6} />
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 px-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
            <h3 className="text-2xl font-bold mb-2">Ready for detailed analysis?</h3>
            <p className="text-muted-foreground mb-6">
              View comprehensive results, confidence intervals, and downloadable reports
            </p>
            <Link href="/results">
              <Button size="lg" className="gap-2">
                View Detailed Results
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}