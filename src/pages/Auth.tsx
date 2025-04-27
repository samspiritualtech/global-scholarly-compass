
import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";
  
  const title = mode === "register" ? "Create an Account" : "Login to Your Account";
  const description = mode === "register" 
    ? "Sign up to track your university applications, save SOPs, and find scholarships" 
    : "Welcome back! Login to access your dashboard and continue where you left off";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm mode={mode} />
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
