
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
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

interface ScholarshipFormProps {
  onSubmit: (data: {
    university?: string;
    program?: string;
    country?: string;
    degreeLevel?: string;
    minAmount: number;
  }) => void;
}

const ScholarshipForm: React.FC<ScholarshipFormProps> = ({ onSubmit }) => {
  const [university, setUniversity] = useState("");
  const [program, setProgram] = useState("");
  const [country, setCountry] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one field is filled
    if (!university && !program && !country && !degreeLevel) {
      toast.error("Please fill in at least one search criterion");
      return;
    }

    onSubmit({
      university: university || undefined,
      program: program || undefined,
      country: country || undefined,
      degreeLevel: degreeLevel || undefined,
      minAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="university">University (Optional)</Label>
          <Input
            id="university"
            placeholder="e.g. Stanford University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">Program/Field of Study (Optional)</Label>
          <Input
            id="program"
            placeholder="e.g. Computer Science, Engineering, Business"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country (Optional)</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="degreeLevel">Degree Level (Optional)</Label>
          <Select value={degreeLevel} onValueChange={setDegreeLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select degree level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelors">Bachelor's</SelectItem>
              <SelectItem value="masters">Master's</SelectItem>
              <SelectItem value="phd">PhD / Doctorate</SelectItem>
              <SelectItem value="postdoc">Post-Doctoral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="advanced-options">
            <AccordionTrigger className="text-sm">Advanced Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Minimum Scholarship Amount</Label>
                    <span className="text-sm font-medium">
                      ${minAmount.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    min={0}
                    max={50000}
                    step={1000}
                    onValueChange={(values) => setMinAmount(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>$50,000+</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Button type="submit" className="w-full">
        Find Scholarships
      </Button>
    </form>
  );
};

export default ScholarshipForm;
