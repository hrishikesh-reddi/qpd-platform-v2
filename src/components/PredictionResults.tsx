"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Brain, Atom } from "lucide-react";

interface PredictionResultsProps {
  classicalScore?: number;
  quantumScore?: number;
  ensembleScore?: number;
  isAnalyzing?: boolean;
}

export default function PredictionResults({
  classicalScore = 0.742,
  quantumScore = 0.856,
  ensembleScore = 0.823,
  isAnalyzing = false,
}: PredictionResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-500";
    if (score >= 0.6) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return "High Confidence";
    if (score >= 0.6) return "Moderate Confidence";
    return "Low Confidence";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-primary/30">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Drug-likeness Predictions</h3>
          <Badge variant="outline" className="border-primary/50">
            {isAnalyzing ? "Analyzing..." : "Complete"}
          </Badge>
        </div>

        {/* Classical ChemBERTa */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Classical (ChemBERTa)</span>
            </div>
            <span className={`text-sm font-bold ${getScoreColor(classicalScore)}`}>
              {(classicalScore * 100).toFixed(1)}%
            </span>
          </div>
          <Progress value={classicalScore * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">{getScoreLabel(classicalScore)}</p>
        </div>

        {/* Quantum VQE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Atom className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Quantum (VQE)</span>
            </div>
            <span className={`text-sm font-bold ${getScoreColor(quantumScore)}`}>
              {(quantumScore * 100).toFixed(1)}%
            </span>
          </div>
          <Progress value={quantumScore * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">{getScoreLabel(quantumScore)}</p>
        </div>

        {/* Ensemble */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Ensemble Prediction</span>
            </div>
            <span className={`text-sm font-bold ${getScoreColor(ensembleScore)}`}>
              {(ensembleScore * 100).toFixed(1)}%
            </span>
          </div>
          <Progress value={ensembleScore * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">{getScoreLabel(ensembleScore)}</p>
        </div>

        {/* Additional metrics */}
        <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Binding Affinity</p>
            <p className="text-lg font-bold text-primary">-8.4 kcal/mol</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Quantum Advantage</p>
            <p className="text-lg font-bold text-green-500">+11.4%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
