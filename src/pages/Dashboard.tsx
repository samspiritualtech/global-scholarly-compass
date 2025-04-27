
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Search, GraduationCap, Settings } from "lucide-react";

const Dashboard = () => {
  // Mock user data - would be fetched from API in a real app
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
  };

  // Mock activity data - would be fetched from API in a real app
  const recentActivities = [
    { id: 1, type: "sop-evaluation", title: "SOP for Stanford CS Program", date: "2023-05-15", status: "completed" },
    { id: 2, type: "scholarship-search", title: "Scholarships for UK Universities", date: "2023-05-10", status: "completed" },
    { id: 3, type: "fee-comparison", title: "Comparison of US Universities", date: "2023-05-05", status: "completed" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your application journey from one place
            </p>
          </header>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="SOP Evaluation" 
              icon={<FileText className="h-5 w-5 text-blue-600" />}
              onClick={() => window.location.href = '/sop-evaluator'}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload your SOP and get expert feedback
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sop-evaluator">Evaluate SOP</Link>
              </Button>
            </DashboardCard>
            
            <DashboardCard 
              title="SOP Creation" 
              icon={<FileText className="h-5 w-5 text-purple-600" />}
              onClick={() => window.location.href = '/sop-creator'}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Generate a new SOP by answering questions
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sop-creator">Create SOP</Link>
              </Button>
            </DashboardCard>
            
            <DashboardCard 
              title="Scholarship Finder" 
              icon={<Search className="h-5 w-5 text-green-600" />}
              onClick={() => window.location.href = '/scholarships'}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Find scholarships matching your profile
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/scholarships">Find Scholarships</Link>
              </Button>
            </DashboardCard>
            
            <DashboardCard 
              title="Fee Comparison" 
              icon={<GraduationCap className="h-5 w-5 text-orange-600" />}
              onClick={() => window.location.href = '/fee-comparison'}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Compare costs across universities
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/fee-comparison">Compare Costs</Link>
              </Button>
            </DashboardCard>
          </section>
          
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            {recentActivities.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div>
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
              </div>
            )}
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard 
              title="My SOPs" 
              footer={
                <Button variant="ghost" size="sm" className="w-full">
                  View All SOPs
                </Button>
              }
            >
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  You have 2 saved SOPs
                </p>
                <ul className="space-y-1">
                  <li className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                    <Link to="#" className="flex justify-between">
                      <span>Stanford CS Program SOP</span>
                      <span className="text-gray-500">May 15, 2023</span>
                    </Link>
                  </li>
                  <li className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                    <Link to="#" className="flex justify-between">
                      <span>MIT Engineering SOP</span>
                      <span className="text-gray-500">May 2, 2023</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Saved Universities" 
              footer={
                <Button variant="ghost" size="sm" className="w-full">
                  View All Universities
                </Button>
              }
            >
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  You have 3 saved universities
                </p>
                <ul className="space-y-1">
                  <li className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                    <Link to="#" className="flex justify-between">
                      <span>Stanford University</span>
                      <span className="text-blue-600">Compare</span>
                    </Link>
                  </li>
                  <li className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                    <Link to="#" className="flex justify-between">
                      <span>MIT</span>
                      <span className="text-blue-600">Compare</span>
                    </Link>
                  </li>
                  <li className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                    <Link to="#" className="flex justify-between">
                      <span>University of Toronto</span>
                      <span className="text-blue-600">Compare</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </DashboardCard>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
