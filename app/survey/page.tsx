'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const AVAILABLE_SURVEYS = [
  {
    id: 'nla-app-sim',
    title: 'Application/Simulation Library Survey',
    description: 'Help us understand the Numerical Linear Algebra (NLA) operations used in your application/simulation libraries. This survey will help prepare for benchmarking and identify common NLA patterns across different domains.',
    path: '/survey/nla-app-sim'
  },
  // More surveys can be added here later
];

export default function SurveyListingPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ExaNLA Surveys
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Select a survey to participate in. Your input helps us improve and adapt our tools to better serve the scientific computing community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE_SURVEYS.map(survey => (
            <Link 
              key={survey.id} 
              href={survey.path}
              className="block"
            >
              <div className="h-full bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {survey.title}
                </h2>
                <p className="text-gray-600">
                  {survey.description}
                </p>
                <div className="mt-4 text-blue-600 font-medium">
                  Start Survey →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

 