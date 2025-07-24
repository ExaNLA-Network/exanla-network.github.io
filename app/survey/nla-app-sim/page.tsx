'use client';

import { useState, useEffect } from 'react';
import { surveyData, SurveyQuestion } from '../index';

interface FormData {
  [key: string]: string | string[] | boolean;
}

export default function NlaAppSimSurveyPage() {
  const [formData, setFormData] = useState<FormData>({});
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleInputChange = (questionId: string, value: string | string[] | boolean) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      id: `survey_${Date.now()}`,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      responses: formData
    };

    console.log('Survey submission:', submissionData);
    setSubmitted(true);
  };

  const renderQuestion = (question: SurveyQuestion, level: number = 0) => {
    const isCollapsed = collapsedSections.has(question.id);
    const hasChildren = question.children && question.children.length > 0;
    
    // Check if this is a selectable section
    const isSelectable = question.isSelectable === true;
    const isSelected = formData[question.id] === true;

    // If this is a selectable section and it's not selected, only show the title and checkbox
    if (isSelectable && !isSelected && hasChildren) {
      return (
        <div key={question.id} className={`mb-6 ${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={false}
                onChange={(e) => handleInputChange(question.id, e.target.checked)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <h3 className={`font-semibold text-gray-800 ${level === 0 ? 'text-lg' : 'text-base'} cursor-pointer`}>
                {question.title}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
            </div>
          </div>
        </div>
      );
    }

    // Check if this is an NLA operation section or a benchmark operation that should be clickable
    const isNlaOperation = [
      'eigenvalue-problems',
      'standard-eigenvalue',
      'generalized-eigenvalue',
      'symmetric-hermitian',
      'quasi-hermitian-bse',
      'non-symmetric-hermitian',
      'cholesky-factorization',
      'qr-factorization',
      'matrix-inversion',
      'matrix-multiplication',
      'polynomial-filtering',
      'linear-system-solvers',
      'matrix-operations'
    ].includes(question.id);
    const isNlaSelected = formData[question.id] === true;
    
    // Check if this is an eigenvalue type that should be clickable
    const isEigenvalueType = ['standard-eigenvalue', 'generalized-eigenvalue'].includes(question.id);
    const isEigenvalueTypeSelected = formData[question.id] === true;
    
    // Check if this is a matrix type that should be clickable
    const isMatrixType = ['symmetric-hermitian', 'non-symmetric-hermitian', 'quasi-hermitian-bse', 'gen-symmetric-hermitian', 'other-eigenvalue-type'].includes(question.id);
    const isMatrixTypeSelected = formData[question.id] === true;
    
    // Check if this is a linear system type that should be clickable
    const isLinearSystemType = ['dense-linear-systems', 'sparse-linear-systems'].includes(question.id);
    const isLinearSystemTypeSelected = formData[question.id] === true;
    
    // Check if this is a library details section that should be conditionally shown
    const isLibraryDetails = question.id.includes('-details') && question.id !== 'sym-herm-library-details' && question.id !== 'non-sym-library-details' && question.id !== 'bse-library-details' && question.id !== 'other-eigenvalue-library-details';
    
    // Check if this is an interested library details section
    const isInterestedLibraryDetails = question.id.includes('-interested-details');
    
    // Extract library name from ID
    const libraryName = question.id.includes('-details') ? 
      (question.id.includes('-interested-details') ? 
        question.id.split('-').slice(-3, -2)[0] : 
        question.id.split('-').slice(-2, -1)[0]) : '';
    
    // Determine the parent library selection based on the section type
    let parentLibrarySelection = '';
    if (isInterestedLibraryDetails) {
      parentLibrarySelection = question.id.startsWith('sym-herm-') ? 'sym-herm-libraries-interested' :
                              question.id.startsWith('gen-sym-herm-') ? 'gen-gen-sym-herm-libraries-interested' :
                              question.id.startsWith('non-sym-') ? 'non-sym-libraries-interested' :
                              question.id.startsWith('bse-') ? 'bse-libraries-interested' :
                              question.id.startsWith('other-eigenvalue-') ? 'other-eigenvalue-libraries-interested' : '';
    } else {
      parentLibrarySelection = question.id.startsWith('sym-herm-') ? 'sym-herm-libraries-used' :
                              question.id.startsWith('gen-sym-herm-') ? 'gen-gen-sym-herm-libraries-used' :
                              question.id.startsWith('non-sym-') ? 'non-sym-libraries-used' :
                              question.id.startsWith('bse-') ? 'bse-libraries-used' :
                              question.id.startsWith('other-eigenvalue-') ? 'other-eigenvalue-libraries-used' : '';
    }
    
    // Map library names to their display names
    const libraryNameMap: { [key: string]: string } = {
      'lapack': 'LAPACK',
      'scalapack': 'ScaLAPACK',
      'elpa': 'ELPA',
      'eigenexa': 'EigenExa',
      'slepc': 'SLEPc',
      'arpack': 'ARPACK',
      'primme': 'PRIMME',
      'anasazi': 'Anasazi',
      'trilinos': 'Trilinos',
      'petsc': 'PETSc',
      'mkl': 'Intel MKL',
      'acml': 'AMD ACML',
      'essl': 'IBM ESSL',
      'libsci': 'Cray LibSci',
      'other': 'Other'
    };
    
    const displayLibraryName = libraryNameMap[libraryName] || libraryName.charAt(0).toUpperCase() + libraryName.slice(1);
    const isLibrarySelected = parentLibrarySelection && (formData[parentLibrarySelection] as string[] || []).includes(displayLibraryName);
    
    if ((isLibraryDetails || isInterestedLibraryDetails) && !isLibrarySelected) {
      return null;
    }

    return (
      <div key={question.id} className={`mb-6 ${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {(isNlaOperation || isSelectable) && (
              <input
                type="checkbox"
                checked={formData[question.id] === true}
                onChange={(e) => handleInputChange(question.id, e.target.checked)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
            )}
            <h3 className={`font-semibold text-gray-800 ${level === 0 ? 'text-lg' : 'text-base'} ${(isNlaOperation || isSelectable) ? 'cursor-pointer' : ''}`}>
              {question.title}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
          </div>
          {hasChildren && !isNlaOperation && !isEigenvalueType && !isMatrixType && !isLinearSystemType && (
            <button
              type="button"
              onClick={() => toggleSection(question.id)}
              className="text-blue-600 hover:text-blue-800 transition-colors p-1"
              aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          
          {(isLibraryDetails || isInterestedLibraryDetails) && isLibrarySelected && hasChildren && (
            <button
              type="button"
              onClick={() => toggleSection(question.id)}
              className="text-blue-600 hover:text-blue-800 transition-colors p-1"
              aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {question.content && (
          <p className="text-gray-600 mt-1 mb-3">{question.content}</p>
        )}

        {!hasChildren && (
          <div className="mt-3">
            {question.type === 'text' && (
              <input
                type="text"
                value={formData[question.id] as string || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                required={question.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer..."
              />
            )}

            {question.type === 'textarea' && (
              <textarea
                value={formData[question.id] as string || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                required={question.required}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer..."
              />
            )}

            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-4">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={formData[question.id] === option}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {question.type === 'checkbox' && question.options && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded text-sm">
                      <input
                        type="checkbox"
                        value={option}
                        checked={(formData[question.id] as string[] || []).includes(option)}
                        onChange={(e) => {
                          const currentValues = formData[question.id] as string[] || [];
                          const newValues = e.target.checked
                            ? [...currentValues, option]
                            : currentValues.filter(v => v !== option);
                          handleInputChange(question.id, newValues);
                        }}
                        className="mr-1 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 text-xs whitespace-nowrap">{option}</span>
                    </label>
                  ))}
                </div>
                {question.options.includes('Other (please specify):') &&
                  (formData[question.id] as string[] || []).includes('Other (please specify):') && (
                    Array.isArray(question.children) && question.children.length > 0 ? (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {question.children[0].title}
                        </label>
                        <input
                          type="text"
                          value={Array.isArray(question.children) && question.children.length > 0 ? String(formData[question.children[0].id] ?? '') : ''}
                          onChange={e => handleInputChange(question.children && question.children.length > 0 ? question.children[0].id : '', e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={question.children && question.children.length > 0 ? question.children[0].content : ''}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={String(formData[`${question.id}-other`] ?? '')}
                        onChange={e => handleInputChange(`${question.id}-other`, e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please specify other..."
                      />
                    )
                )}
              </div>
            )}

            {question.type === 'rating' && question.options && (
              <div className="flex flex-wrap gap-4">
                {question.options.map((option) => (
                  <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={formData[question.id] === option}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      required={question.required}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {hasChildren && (
          <div className="mt-4 space-y-4">
            {question.children!.map((child) => {
              const isDomainFunctionSection = child.id.includes('-functions');
              if (isDomainFunctionSection) {
                return null;
              }
              
              if (isNlaOperation && !isNlaSelected) {
                return null;
              }
              
              if (isEigenvalueType && !isEigenvalueTypeSelected) {
                return null;
              }
              
              if (isMatrixType && !isMatrixTypeSelected) {
                return null;
              }
              
              if (isLinearSystemType && !isLinearSystemTypeSelected) {
                return null;
              }
              
              if (isLibraryDetails && (!isLibrarySelected || isCollapsed)) {
                return null;
              }
              
              if (isCollapsed) {
                return null;
              }
              
              return renderQuestion(child, level + 1);
            })}
          </div>
        )}
        
        {question.id === 'domain-selection' && (
          <div className="mt-4 space-y-4">
            {(() => {
              const selectedDomain = formData['domain-selection'] as string;
              
              if (!selectedDomain) return null;
              
              const libraryDomainSection = surveyData.find(section => section.id === 'library-info');
              const domainQuestion = libraryDomainSection?.questions.find(q => q.id === 'library-domain');
              const domainSection = domainQuestion?.children?.find(q => 
                q.id.includes('-functions') && q.title === selectedDomain
              );
              
              if (domainSection && domainSection.children) {
                return domainSection.children.map(child => {
                  return (
                    <div key={child.id} className={`mb-6 ${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold text-gray-800 ${level === 0 ? 'text-lg' : 'text-base'}`}>
                          {child.title}
                          {child.required && <span className="text-red-500 ml-1">*</span>}
                        </h3>
                      </div>

                      {child.content && (
                        <p className="text-gray-600 mt-1 mb-3">{child.content}</p>
                      )}

                      <div className="mt-3">
                        {child.type === 'text' && (
                          <input
                            type="text"
                            value={formData[child.id] as string || ''}
                            onChange={(e) => handleInputChange(child.id, e.target.value)}
                            required={child.required}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your answer..."
                          />
                        )}

                        {child.type === 'checkbox' && child.options && (
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {child.options.map((option) => (
                                <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded text-sm">
                                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={(formData[child.id] as string[] || []).includes(option)}
                                    onChange={(e) => {
                                      const currentValues = formData[child.id] as string[] || [];
                                      const newValues = e.target.checked
                                        ? [...currentValues, option]
                                        : currentValues.filter(v => v !== option);
                                      handleInputChange(child.id, newValues);
                                    }}
                                    className="mr-1 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-gray-700 text-sm whitespace-nowrap">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              }
              
              return <div className="text-red-500">Debug: No functionality questions found for {selectedDomain}</div>;
            })()}
          </div>
        )}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your survey response has been submitted successfully. We appreciate your input for our NLA operations and benchmarking preparation!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({});
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Application/Simulation Library Survey
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Help us understand the Numerical Linear Algebra (NLA) operations used in your application/simulation libraries. 
              This survey will help prepare for benchmarking and identify common NLA patterns across different domains.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {surveyData.map((section) => (
              <div key={section.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                      {section.description && (
                        <div className="mt-4 bg-blue-50 rounded-lg p-6 text-gray-700">
                          {section.description.split('\n\n').map((paragraph, idx) => (
                            <div key={idx} className="mb-4 last:mb-0">
                              {paragraph.split('\n').map((line, lineIdx) => {
                                const indentLevel = line.startsWith('    ') ? 2 : line.startsWith('  ') ? 1 : 0;
                                const bulletType = line.includes('◦') ? 'circle' : 'disc';
                                return (
                                  <p 
                                    key={lineIdx} 
                                    className={`${
                                      line.includes('•') || line.includes('◦') 
                                        ? 'flex items-start' 
                                        : ''
                                    } ${
                                      indentLevel === 1 
                                        ? 'ml-4' 
                                        : indentLevel === 2 
                                          ? 'ml-8' 
                                          : ''
                                    } mb-1 last:mb-0`}
                                  >
                                    {(line.includes('•') || line.includes('◦')) ? (
                                      <>
                                        <span 
                                          className={`mr-2 ${
                                            bulletType === 'circle' 
                                              ? 'text-gray-500 text-sm' 
                                              : 'text-blue-500'
                                          }`}
                                        >
                                          {bulletType === 'circle' ? '◦' : '•'}
                                        </span>
                                        <span>{line.replace(/^[\s•◦]+/, '').trim()}</span>
                                      </>
                                    ) : (
                                      line
                                    )}
                                  </p>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                      aria-label={collapsedSections.has(section.id) ? 'Expand section' : 'Collapse section'}
                    >
                      <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${
                          collapsedSections.has(section.id) ? 'rotate-0' : 'rotate-180'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {!collapsedSections.has(section.id) && (
                    <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
                      {section.questions.map((question) => renderQuestion(question))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-center pt-10">
              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 
                         transition-colors duration-200 font-semibold text-lg shadow-sm 
                         hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2"
              >
                Submit Survey
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 