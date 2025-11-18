"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  Atom, 
  Brain, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Activity,
  FileText
} from "lucide-react";
import Link from "next/link";
import MoleculeViewer from "@/components/MoleculeViewer";
import QuantumCircuit from "@/components/QuantumCircuit";

export default function ResultsPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const downloadReport = () => {
    // Mock download functionality
    alert("Report download initiated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-8 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold">Analysis Results</h1>
                <p className="text-sm text-muted-foreground">Aspirin (C9H8O4)</p>
              </div>
            </div>
            <Button onClick={downloadReport} className="gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">82.3%</p>
                  <p className="text-xs text-muted-foreground">Overall Score</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <div className="flex items-center gap-3">
                <Atom className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">85.6%</p>
                  <p className="text-xs text-muted-foreground">Quantum VQE</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">74.2%</p>
                  <p className="text-xs text-muted-foreground">ChemBERTa</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/30">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">-8.4</p>
                  <p className="text-xs text-muted-foreground">Binding (kcal/mol)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quantum">Quantum Analysis</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="confidence">Confidence</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Molecular Structure</h3>
                  <MoleculeViewer smiles="CC(=O)Oc1ccccc1C(=O)O" showProperties={false} />
                </Card>

                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Prediction Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Classical ML (ChemBERTa)</span>
                          <span className="text-sm font-bold">74.2%</span>
                        </div>
                        <Progress value={74.2} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Quantum VQE</span>
                          <span className="text-sm font-bold text-primary">85.6%</span>
                        </div>
                        <Progress value={85.6} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Ensemble Prediction</span>
                          <span className="text-sm font-bold text-green-500">82.3%</span>
                        </div>
                        <Progress value={82.3} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold mb-3">Key Insights</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <p className="text-sm">Quantum advantage: +11.4% improvement over classical</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <p className="text-sm">Strong binding affinity predicted (-8.4 kcal/mol)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <p className="text-sm">Moderate confidence interval (±5.2%)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Binding Affinity Details */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Binding Affinity Analysis</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Predicted Affinity</p>
                    <p className="text-3xl font-bold text-primary">-8.4</p>
                    <p className="text-xs text-muted-foreground">kcal/mol</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Confidence Interval</p>
                    <p className="text-3xl font-bold">±5.2%</p>
                    <p className="text-xs text-muted-foreground">95% CI</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">IC50 Estimate</p>
                    <p className="text-3xl font-bold">2.3</p>
                    <p className="text-xs text-muted-foreground">μM</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Quantum Analysis Tab */}
            <TabsContent value="quantum" className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">VQE Circuit Details</h3>
                <QuantumCircuit qubits={4} depth={6} />
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quantum Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm">Ground State Energy</span>
                      <span className="font-mono font-bold">-1.8562 Ha</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm">Iterations to Convergence</span>
                      <span className="font-mono font-bold">142</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm">Fidelity</span>
                      <span className="font-mono font-bold">0.9843</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quantum Advantage</span>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                        +11.4%
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Circuit Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm">Total Qubits</span>
                      <span className="font-mono font-bold">4</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm">Gate Count</span>
                      <span className="font-mono font-bold">24</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm">Circuit Depth</span>
                      <span className="font-mono font-bold">6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Execution Time</span>
                      <span className="font-mono font-bold">1.84s</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Physicochemical Properties</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Molecular Formula", value: "C9H8O4" },
                      { label: "Molecular Weight", value: "180.16 g/mol" },
                      { label: "LogP (Lipophilicity)", value: "1.19" },
                      { label: "Polar Surface Area", value: "63.6 Ų" },
                      { label: "H-Bond Donors", value: "2" },
                      { label: "H-Bond Acceptors", value: "4" },
                      { label: "Rotatable Bonds", value: "3" },
                      { label: "Aromatic Rings", value: "1" },
                    ].map((prop, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">{prop.label}</span>
                        <span className="font-mono font-semibold">{prop.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Drug-likeness Rules</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Lipinski's Rule of Five</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">All criteria passed (4/4)</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Veber's Rules</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">All criteria passed (2/2)</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Synthetic Accessibility</span>
                        <Badge variant="outline" className="border-green-500/50 text-green-500">Easy</Badge>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Score: 2.3/10 (lower is easier)</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">ADMET Predictions</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "Absorption", value: "High", color: "green" },
                    { label: "Distribution", value: "Good", color: "green" },
                    { label: "Metabolism", value: "Moderate", color: "yellow" },
                    { label: "Toxicity", value: "Low", color: "green" },
                  ].map((admet, i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-secondary/20 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">{admet.label}</p>
                      <Badge 
                        variant="outline" 
                        className={`border-${admet.color}-500/50 text-${admet.color}-500`}
                      >
                        {admet.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Confidence Tab */}
            <TabsContent value="confidence" className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Confidence Analysis</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Confidence</span>
                      <span className="text-sm font-bold">High (82.3%)</span>
                    </div>
                    <Progress value={82.3} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Lower Bound (95% CI)</p>
                      <p className="text-2xl font-bold">77.1%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <p className="text-sm text-muted-foreground mb-1">Mean Prediction</p>
                      <p className="text-2xl font-bold text-primary">82.3%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Upper Bound (95% CI)</p>
                      <p className="text-2xl font-bold">87.5%</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Model Uncertainty Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { model: "ChemBERTa Transformer", confidence: 74.2, uncertainty: 8.3 },
                    { model: "Quantum VQE", confidence: 85.6, uncertainty: 4.1 },
                    { model: "Ensemble (Weighted)", confidence: 82.3, uncertainty: 5.2 },
                  ].map((model, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{model.model}</span>
                        <span className="text-sm text-muted-foreground">±{model.uncertainty}%</span>
                      </div>
                      <Progress value={model.confidence} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Download Section */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-10 h-10 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Export Full Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Download comprehensive report with all metrics and visualizations
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadReport}>
                  PDF Report
                </Button>
                <Button onClick={downloadReport} className="gap-2">
                  <Download className="w-4 h-4" />
                  JSON Data
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
