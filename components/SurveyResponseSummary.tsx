'use client';

import { useState } from 'react';
import { surveyData } from '@/app/survey';

interface SurveyQuestion {
  id: string;
  title: string;
  children?: SurveyQuestion[];
}

interface SurveyResponseSummaryProps {
  formData: { [key: string]: string | string[] | boolean };
  onDownloadPDF: () => void;
  onPrint: () => void;
  onSubmitAnother: () => void;
}

export default function SurveyResponseSummary({
  formData,
  onDownloadPDF,
  onPrint,
  onSubmitAnother
}: SurveyResponseSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const formatValue = (value: string | string[] | boolean | undefined): string => {
    if (value === undefined || value === '') return 'Not specified';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  // Helper function to format values with "other" responses
  const formatValueWithOther = (questionId: string, value: string | string[] | boolean | undefined): string => {
    const baseValue = formatValue(value);
    
    // Check if there's an "other" response for this question
    const otherKey = `${questionId}-other`;
    const otherValue = formData[otherKey];
    
    if (otherValue && String(otherValue).trim() !== '') {
      // If the base value contains "Other (please specify):", replace it with the actual other value
      if (baseValue.includes('Other (please specify):')) {
        return baseValue.replace('Other (please specify):', `Other: ${String(otherValue)}`);
      }
      // Otherwise, append the other value
      return `${baseValue}, Other: ${String(otherValue)}`;
    }
    
    return baseValue;
  };

  const getSelectedOperations = () => {
    const operationNames: { [key: string]: string } = {
      'matrix-multiplication': 'Matrix-Matrix Multiplication (GEMM)',
      'symmetric-hermitian': 'Symmetric/Hermitian Eigenvalue Problems',
      'quasi-hermitian-bse': 'Quasi-Hermitian (BSE) Eigenvalue Problems',
      'non-symmetric-hermitian': 'Non-symmetric/Non-Hermitian Eigenvalue Problems',
      'cholesky-factorization': 'Cholesky Factorization',
      'qr-factorization': 'QR Factorization',
      'matrix-inversion': 'Matrix Inversion',
      'polynomial-filtering': 'Polynomial Filtering',
      'linear-system-solvers': 'Linear System Solvers',
      'other-nla-operation': 'Other NLA Operation'
    };

    return Object.entries(formData)
      .filter(([key, value]) => {
        const isNlaOperation = [
          'matrix-multiplication',
          'symmetric-hermitian',
          'quasi-hermitian-bse',
          'non-symmetric-hermitian',
          'cholesky-factorization',
          'qr-factorization',
          'matrix-inversion',
          'polynomial-filtering',
          'linear-system-solvers',
          'other-nla-operation'
        ].includes(key);
        return isNlaOperation && value === true;
      })
      .map(([key]) => operationNames[key] || key);
  };

  const renderQuestionSummary = (question: SurveyQuestion, level: number = 0) => {
    const value = formData[question.id];

    // Only show questions that have responses
    if (!value || (Array.isArray(value) && value.length === 0)) {
      // Check if any children have responses
      if (question.children && question.children.length > 0) {
        const childrenWithResponses = question.children.filter(child => {
          const childValue = formData[child.id];
          return childValue && (!Array.isArray(childValue) || childValue.length > 0);
        });

        if (childrenWithResponses.length === 0) return null;

        return (
          <div key={question.id} className={`${level > 0 ? 'ml-4' : ''} mb-2`}>
            <div className="mt-1 space-y-1">
              {childrenWithResponses.map((child: SurveyQuestion) => renderQuestionSummary(child, level + 1))}
            </div>
          </div>
        );
      }
      return null;
    }

    return (
      <div key={question.id} className={`${level > 0 ? 'ml-4' : ''} mb-2`}>
        <div className="flex items-start space-x-2">
          <span className="text-sm font-medium text-gray-700 min-w-0 flex-1">
            {question.title}:
          </span>
          <span className="text-sm text-gray-600 text-right">
            {formatValueWithOther(question.id, value)}
          </span>
        </div>
        {question.children && question.children.length > 0 && (
          <div className="mt-1 space-y-1">
            {question.children
              .filter(child => {
                const childValue = formData[child.id];
                return childValue && (!Array.isArray(childValue) || childValue.length > 0);
              })
              .map((child: SurveyQuestion) => renderQuestionSummary(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Special function for operation questions - shows ALL questions for selected operations
  const renderOperationQuestionSummary = (question: SurveyQuestion, level: number = 0) => {
    const value = formData[question.id];

    return (
      <div key={question.id} className={`${level > 0 ? 'ml-4' : ''} mb-2`}>
        <div className="flex items-start space-x-2">
          <span className="text-sm font-medium text-gray-700 min-w-0 flex-1">
            {question.title}:
          </span>
          <span className={`text-sm text-right ${
            !value || (Array.isArray(value) && value.length === 0) 
              ? 'text-gray-400 italic' 
              : 'text-gray-600'
          }`}>
            {formatValueWithOther(question.id, value)}
          </span>
        </div>
        {question.children && question.children.length > 0 && (
          <div className="mt-1 space-y-1">
            {question.children.map((child: SurveyQuestion) => renderOperationQuestionSummary(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedOperations = getSelectedOperations();
  
  // Check for standard-eigenvalue and generalized-eigenvalue selections
  const hasStandardEigenvalue = formData['standard-eigenvalue'] === true;
  const hasGeneralizedEigenvalue = formData['generalized-eigenvalue'] === true;

  return (
    <div className="min-h-screen bg-gray-50 py-12 survey-summary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Survey Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Thank you for your valuable input. Your response has been recorded and will help us improve our NLA library development.
          </p>
          
          {/* Quick Summary */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Your Response Summary</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm font-medium text-blue-800">Library:</p>
                <p className="text-blue-700">{formatValue(formData['library-name'])}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Version:</p>
                <p className="text-blue-700">{formatValue(formData['library-version'])}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-blue-800">Selected NLA Operations:</p>
                <p className="text-blue-700">{selectedOperations.join(', ') || 'None selected'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onDownloadPDF}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download PDF Report</span>
            </button>
            
            
            <button
              onClick={onPrint}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print Summary</span>
            </button>
            
            <button
              onClick={onSubmitAnother}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Submit Another Response</span>
            </button>
          </div>
        </div>

        {/* Detailed Response Summary - Only selected operations */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Response Summary</h2>
          
          {/* General Information Sections */}
          {surveyData
            .filter(section => ['library-info', 'use-case-info'].includes(section.id))
            .map((section, index) => {
              const isExpanded = expandedSections.has(section.id);

              return (
                <div key={section.id} className="mb-6 border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      {section.description && (
                        <p className="text-gray-600 mb-4 text-sm">{section.description}</p>
                      )}
                      <div className="space-y-4">
                        {section.questions.map(question => renderQuestionSummary(question))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Selected NLA Operations */}
          {selectedOperations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Selected NLA Operations</h3>
              {selectedOperations.map((operation, index) => {
                const operationId = Object.entries(formData)
                  .find(([key, value]) => {
                    const operationNames: { [key: string]: string } = {
                      'matrix-multiplication': 'Matrix-Matrix Multiplication (GEMM)',
                      'symmetric-hermitian': 'Symmetric/Hermitian Eigenvalue Problems',
                      'quasi-hermitian-bse': 'Quasi-Hermitian (BSE) Eigenvalue Problems',
                      'non-symmetric-hermitian': 'Non-symmetric/Non-Hermitian Eigenvalue Problems',
                      'cholesky-factorization': 'Cholesky Factorization',
                      'qr-factorization': 'QR Factorization',
                      'matrix-inversion': 'Matrix Inversion',
                      'polynomial-filtering': 'Polynomial Filtering',
                      'linear-system-solvers': 'Linear System Solvers',
                      'other-nla-operation': 'Other NLA Operation'
                    };
                    return operationNames[key] === operation && value === true;
                  })?.[0];

                if (!operationId) return null;

                const operationSection = surveyData.find(section => 
                  section.questions.some(q => q.id === operationId)
                );
                
                if (!operationSection) return null;

                const operationQuestion = operationSection.questions.find(q => q.id === operationId);
                if (!operationQuestion) return null;

                const isExpanded = expandedSections.has(operationId);

                return (
                  <div key={operationId} className="mb-6 border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(operationId)}
                      className="w-full px-6 py-4 text-left bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{operation}</h3>
                      </div>
                      <svg
                        className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 py-4 border-t border-gray-200">
                        {operationQuestion.content && (
                          <p className="text-gray-600 mb-4 text-sm">{operationQuestion.content}</p>
                        )}
                        <div className="space-y-4">
                          {renderOperationQuestionSummary(operationQuestion)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Standard Eigenvalue Problems */}
          {hasStandardEigenvalue && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard Eigenvalue Problems (Ax = λx)</h3>
              {(() => {
                const standardEigenvalueSection = surveyData.find(section => 
                  section.questions.some(q => q.id === 'standard-eigenvalue')
                );
                
                if (!standardEigenvalueSection) return null;

                const standardEigenvalueQuestion = standardEigenvalueSection.questions.find(q => q.id === 'standard-eigenvalue');
                if (!standardEigenvalueQuestion || !standardEigenvalueQuestion.children) return null;

                return standardEigenvalueQuestion.children.map((subOption) => {
                  const isSubOptionSelected = formData[subOption.id] === true;
                  if (!isSubOptionSelected) return null;

                  const isExpanded = expandedSections.has(subOption.id);

                  return (
                    <div key={subOption.id} className="mb-6 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(subOption.id)}
                        className="w-full px-6 py-4 text-left bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                            {subOption.title.charAt(0)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{subOption.title}</h3>
                        </div>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 py-4 border-t border-gray-200">
                          {subOption.content && (
                            <p className="text-gray-600 mb-4 text-sm">{subOption.content}</p>
                          )}
                          <div className="space-y-4">
                            {subOption.children && subOption.children.map((question) => 
                              renderOperationQuestionSummary(question)
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* Generalized Eigenvalue Problems */}
          {hasGeneralizedEigenvalue && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Generalized Eigenvalue Problems (Ax = λBx)</h3>
              {(() => {
                const generalizedEigenvalueSection = surveyData.find(section => 
                  section.questions.some(q => q.id === 'generalized-eigenvalue')
                );
                
                if (!generalizedEigenvalueSection) return null;

                const generalizedEigenvalueQuestion = generalizedEigenvalueSection.questions.find(q => q.id === 'generalized-eigenvalue');
                if (!generalizedEigenvalueQuestion || !generalizedEigenvalueQuestion.children) return null;

                return generalizedEigenvalueQuestion.children.map((subOption) => {
                  const isSubOptionSelected = formData[subOption.id] === true;
                  if (!isSubOptionSelected) return null;

                  const isExpanded = expandedSections.has(subOption.id);

                  return (
                    <div key={subOption.id} className="mb-6 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(subOption.id)}
                        className="w-full px-6 py-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium">
                            {subOption.title.charAt(0)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{subOption.title}</h3>
                        </div>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 py-4 border-t border-gray-200">
                          {subOption.content && (
                            <p className="text-gray-600 mb-4 text-sm">{subOption.content}</p>
                          )}
                          <div className="space-y-4">
                            {subOption.children && subOption.children.map((question) => 
                              renderOperationQuestionSummary(question)
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
