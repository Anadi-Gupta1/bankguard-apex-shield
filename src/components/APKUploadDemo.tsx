import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Shield, AlertTriangle, CheckCircle, FileX, Trash2, Archive } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface AnalysisStep {
  name: string;
  status: "pending" | "running" | "complete" | "failed";
  progress: number;
}

export const APKUploadDemo = () => {
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    threatLevel: "safe" | "medium" | "high" | "critical";
    confidence: number;
    malwareType?: string;
    details: string;
  } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      startAnalysis(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.android.package-archive': ['.apk']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  const startAnalysis = (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    const steps: AnalysisStep[] = [
      { name: "File Validation", status: "pending", progress: 0 },
      { name: "Static Code Analysis", status: "pending", progress: 0 },
      { name: "Dynamic Behavior Analysis", status: "pending", progress: 0 },
      { name: "AI Threat Assessment", status: "pending", progress: 0 },
      { name: "Threat Intelligence Check", status: "pending", progress: 0 }
    ];
    
    setAnalysisSteps(steps);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnalysisSteps(prev => 
          prev.map((s, i) => 
            i === index ? { ...s, status: "running" } : s
          )
        );

        // Simulate progress
        const progressInterval = setInterval(() => {
          setAnalysisSteps(prev => 
            prev.map((s, i) => {
              if (i === index && s.progress < 100) {
                return { ...s, progress: s.progress + 10 };
              }
              return s;
            })
          );
        }, 100);

        setTimeout(() => {
          clearInterval(progressInterval);
          setAnalysisSteps(prev => 
            prev.map((s, i) => 
              i === index ? { ...s, status: "complete", progress: 100 } : s
            )
          );

          if (index === steps.length - 1) {
            // Analysis complete
            setTimeout(() => {
              setIsAnalyzing(false);
              // Simulate different threat levels based on filename
              const isMalicious = file.name.toLowerCase().includes('malware') || 
                               file.name.toLowerCase().includes('virus') ||
                               Math.random() > 0.7;
              
              if (isMalicious) {
                setAnalysisResult({
                  threatLevel: "critical",
                  confidence: 95,
                  malwareType: "Banking Trojan",
                  details: "This APK contains malicious code designed to steal banking credentials and perform unauthorized transactions."
                });
              } else {
                setAnalysisResult({
                  threatLevel: "safe",
                  confidence: 98,
                  details: "This APK appears to be legitimate with no detected threats. All security checks passed successfully."
                });
              }
            }, 500);
          }
        }, 1000 + Math.random() * 1000);
      }, index * 800);
    });
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "critical": return "text-destructive";
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "safe": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getThreatIcon = (level: string) => {
    switch (level) {
      case "critical": return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case "high": return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case "medium": return <Shield className="h-6 w-6 text-warning" />;
      case "safe": return <CheckCircle className="h-6 w-6 text-success" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 surface-elevated">
        <div className="text-center space-y-4 mb-6">
          <h2 className="text-2xl font-bold">Live APK Threat Detection Demo</h2>
          <p className="text-muted-foreground">
            Upload an APK file to see BankGuard AI analyze it in real-time using advanced threat detection
          </p>
        </div>

        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer transition-smooth hover:border-primary/50 ${
            isDragActive ? 'border-primary bg-primary/5' : ''
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg">Drop the APK file here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-lg">Drag & drop an APK file here, or click to select</p>
              <p className="text-sm text-muted-foreground">Maximum file size: 500MB</p>
            </div>
          )}
        </div>

        {uploadedFile && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileX className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setUploadedFile(null);
                  setAnalysisSteps([]);
                  setAnalysisResult(null);
                  setIsAnalyzing(false);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </Card>

      {analysisSteps.length > 0 && (
        <Card className="p-6 surface-elevated">
          <h3 className="text-lg font-semibold mb-4">Real-Time Analysis Progress</h3>
          <div className="space-y-4">
            {analysisSteps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{step.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    step.status === 'complete' ? 'bg-success/20 text-success' :
                    step.status === 'running' ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {step.status}
                  </span>
                </div>
                <Progress value={step.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {analysisResult && (
        <Card className="p-6 surface-elevated">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {getThreatIcon(analysisResult.threatLevel)}
              <div>
                <h3 className="text-lg font-semibold">Analysis Complete</h3>
                <p className={`text-sm font-medium ${getThreatColor(analysisResult.threatLevel)}`}>
                  Threat Level: {analysisResult.threatLevel.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-2xl font-bold">{analysisResult.confidence}%</p>
              </div>
              {analysisResult.malwareType && (
                <div>
                  <p className="text-sm text-muted-foreground">Malware Type</p>
                  <p className="text-lg font-semibold text-destructive">{analysisResult.malwareType}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">{analysisResult.details}</p>
            </div>

            <div className="flex space-x-2">
              {analysisResult.threatLevel === "critical" || analysisResult.threatLevel === "high" ? (
                <>
                  <Button variant="emergency" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Auto-Quarantined
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="success" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Allow Install
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Report
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};