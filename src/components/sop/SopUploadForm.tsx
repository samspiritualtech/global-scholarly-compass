
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface SopUploadFormProps {
  onSubmit: (data: { 
    text: string; 
    university: string; 
    program: string; 
    file?: File 
  }) => void;
}

const SopUploadForm: React.FC<SopUploadFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [university, setUniversity] = useState("");
  const [program, setProgram] = useState("");
  const [inputMethod, setInputMethod] = useState<"text" | "file">("text");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMethod === "text" && !text) {
      toast.error("Please enter your SOP text");
      return;
    }
    
    if (inputMethod === "file" && !file) {
      toast.error("Please upload a file");
      return;
    }
    
    if (!university) {
      toast.error("Please select a university");
      return;
    }
    
    if (!program) {
      toast.error("Please enter your program");
      return;
    }

    onSubmit({ 
      text: inputMethod === "text" ? text : "", 
      university, 
      program,
      file: file || undefined 
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type - accept .docx, .pdf, .txt
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['docx', 'pdf', 'txt'].includes(fileType || '')) {
        toast.error("Please upload a .docx, .pdf, or .txt file");
        return;
      }
      
      // Check file size - max 5MB
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>University</Label>
        <Select value={university} onValueChange={setUniversity} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a university" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mit">Massachusetts Institute of Technology</SelectItem>
            <SelectItem value="stanford">Stanford University</SelectItem>
            <SelectItem value="harvard">Harvard University</SelectItem>
            <SelectItem value="oxford">University of Oxford</SelectItem>
            <SelectItem value="cambridge">University of Cambridge</SelectItem>
            <SelectItem value="eth-zurich">ETH Zurich</SelectItem>
            <SelectItem value="imperial">Imperial College London</SelectItem>
            <SelectItem value="toronto">University of Toronto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="program">Program</Label>
        <Input
          id="program"
          placeholder="e.g. MS Computer Science"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
            type="button"
            variant={inputMethod === "text" ? "default" : "outline"}
            onClick={() => setInputMethod("text")}
            className="flex-1"
          >
            Type SOP
          </Button>
          <Button
            type="button"
            variant={inputMethod === "file" ? "default" : "outline"}
            onClick={() => setInputMethod("file")}
            className="flex-1"
          >
            Upload SOP
          </Button>
        </div>
        
        {inputMethod === "text" ? (
          <div className="space-y-2">
            <Label htmlFor="sop-text">Statement of Purpose</Label>
            <Textarea
              id="sop-text"
              placeholder="Enter your statement of purpose here..."
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none"
            />
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="h-10 w-10 text-gray-400" />
                <div className="space-y-1 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX or TXT (Max 5MB)
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Select File
                </Label>
                {file && (
                  <p className="text-sm text-green-600 font-medium">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Button type="submit" className="w-full">
        Evaluate SOP
      </Button>
    </form>
  );
};

export default SopUploadForm;
