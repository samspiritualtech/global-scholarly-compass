
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { CheckCircle2, FileText, GraduationCap, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Simplify Your</span> 
              <br />
              International Education Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your AI-powered assistant for university applications abroad - from SOP creation to scholarship hunting
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/sop-evaluator">
                  Evaluate Your SOP
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth?mode=register">
                  Create Free Account
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How We Help International Students
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>SOP Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload your Statement of Purpose and receive detailed feedback and suggestions for improvement.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>SOP Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Answer a few simple questions and generate a compelling Statement of Purpose tailored to your background.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                    <Search className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Scholarship Finder</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover scholarships matching your profile, university choices, and field of study.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="mb-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Fee Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Compare tuition fees and living costs across multiple universities to make informed decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Our platform simplifies every step of your international education journey
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Select Your Service</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose whether you need SOP evaluation, creation, scholarship search, or cost comparison.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Provide Information</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter details about your academic background, target universities, or upload your existing SOP.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive personalized feedback, generated content, or comparison results to aid your decision-making.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Success Stories
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-4"></div>
                    <h3 className="text-lg font-semibold">Priya Sharma</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">MSc Computer Science, Stanford</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "The SOP evaluation tool helped me refine my statement and highlight my strengths. I got accepted to my dream university with a scholarship!"
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-4"></div>
                    <h3 className="text-lg font-semibold">Miguel Rodriguez</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">MBA, London Business School</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "The fee comparison tool was eye-opening. It helped me make an informed decision about which university offered the best value for my investment."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-4"></div>
                    <h3 className="text-lg font-semibold">Li Wei</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">PhD Engineering, University of Toronto</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "I found a scholarship I didn't know existed through the scholarship finder. The application process was straightforward, and I received funding for my studies."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Simplify Your Application Process?
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join thousands of students who have successfully gained admission to top universities worldwide.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth?mode=register">
                Get Started for Free
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
