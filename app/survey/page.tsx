'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { generateSurveyPDF } from '@/lib/pdfGenerator';
import { surveyData } from './index';

const AVAILABLE_SURVEYS = [
  {
    id: 'nla-app-sim',
    title: 'Survey: Numerical Linear Algebra in Scientific Applications',
    description: 'Help us understand the Numerical Linear Algebra (NLA) operations used in your application/simulation codes. This survey will help prepare for benchmarking and identify common NLA patterns across different domains.',
    path: '/survey/nla-app-sim'
  },
  // More surveys can be added here later
];

export default function SurveyListingPage() {
  const [isClient, setIsClient] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedData, setUploadedData] = useState<Record<string, unknown> | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/json') {
      setError('Please select a valid JSON file.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = e.target?.result as string;
        const data = JSON.parse(jsonContent);
        
        // Handle both single submission and array of submissions
        const submissions = Array.isArray(data) ? data : [data];
        
        // Validate that this looks like survey data
        const validSubmissions = submissions.filter(submission => {
          if (!submission || typeof submission !== 'object') return false;
          
          // Check for some expected survey fields
          return Object.keys(submission).some(key => 
            key.includes('library-name') || 
            key.includes('contact-') || 
            key.includes('matrix-') ||
            key.includes('eigenvalue') ||
            key.includes('cholesky') ||
            key.includes('qr-')
          );
        });

        if (validSubmissions.length === 0) {
          throw new Error('No valid ExaNLA survey responses found in the file.');
        }

        // For now, just process the first submission for PDF generation
        const firstSubmission = validSubmissions[0];
        setUploadedData(firstSubmission);
        
        // Generate PDF immediately
        generateSurveyPDF(firstSubmission, surveyData);
        setSuccess(`PDF generated successfully! Processed ${validSubmissions.length} submission(s).`);
        
      } catch (err) {
        console.error('Error processing JSON:', err);
        setError(err instanceof Error ? err.message : 'Error processing JSON file.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file.');
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const resetAnalytics = () => {
    setUploadedData(null);
    setShowAnalytics(false);
    setError(null);
    setSuccess(null);
  };

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
            <div key={survey.id} className="h-full bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {survey.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {survey.description}
              </p>
              
              <div className="space-y-3">
                <Link 
                  href={survey.path}
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Survey →
                </Link>
                
                <button
                  onClick={() => setShowAnalytics(true)}
                  className="w-full bg-gray-100 text-gray-700 text-center py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Analytics & Data Upload
                </button>
                
                <Link 
                  href="/survey/results"
                  className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Survey Results
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Modal */}
        {showAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Generate PDF from Survey Data
                  </h2>
                  <button
                    onClick={resetAnalytics}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Development Warning */}
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Under Development</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        This feature is currently limited to PDF generation from JSON data. 
                        Advanced analytics and visualizations will be available once sufficient survey data is collected.
                      </p>
                    </div>
                  </div>
                </div>

                {!uploadedData ? (
                  /* Upload Section */
                  <div className="max-w-2xl mx-auto">
                    <p className="text-gray-600 mb-6 text-center">
                      Upload a JSON file from a previous survey submission to generate a PDF report.
                    </p>
                    
                    <div
                      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                        isDragOver
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={!isProcessing ? handleClick : undefined}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json,application/json"
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={isProcessing}
                      />
                      
                      {isProcessing ? (
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-blue-500 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="text-lg text-gray-600">Processing survey data...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg className="w-16 h-16 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-lg text-gray-600 mb-2">
                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-sm text-gray-500 mb-4">JSON file(s) containing survey responses</p>
                          <div className="text-xs text-gray-400 space-y-1">
                            <p>• Single submission JSON</p>
                            <p>• Array of submissions JSON</p>
                            <p>• Database export JSON</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="ml-2">
                            <p className="text-sm text-red-800">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {success && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div className="ml-2">
                            <p className="text-sm text-green-800">{success}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Success Section */
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-6">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF Generated Successfully!</h3>
                      <p className="text-gray-600 mb-4">
                        Your survey data has been processed and a PDF report has been generated and downloaded.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={resetAnalytics}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Upload Another File
                      </button>
                      <button
                        onClick={resetAnalytics}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

 