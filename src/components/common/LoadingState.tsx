
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Processing your request..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingState;
