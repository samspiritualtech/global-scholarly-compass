
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface FeeComparisonFormProps {
  onSubmit: (data: {
    universities: string[];
    program: string;
    degreeLevel: string;
  }) => void;
}

const FeeComparisonForm: React.FC<FeeComparisonFormProps> = ({ onSubmit }) => {
  const [universities, setUniversities] = useState<string[]>([""]);
  const [program, setProgram] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");

  const addUniversity = () => {
    if (universities.length < 5) {
      setUniversities([...universities, ""]);
    } else {
      toast.error("You can compare up to 5 universities at once");
    }
  };

  const removeUniversity = (index: number) => {
    if (universities.length > 1) {
      const newUniversities = [...universities];
      newUniversities.splice(index, 1);
      setUniversities(newUniversities);
    }
  };

  const updateUniversity = (index: number, value: string) => {
    const newUniversities = [...universities];
    newUniversities[index] = value;
    setUniversities(newUniversities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty universities
    const filteredUniversities = universities.filter(uni => uni.trim() !== "");
    
    if (filteredUniversities.length < 1) {
      toast.error("Please enter at least one university");
      return;
    }

    if (!program) {
      toast.error("Please enter a program");
      return;
    }

    if (!degreeLevel) {
      toast.error("Please select a degree level");
      return;
    }

    onSubmit({
      universities: filteredUniversities,
      program,
      degreeLevel,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base">Universities to Compare</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Add up to 5 universities to compare costs
          </p>
          
          {universities.map((university, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 mb-3"
            >
              <Input
                placeholder={`University ${index + 1}`}
                value={university}
                onChange={(e) => updateUniversity(index, e.target.value)}
                className="flex-grow"
              />
              {universities.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeUniversity(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </div>
          ))}
          
          {universities.length < 5 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addUniversity}
              className="mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Another University
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">Program/Field of Study</Label>
          <Input
            id="program"
            placeholder="e.g. Computer Science, Engineering"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="degreeLevel">Degree Level</Label>
          <Select 
            value={degreeLevel} 
            onValueChange={setDegreeLevel}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select degree level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelors">Bachelor's</SelectItem>
              <SelectItem value="masters">Master's</SelectItem>
              <SelectItem value="phd">PhD / Doctorate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Compare Costs
      </Button>
    </form>
  );
};

export default FeeComparisonForm;
