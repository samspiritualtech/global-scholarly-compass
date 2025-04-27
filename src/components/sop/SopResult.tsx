
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Download, Copy } from "lucide-react";
import { toast } from "sonner";

interface SopResultProps {
  sopText: string;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    overallScore: number;
  };
}

const SopResult: React.FC<SopResultProps> = ({ sopText, feedback }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sopText);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([sopText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "statement-of-purpose.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded as TXT");
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sop" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sop">Statement of Purpose</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sop" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {sopText.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={downloadAsTxt}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback">
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Overall Score</div>
                <div className={`text-5xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                  {feedback.overallScore}/10
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {feedback.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Areas to Improve</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {feedback.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Suggestions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {feedback.suggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SopResult;
