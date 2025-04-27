
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, GraduationCap, MapPin } from "lucide-react";

interface ScholarshipCardProps {
  scholarship: {
    id: string;
    name: string;
    provider: string;
    amount: number;
    deadline: string;
    university?: string;
    country?: string;
    program?: string;
    degreeLevel?: string;
    description: string;
    url: string;
  };
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  return (
    <Card className="h-full flex flex-col card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-bold">{scholarship.name}</CardTitle>
          <Badge variant="outline" className="font-medium">
            ${scholarship.amount.toLocaleString()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <div className="space-y-3">
          <p className="text-sm line-clamp-2">{scholarship.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {scholarship.university && (
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{scholarship.university}</span>
              </div>
            )}
            {scholarship.country && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{scholarship.country}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{scholarship.deadline}</span>
            </div>
            {scholarship.degreeLevel && (
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{scholarship.degreeLevel}</span>
              </div>
            )}
          </div>
          {scholarship.program && (
            <Badge variant="secondary" className="mt-2">
              {scholarship.program}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <a href={scholarship.url} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipCard;
