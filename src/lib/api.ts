
// This file will serve as the interface to connect with external APIs (like Lyzr.ai) in the future
// For now, we'll use mock data and simulate API calls

export interface SopEvaluation {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overallScore: number;
}

export interface ScholarshipData {
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
}

export interface UniversityCosts {
  name: string;
  tuition: number;
  accommodation: number;
  living: number;
  other: number;
  total: number;
  currency: string;
  timeframe: string;
}

// Mock API functions that will be replaced with actual API calls in the future

// SOP Evaluation API
export async function evaluateSop(params: {
  text: string;
  university: string;
  program: string;
  file?: File;
}): Promise<{
  sopText: string;
  evaluation: SopEvaluation;
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock response data
  return {
    sopText: params.text || "This is the evaluated SOP text that would be extracted from a file.",
    evaluation: {
      strengths: [
        "Clear articulation of academic background",
        "Strong connection between past experiences and future goals",
        "Specific reasons for choosing the university and program",
      ],
      weaknesses: [
        "Introduction could be more engaging",
        "Some statements lack specific examples to back them up",
        "Conclusion doesn't fully tie back to the introduction",
      ],
      suggestions: [
        "Add specific examples of projects or research that demonstrate your interests",
        "Mention particular faculty members or research groups you're interested in working with",
        "Strengthen the conclusion by reiterating your fit for the program",
        "Consider adding more details about long-term career aspirations",
      ],
      overallScore: 7.5,
    },
  };
}

// SOP Generation API
export async function generateSop(answers: Record<string, string>): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Mock response - in real implementation, this would be generated based on the answers
  return `
Statement of Purpose

I am writing to express my strong interest in pursuing a Master's in Computer Science at Stanford University. With a solid foundation in computer science from my undergraduate studies at [University Name], I am eager to deepen my knowledge and contribute to cutting-edge research in artificial intelligence and machine learning.

Throughout my academic journey, I have maintained a GPA of 3.8/4.0 while engaging in various research projects that have shaped my interest in this field. My senior thesis on optimizing neural networks for edge devices received departmental honors and sparked my passion for making AI more accessible and efficient.

My professional experience includes a software engineering internship at [Company Name], where I worked on implementing machine learning algorithms to improve recommendation systems. This experience taught me the practical challenges of deploying AI solutions and reinforced my desire to pursue advanced studies to develop more robust methodologies.

Stanford's Computer Science program stands out to me because of its multidisciplinary approach to AI research and the opportunity to work with renowned faculty like Professors [Name] and [Name], whose work in reinforcement learning and computer vision aligns perfectly with my research interests. The collaborative environment and access to state-of-the-art facilities such as the Stanford Artificial Intelligence Laboratory would provide the ideal setting for me to grow as a researcher.

My long-term goal is to lead research initiatives that bridge the gap between theoretical AI advancements and practical applications that can address real-world problems. With Stanford's emphasis on innovation and interdisciplinary collaboration, I believe I can develop the technical expertise and leadership skills necessary to make meaningful contributions to the field.

Beyond academics, I hope to engage with Stanford's vibrant community through student organizations like [Organization Name] and contribute to initiatives that promote diversity in STEM. I believe that diverse perspectives are essential for developing AI systems that work equitably for all users.

In conclusion, studying at Stanford University would be transformative for my academic and professional growth. I am excited about the prospect of joining your community of scholars and contributing to the advancement of computer science and artificial intelligence. Thank you for considering my application.
`;
}

