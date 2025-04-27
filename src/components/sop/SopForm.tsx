
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  type: "text" | "select" | "textarea";
  options?: string[];
  required?: boolean;
}

const questions: Question[] = [
  {
    id: "university",
    question: "Which university are you applying to?",
    type: "select",
    options: [
      "Massachusetts Institute of Technology",
      "Stanford University",
      "Harvard University",
      "University of Oxford",
      "University of Cambridge",
      "ETH Zurich",
      "Imperial College London",
      "University of Toronto",
      "Other"
    ],
    required: true,
  },
  {
    id: "otherUniversity",
    question: "If other, please specify:",
    type: "text",
  },
  {
    id: "program",
    question: "What program are you applying to?",
    type: "text",
    required: true,
  },
  {
    id: "background",
    question: "Describe your academic background",
    type: "textarea",
    required: true,
  },
  {
    id: "whyProgram",
    question: "Why are you interested in this program?",
    type: "textarea",
    required: true,
  },
  {
    id: "careerGoals",
    question: "What are your short and long-term career goals?",
    type: "textarea",
    required: true,
  },
  {
    id: "skills",
    question: "What relevant skills or experiences do you have?",
    type: "textarea",
    required: true,
  },
  {
    id: "achievements",
    question: "What are your notable academic or professional achievements?",
    type: "textarea",
  },
  {
    id: "research",
    question: "Do you have any research experience or interests?",
    type: "textarea",
  },
  {
    id: "contribution",
    question: "How will you contribute to the program/university?",
    type: "textarea",
    required: true,
  },
];

interface SopFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

const SopForm: React.FC<SopFormProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showOtherUniversity, setShowOtherUniversity] = useState(false);

  const questionsPerStep = 3;
  const totalSteps = Math.ceil(questions.length / questionsPerStep);

  const visibleQuestions = questions.filter(q => {
    if (q.id === "otherUniversity") {
      return showOtherUniversity;
    }
    return true;
  });

  const currentQuestions = visibleQuestions.slice(
    currentStep * questionsPerStep,
    (currentStep + 1) * questionsPerStep
  );

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    if (questionId === "university" && value === "Other") {
      setShowOtherUniversity(true);
    } else if (questionId === "university") {
      setShowOtherUniversity(false);
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers.otherUniversity;
        return newAnswers;
      });
    }
  };

  const handleNext = () => {
    // Validate required questions for current step
    const missingRequired = currentQuestions
      .filter(q => q.required)
      .filter(q => !answers[q.id]);

    if (missingRequired.length > 0) {
      toast.error(`Please answer all required questions before proceeding`);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    const allRequiredQuestions = visibleQuestions.filter(q => q.required);
    const missingRequired = allRequiredQuestions.filter(q => !answers[q.id]);

    if (missingRequired.length > 0) {
      toast.error(`Please answer all required questions before submitting`);
      return;
    }

    // If university is "Other", use the otherUniversity value
    const finalAnswers = { ...answers };
    if (answers.university === "Other" && answers.otherUniversity) {
      finalAnswers.university = answers.otherUniversity;
      delete finalAnswers.otherUniversity;
    }

    onSubmit(finalAnswers);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "select":
        return (
          <Select
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Your answer"
            className="resize-none"
            rows={5}
          />
        );
      case "text":
      default:
        return (
          <Input
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Your answer"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {currentQuestions.map((q) => (
          <div key={q.id} className="space-y-2">
            <Label htmlFor={q.id}>
              {q.question}
              {q.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderQuestion(q)}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          disabled={currentStep === 0}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </div>
        
        {currentStep < totalSteps - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="submit">
            Generate SOP
          </Button>
        )}
      </div>
    </form>
  );
};

export default SopForm;
