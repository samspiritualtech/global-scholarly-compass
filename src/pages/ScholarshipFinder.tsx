
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScholarshipForm from "@/components/scholarships/ScholarshipForm";
import ScholarshipCard from "@/components/scholarships/ScholarshipCard";
import LoadingState from "@/components/common/LoadingState";
import { findScholarships } from "@/lib/api";
import { ScholarshipData } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ScholarshipFinder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ScholarshipData[] | null>(null);
  const [searchParams, setSearchParams] = useState<{
    university?: string;
    program?: string;
    country?: string;
    degreeLevel?: string;
  } | null>(null);

  const handleSubmit = async (data: {
    university?: string;
    program?: string;
    country?: string;
    degreeLevel?: string;
    minAmount: number;
  }) => {
    setIsLoading(true);
    setSearchParams({
      university: data.university,
      program: data.program,
      country: data.country,
      degreeLevel: data.degreeLevel,
    });
    
    try {
      // This would be replaced with an actual API call in production
      const results = await findScholarships(data);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast.info("No scholarships found matching your criteria. Try broadening your search.");
      } else {
        toast.success(`Found ${results.length} scholarships!`);
      }
    } catch (error) {
      console.error("Scholarship search error:", error);
      toast.error("Failed to search scholarships. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchResults(null);
    setSearchParams(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Scholarship Finder</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Discover scholarships matching your profile and university choices
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Criteria</CardTitle>
                    <CardDescription>
                      Enter details to find relevant scholarships
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScholarshipForm onSubmit={handleSubmit} />
                  </CardContent>
                </Card>
                
                {searchResults && searchResults.length > 0 && (
                  <div className="mt-6 hidden lg:block">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-3">Search Summary</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Results:</span> {searchResults.length} scholarships
                          </p>
                          {searchParams?.university && (
                            <p>
                              <span className="font-medium">University:</span> {searchParams.university}
                            </p>
                          )}
                          {searchParams?.program && (
                            <p>
                              <span className="font-medium">Program:</span> {searchParams.program}
                            </p>
                          )}
                          {searchParams?.country && (
                            <p>
                              <span className="font-medium">Country:</span> {searchParams.country}
                            </p>
                          )}
                          {searchParams?.degreeLevel && (
                            <p>
                              <span className="font-medium">Degree:</span> {searchParams.degreeLevel}
                            </p>
                          )}
                          <button
                            onClick={handleReset}
                            className="text-blue-600 hover:underline block mt-4"
                          >
                            New Search
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {isLoading ? (
                <LoadingState message="Searching for scholarships..." />
              ) : searchResults ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {searchResults.length} {searchResults.length === 1 ? "Scholarship" : "Scholarships"} Found
                    </h2>
                    <button
                      onClick={handleReset}
                      className="text-blue-600 hover:underline lg:hidden"
                    >
                      New Search
                    </button>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="space-y-6">
                      {searchResults.map((scholarship) => (
                        <ScholarshipCard
                          key={scholarship.id}
                          scholarship={scholarship}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="pt-6 text-center py-12">
                        <h3 className="text-xl font-medium mb-2">No Scholarships Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Try broadening your search criteria to find more results
                        </p>
                        <button
                          onClick={handleReset}
                          className="text-blue-600 hover:underline"
                        >
                          Reset Search
                        </button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600 dark:text-blue-400"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium mb-2">Find Your Perfect Scholarship</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                        Use the search form to discover scholarships matching your academic profile and preferences
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You can search by university, program, country, or degree level
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScholarshipFinder;
