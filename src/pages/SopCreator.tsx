
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SopForm from "@/components/sop/SopForm";
import SopResult from "@/components/sop/SopResult";
import LoadingState from "@/components/common/LoadingState";
import { generateSop } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SopCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSop, setGeneratedSop] = useState<string | null>(null);

  const handleSubmit = async (answers: Record<string, string>) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call in production
      const sopText = await generateSop(answers);
      setGeneratedSop(sopText);
      toast.success("SOP generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate SOP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedSop(null);
  };

  // Mock feedback for generated SOP
  const mockFeedback = {
    strengths: [
      "Clear statement of academic goals and interests",
      "Well-structured flow from background to future aspirations",
      "Demonstrates specific knowledge of the target program",
      "Explains motivation and passion for the field"
    ],
    weaknesses: [
      "Could include more specific examples of relevant projects",
      "Research interests could be more clearly aligned with faculty"
    ],
    suggestions: [
      "Consider mentioning specific courses you're looking forward to taking",
      "Add more details about your unique perspective and what you'll bring to the program",
      "Include any relevant extracurricular activities that demonstrate leadership"
    ],
    overallScore: 8.5
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">SOP Creator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Generate a compelling Statement of Purpose by answering a few questions
          </p>
          
          {isLoading ? (
            <LoadingState message="Generating your Statement of Purpose..." />
          ) : generatedSop ? (
            <div className="space-y-6">
              <SopResult 
                sopText={generatedSop} 
                feedback={mockFeedback} 
              />
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:underline mt-4"
                >
                  Create another SOP
                </button>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Create Your Statement of Purpose</CardTitle>
                <CardDescription>
                  Answer the questions below to generate a personalized Statement of Purpose
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SopForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
          )}
          
          {!generatedSop && !isLoading && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4 text-center">Why Use Our SOP Creator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Tailored to Your Profile</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI generates a unique SOP based on your academic background, achievements,
                      and career goals, ensuring it reflects your personal journey.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">University-Specific Content</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      The generated SOP includes specific references to your target university and program,
                      demonstrating your research and genuine interest.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Proper Structure & Flow</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your SOP will follow the ideal structure expected by admission committees,
                      with a clear introduction, body paragraphs, and conclusion.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Editable Results</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Use the generated SOP as a strong starting point, then customize and refine
                      it further to add your personal voice and additional details.
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

export default SopCreator;
