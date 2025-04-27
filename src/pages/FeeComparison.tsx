
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeeComparisonForm from "@/components/fees/FeeComparisonForm";
import FeeComparisonResult from "@/components/fees/FeeComparisonResult";
import LoadingState from "@/components/common/LoadingState";
import { compareUniversityCosts } from "@/lib/api";
import { UniversityCosts } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeeComparison = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<UniversityCosts[] | null>(null);
  const [comparisonParams, setComparisonParams] = useState<{
    program: string;
    degreeLevel: string;
  } | null>(null);

  const handleSubmit = async (data: {
    universities: string[];
    program: string;
    degreeLevel: string;
  }) => {
    setIsLoading(true);
    setComparisonParams({
      program: data.program,
      degreeLevel: data.degreeLevel,
    });
    
    try {
      // This would be replaced with an actual API call in production
      const results = await compareUniversityCosts(data);
      setComparisonResults(results);
      toast.success("Comparison complete!");
    } catch (error) {
      console.error("Comparison error:", error);
      toast.error("Failed to compare university costs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setComparisonResults(null);
    setComparisonParams(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Fee Comparison Tool</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Compare tuition fees and living costs across multiple universities
          </p>
          
          {isLoading ? (
            <LoadingState message="Gathering cost information..." />
          ) : comparisonResults ? (
            <div className="space-y-6">
              <FeeComparisonResult 
                universities={comparisonResults}
                program={comparisonParams?.program || ""}
                degreeLevel={comparisonParams?.degreeLevel || ""}
              />
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:underline mt-4"
                >
                  New Comparison
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Compare University Costs</CardTitle>
                  <CardDescription>
                    Select universities to compare tuition and living expenses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FeeComparisonForm onSubmit={handleSubmit} />
                </CardContent>
              </Card>
              
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Why Compare Costs?</CardTitle>
                    <CardDescription>
                      Make informed financial decisions for your education
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-1">Total Cost of Education</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Compare the full financial picture including tuition, accommodation, and living expenses across universities.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-1">Hidden Expenses</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Uncover additional costs like health insurance, transportation, and student activity fees.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-1">Regional Differences</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Understand how living costs vary between cities and countries to prepare your budget accordingly.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-1">Return on Investment</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Evaluate whether higher-cost programs offer better value through reputation, career services, or other benefits.
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t mt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          Note: All cost estimates are approximate and based on average expenses. 
                          Actual costs may vary based on lifestyle choices and specific university fees.
                        </p>
                      </div>
                    </div>
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

export default FeeComparison;
