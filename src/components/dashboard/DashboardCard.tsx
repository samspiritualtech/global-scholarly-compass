
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  footer,
  className,
  children,
  onClick,
}) => {
  return (
    <Card 
      className={cn("card-hover overflow-hidden", 
        onClick ? "cursor-pointer" : "", 
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          {icon && <span>{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="border-t pt-4">{footer}</CardFooter>}
    </Card>
  );
};

export default DashboardCard;
