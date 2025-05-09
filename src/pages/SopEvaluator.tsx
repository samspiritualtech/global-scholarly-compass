
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SopUploadForm from "@/components/sop/SopUploadForm";
import SopResult from "@/components/sop/SopResult";
import LoadingState from "@/components/common/LoadingState";
import { evaluateSop } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SopEvaluator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    sopText: string;
    evaluation: {
      strengths: string[];
      weaknesses: string[];
      suggestions: string[];
      overallScore: number;
    };
  } | null>(null);

  const handleSubmit = async (data: {
    text: string;
    university: string;
    program: string;
    file?: File;
  }) => {
    setIsLoading(true);
    console.log("📝 SOP submission data:", {
      textLength: data.text.length,
      university: data.university,
      program: data.program,
      hasFile: !!data.file
    });
  
    try {
      console.log("🔄 Calling Lyzr API...");
      
      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-mN5Stww5AFaPAVfPBXp4p5CjF6pYbsID'  // <-- YOUR API KEY HERE
        },
        body: JSON.stringify({
          user_id: "gunjanbajaj246@gmail.com",    // or dynamically add your user id
          agent_id: "680dcbc41358b393850cd2a",    // this agent id
          session_id: "680dcbc41358b393850cd2a",  // this session id
          message: data.text                     // pass your SOP text here
        })
      });
  
      console.log("✅ API Response received, status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Lyzr API error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("📊 Evaluation result:", result);
      
      setEvaluationResult(result);
      toast.success('SOP evaluation complete!');
    } catch (error) {
      console.error('❌ Evaluation error:', error);
      toast.error('Failed to evaluate SOP. Please try again.');
    } finally {
      setIsLoading(false);
      console.log("🏁 SOP evaluation process completed");
    }
  };
  
  const handleReset = () => {
    console.log("🔄 Resetting SOP evaluation");
    setEvaluationResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">SOP Evaluator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Get professional feedback on your Statement of Purpose
          </p>
          
          {isLoading ? (
            <LoadingState message="Analyzing your Statement of Purpose..." />
          ) : evaluationResult ? (
            <div className="space-y-6">
              <SopResult 
                sopText={evaluationResult.sopText}
                feedback={evaluationResult.evaluation}
              />
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:underline mt-4"
                >
                  Evaluate another SOP
                </button>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Statement of Purpose</CardTitle>
                <CardDescription>
                  Upload your SOP draft to receive detailed feedback and suggestions for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SopUploadForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
          )}

          {!evaluationResult && !isLoading && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">Upload Your SOP</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Upload your Statement of Purpose draft as text or a file
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">2</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">AI Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Our AI reviews your SOP for structure, content, and effectiveness
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">3</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">Get Feedback</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Receive detailed feedback with strengths, weaknesses, and suggestions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SopEvaluator;
