
import React, { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface University {
  name: string;
  tuition: number;
  accommodation: number;
  living: number;
  other: number;
  total: number;
  currency: string;
  timeframe: string;
}

interface FeeComparisonResultProps {
  universities: University[];
  program: string;
  degreeLevel: string;
}

const FeeComparisonResult: React.FC<FeeComparisonResultProps> = ({
  universities,
  program,
  degreeLevel
}) => {
  const [compareBy, setCompareBy] = useState<"total" | "tuition" | "living">("total");
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Prepare data for charts
  const getChartData = () => {
    switch (compareBy) {
      case "total":
        return universities.map(uni => ({
          name: uni.name,
          Total: uni.total
        }));
      case "tuition":
        return universities.map(uni => ({
          name: uni.name,
          Tuition: uni.tuition
        }));
      case "living":
        return universities.map(uni => ({
          name: uni.name,
          Accommodation: uni.accommodation,
          "Living Expenses": uni.living,
          "Other Costs": uni.other
        }));
      default:
        return [];
    }
  };

  // Get chart colors
  const getChartColors = () => {
    switch (compareBy) {
      case "total":
        return ["#3b82f6"];
      case "tuition":
        return ["#8b5cf6"];
      case "living":
        return ["#f97316", "#10b981", "#6366f1"];
      default:
        return [];
    }
  };

  // Get degree level label
  const getDegreeLevelLabel = (level: string) => {
    switch (level) {
      case "bachelors":
        return "Bachelor's";
      case "masters":
        return "Master's";
      case "phd":
        return "PhD/Doctorate";
      default:
        return level;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Cost Comparison: {getDegreeLevelLabel(degreeLevel)} in {program}
          </CardTitle>
          <CardDescription>
            Compare costs across {universities.length} universities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Tabs defaultValue="chart" value={viewMode} onValueChange={(v: string) => setViewMode(v as "chart" | "table")} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Compare:</span>
                  <select 
                    value={compareBy}
                    onChange={e => setCompareBy(e.target.value as "total" | "tuition" | "living")}
                    className="text-sm rounded-md border border-input bg-background px-3 py-1"
                  >
                    <option value="total">Total Cost</option>
                    <option value="tuition">Tuition Only</option>
                    <option value="living">Living Costs Breakdown</option>
                  </select>
                </div>
              </div>

              <TabsContent value="chart" className="mt-0">
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={value => formatCurrency(value as number)} />
                      <Legend />
                      {compareBy === "total" && (
                        <Bar dataKey="Total" fill="#3b82f6" />
                      )}
                      {compareBy === "tuition" && (
                        <Bar dataKey="Tuition" fill="#8b5cf6" />
                      )}
                      {compareBy === "living" && (
                        <>
                          <Bar dataKey="Accommodation" fill="#f97316" />
                          <Bar dataKey="Living Expenses" fill="#10b981" />
                          <Bar dataKey="Other Costs" fill="#6366f1" />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="table" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          University
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Tuition
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Accommodation
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Living Expenses
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Other Costs
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {universities.map((uni, index) => (
                        <tr 
                          key={uni.name} 
                          className={index % 2 === 0 ? "" : "bg-gray-50 dark:bg-gray-800/50"}
                        >
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {uni.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-right text-gray-500 dark:text-gray-400">
                            {formatCurrency(uni.tuition)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-right text-gray-500 dark:text-gray-400">
                            {formatCurrency(uni.accommodation)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-right text-gray-500 dark:text-gray-400">
                            {formatCurrency(uni.living)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-right text-gray-500 dark:text-gray-400">
                            {formatCurrency(uni.other)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-right font-bold text-gray-900 dark:text-white">
                            {formatCurrency(uni.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * All costs shown are estimated for a 12-month period and may vary based on individual living habits
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeComparisonResult;