// Scholarship Search API
export async function findScholarships(params: {
  university?: string;
  program?: string;
  country?: string;
  degreeLevel?: string;
  minAmount: number;
}): Promise<ScholarshipData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock scholarship data
  const mockScholarships: ScholarshipData[] = [
    {
      id: "1",
      name: "Global Leaders Scholarship",
      provider: "International Education Fund",
      amount: 25000,
      deadline: "March 15, 2023",
      country: "United States",
      degreeLevel: "Master's",
      description:
        "A merit-based scholarship for outstanding international students pursuing graduate studies in STEM fields at top universities.",
      url: "#",
    },
    {
      id: "2",
      name: "Future Tech Innovators Grant",
      provider: "Tech Foundation",
      amount: 15000,
      deadline: "April 30, 2023",
      university: "Stanford University",
      program: "Computer Science",
      degreeLevel: "Master's",
      description:
        "Supports innovative students in computer science and related fields who demonstrate exceptional potential.",
      url: "#",
    },
    {
      id: "3",
      name: "International Merit Scholarship",
      provider: "University of Toronto",
      amount: 20000,
      deadline: "January 15, 2023",
      university: "University of Toronto",
      country: "Canada",
      description:
        "Awarded to international students with exceptional academic records applying to graduate programs.",
      url: "#",
    },
    {
      id: "4",
      name: "Engineering Excellence Award",
      provider: "Global Engineering Association",
      amount: 12000,
      deadline: "May 1, 2023",
      program: "Engineering",
      degreeLevel: "Bachelor's",
      description:
        "Supporting the next generation of engineers with financial assistance for undergraduate studies.",
      url: "#",
    },
    {
      id: "5",
      name: "Women in STEM Fellowship",
      provider: "Women's Education Alliance",
      amount: 18000,
      deadline: "February 28, 2023",
      program: "STEM Fields",
      description:
        "Empowering women pursuing degrees in science, technology, engineering, and mathematics.",
      url: "#",
    },
  ];

  // Filter scholarships based on search parameters
  let filteredScholarships = [...mockScholarships];

  if (params.university) {
    filteredScholarships = filteredScholarships.filter(
      (s) => s.university?.toLowerCase().includes(params.university?.toLowerCase() || "")
    );
  }

  if (params.program) {
    filteredScholarships = filteredScholarships.filter(
      (s) => s.program?.toLowerCase().includes(params.program?.toLowerCase() || "")
    );
  }

  if (params.country) {
    filteredScholarships = filteredScholarships.filter(
      (s) => s.country?.toLowerCase() === params.country?.toLowerCase()
    );
  }

  if (params.degreeLevel) {
    filteredScholarships = filteredScholarships.filter(
      (s) => s.degreeLevel?.toLowerCase() === params.degreeLevel?.toLowerCase()
    );
  }

  if (params.minAmount > 0) {
    filteredScholarships = filteredScholarships.filter(
      (s) => s.amount >= params.minAmount
    );
  }

  return filteredScholarships;
}

// Fee Comparison API
export async function compareUniversityCosts(params: {
  universities: string[];
  program: string;
  degreeLevel: string;
}): Promise<UniversityCosts[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock university cost data - these would be fetched from a database in production
  const costsDatabase: Record<string, UniversityCosts> = {
    "Massachusetts Institute of Technology": {
      name: "MIT",
      tuition: 55000,
      accommodation: 16000,
      living: 12000,
      other: 5000,
      total: 88000,
      currency: "USD",
      timeframe: "Annual",
    },
    "Stanford University": {
      name: "Stanford",
      tuition: 56000,
      accommodation: 17000,
      living: 14000,
      other: 4000,
      total: 91000,
      currency: "USD",
      timeframe: "Annual",
    },
    "Harvard University": {
      name: "Harvard",
      tuition: 54000,
      accommodation: 18000,
      living: 13000,
      other: 4500,
      total: 89500,
      currency: "USD",
      timeframe: "Annual",
    },
    "University of Oxford": {
      name: "Oxford",
      tuition: 40000,
      accommodation: 15000,
      living: 11000,
      other: 3000,
      total: 69000,
      currency: "USD",
      timeframe: "Annual",
    },
    "University of Cambridge": {
      name: "Cambridge",
      tuition: 38000,
      accommodation: 14000,
      living: 12000,
      other: 3500,
      total: 67500,
      currency: "USD",
      timeframe: "Annual",
    },
    "ETH Zurich": {
      name: "ETH Zurich",
      tuition: 3000,
      accommodation: 15000,
      living: 18000,
      other: 4000,
      total: 40000,
      currency: "USD",
      timeframe: "Annual",
    },
    "Imperial College London": {
      name: "Imperial",
      tuition: 35000,
      accommodation: 17000,
      living: 14000,
      other: 3500,
      total: 69500,
      currency: "USD",
      timeframe: "Annual",
    },
    "University of Toronto": {
      name: "Toronto",
      tuition: 45000,
      accommodation: 13000,
      living: 12000,
      other: 3500,
      total: 73500,
      currency: "USD",
      timeframe: "Annual",
    },
    "National University of Singapore": {
      name: "NUS",
      tuition: 30000,
      accommodation: 8000,
      living: 10000,
      other: 3000,
      total: 51000,
      currency: "USD",
      timeframe: "Annual",
    },
    "University of Melbourne": {
      name: "Melbourne",
      tuition: 35000,
      accommodation: 12000,
      living: 13000,
      other: 3000,
      total: 63000,
      currency: "USD",
      timeframe: "Annual",
    },
  };

  // Return costs for requested universities, or generate placeholder data if not found
  return params.universities.map((uni) => {
    const universityName = Object.keys(costsDatabase).find(
      (name) => name.toLowerCase().includes(uni.toLowerCase())
    );

    if (universityName && costsDatabase[universityName]) {
      return costsDatabase[universityName];
    }

    // Generate random data for universities not in the database
    const tuition = Math.round(30000 + Math.random() * 25000);
    const accommodation = Math.round(10000 + Math.random() * 8000);
    const living = Math.round(10000 + Math.random() * 5000);
    const other = Math.round(3000 + Math.random() * 2000);
    
    return {
      name: uni,
      tuition,
      accommodation,
      living,
      other,
      total: tuition + accommodation + living + other,
      currency: "USD",
      timeframe: "Annual",
    };
  });
}
