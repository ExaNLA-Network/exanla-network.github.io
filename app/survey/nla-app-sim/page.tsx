'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { surveyData, SurveyQuestion } from '../index';

interface FormData {
  [key: string]: string | string[] | boolean;
}

export default function NlaAppSimSurveyPage() {
  const [formData, setFormData] = useState<FormData>({});
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => {
    // Initialize with all section IDs collapsed by default
    return new Set(surveyData.map(section => section.id));
  });
  const [submitted, setSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [hoveredOperation, setHoveredOperation] = useState<string | null>(null);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<{id: string, value: boolean} | null>(null);
  const [activeOperation, setActiveOperation] = useState<string | null>(null);

  // Add ref for scrolling
  const operationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Function to scroll to operation
  const scrollToOperation = (operationId: string) => {
    if (operationRefs.current[operationId]) {
      // Add a small offset (e.g., 20px) to position slightly below the top
      const offset = 20;
      const elementPosition = operationRefs.current[operationId]?.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to check if all questions in a section are answered
  const isSectionComplete = (question: SurveyQuestion): boolean => {
    if (!question.children) {
      // For leaf questions, check if they have a value
      const value = formData[question.id];
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return false;
      }
      return true;
    }

    // For sections with children, check all children recursively
    return question.children.every(child => isSectionComplete(child));
  };

  // Track selected NLA operations count
  const selectedNlaOperations = useMemo(() => {
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
          'linear-system-solvers'
        ].includes(key);
        return isNlaOperation && value === true;
      })
      .map(([key]) => key);
  }, [formData]);

  // Calculate progress
  const totalSections = surveyData.length;
  const completedCount = completedSections.size;
  const progress = (completedCount / totalSections) * 100;

  // Mark section as complete when any form data is added for that section
  useEffect(() => {
    const newCompletedSections = new Set(completedSections);
    Object.keys(formData).forEach(key => {
      const sectionId = surveyData.find(section => 
        section.questions.some(q => q.id === key)
      )?.id;
      if (sectionId) {
        newCompletedSections.add(sectionId);
      }
    });
    if (newCompletedSections.size !== completedSections.size || 
        [...newCompletedSections].some(id => !completedSections.has(id))) {
      setCompletedSections(newCompletedSections);
    }
  }, [formData, completedSections]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      // If uncollapsing a section
      if (selectedNlaOperations.includes(sectionId)) {
        // If it's an NLA operation, collapse other selected operations
        selectedNlaOperations.forEach(op => {
          if (op !== sectionId) {
            newCollapsed.add(op);
          }
        });
        setActiveOperation(sectionId);
      }
      newCollapsed.delete(sectionId);
    } else {
      // If collapsing a section
      newCollapsed.add(sectionId);
      if (activeOperation === sectionId) {
        setActiveOperation(null);
      }
    }
    setCollapsedSections(newCollapsed);
  };

  // Function to get all question IDs within a section recursively
  const getAllQuestionIds = (question: SurveyQuestion): string[] => {
    let ids = [question.id];
    if (question.children) {
      question.children.forEach(child => {
        ids = [...ids, ...getAllQuestionIds(child)];
      });
    }
    return ids;
  };

  const handleInputChange = (questionId: string, value: string | string[] | boolean) => {
    // Check if this is an NLA operation checkbox
    const isNlaOperation = [
      'matrix-multiplication',
      'symmetric-hermitian',
      'quasi-hermitian-bse',
      'non-symmetric-hermitian',
      'cholesky-factorization',
      'qr-factorization',
      'matrix-inversion',
      'polynomial-filtering',
      'linear-system-solvers'
    ].includes(questionId);

    if (isNlaOperation && typeof value === 'boolean') {
      if (value === true) {
        // Show warning but don't prevent selection
        if (selectedNlaOperations.length >= 3) {
          setPendingOperation({ id: questionId, value });
          setShowWarningDialog(true);
        }
        // Always collapse other operations when selecting a new one
        const newCollapsed = new Set(collapsedSections);
        selectedNlaOperations.forEach(op => {
          if (op !== questionId) {
            newCollapsed.add(op);
          }
        });
        // Uncollapse the newly selected operation
        newCollapsed.delete(questionId);
        setCollapsedSections(newCollapsed);
        setActiveOperation(questionId);
        // Update form data
        setFormData(prev => ({
          ...prev,
          [questionId]: value
        }));
        // Scroll to the selected operation after a short delay to allow for state updates
        setTimeout(() => scrollToOperation(questionId), 100);
        return;
      } else {
        // If deselecting an operation
        if (activeOperation === questionId) {
          setActiveOperation(null);
        }
        
        // Find the operation in the survey data
        const operation = surveyData.find(section => 
          section.questions.find(q => q.id === questionId)
        )?.questions.find(q => q.id === questionId);

        if (operation) {
          // Get all question IDs within this operation
          const questionIds = getAllQuestionIds(operation);
          
          // Remove all answers for this operation
          setFormData(prev => {
            const newFormData = { ...prev };
            questionIds.forEach(id => {
              delete newFormData[id];
            });
            return newFormData;
          });
        } else {
          // Just remove the operation selection if we can't find the operation
          setFormData(prev => {
            const newFormData = { ...prev };
            delete newFormData[questionId];
            return newFormData;
          });
        }
        return;
      }
    }

    // Handle eigenvalue problem selections
    if (questionId === 'standard-eigenvalue' && typeof value === 'boolean') {
      setFormData(prev => ({
        ...prev,
        [questionId]: value
      }));
      return;
    }

    if (questionId === 'generalized-eigenvalue' && typeof value === 'boolean') {
      setFormData(prev => ({
        ...prev,
        [questionId]: value
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleWarningConfirm = () => {
    setShowWarningDialog(false);
    setPendingOperation(null);
  };

  const handleWarningCancel = () => {
    if (pendingOperation) {
      // Revert the checkbox state
      setFormData(prev => ({
        ...prev,
        [pendingOperation.id]: false
      }));
      // Add back to collapsed sections
      setCollapsedSections(prev => {
        const newCollapsed = new Set(prev);
        newCollapsed.add(pendingOperation.id);
        return newCollapsed;
      });
    }
    setShowWarningDialog(false);
    setPendingOperation(null);
  };

  // Add a function to get operation display name
  const getOperationDisplayName = (operationId: string): string => {
    const operationNames: { [key: string]: string } = {
      'matrix-multiplication': 'Matrix-Matrix Multiplication (GEMM)',
      'symmetric-hermitian': 'Symmetric/Hermitian Eigenvalue Problems',
      'quasi-hermitian-bse': 'Quasi-Hermitian (BSE) Eigenvalue Problems',
      'non-symmetric-hermitian': 'Non-symmetric/Non-Hermitian Eigenvalue Problems',
      'cholesky-factorization': 'Cholesky Factorization',
      'qr-factorization': 'QR Factorization',
      'matrix-inversion': 'Matrix Inversion',
      'polynomial-filtering': 'Polynomial Filtering',
      'linear-system-solvers': 'Linear System Solvers'
    };
    return operationNames[operationId] || operationId;
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
    
    // Check if this is an NLA operation section or a benchmark operation that should be clickable
    const isNlaOperation = [
      'matrix-multiplication',
      'symmetric-hermitian',
      'quasi-hermitian-bse',
      'non-symmetric-hermitian',
      'cholesky-factorization',
      'qr-factorization',
      'matrix-inversion',
      'polynomial-filtering',
      'linear-system-solvers'
    ].includes(question.id);

    // Check if this is an eigenvalue type that should be clickable
    const isEigenvalueType = ['standard-eigenvalue', 'generalized-eigenvalue'].includes(question.id);
    const isEigenvalueTypeSelected = formData[question.id] === true;
    
    // Check if this is a matrix type that should be clickable
    const isMatrixType = ['symmetric-hermitian', 'non-symmetric-hermitian', 'quasi-hermitian-bse', 'gen-symmetric-hermitian'].includes(question.id);
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
    
    // Add visual indicator for selected but collapsed operations
    const isSelectedButCollapsed = isNlaOperation && 
      formData[question.id] === true && 
      collapsedSections.has(question.id);

    // Check completion status for operations
    const isOperationComplete = isNlaOperation && formData[question.id] === true && isSectionComplete(question);

    if ((isLibraryDetails || isInterestedLibraryDetails) && !isLibrarySelected) {
      return null;
    }

    return (
      <div 
        key={question.id} 
        className={`mb-6 ${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}
        ref={el => {
          if (isNlaOperation) {
            operationRefs.current[question.id] = el;
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div 
              className="flex items-center relative" 
              onMouseEnter={() => isNlaOperation && setHoveredOperation(question.id)}
              onMouseLeave={() => setHoveredOperation(null)}
            >
              {(isNlaOperation || isSelectable || isEigenvalueType) && (
                <input
                  type="checkbox"
                  checked={formData[question.id] === true}
                  onChange={(e) => handleInputChange(question.id, e.target.checked)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 
                    onClick={() => isNlaOperation && toggleSection(question.id)}
                    className={`font-semibold text-gray-800 ${level === 0 ? 'text-lg' : 'text-base'} 
                    ${(isNlaOperation || isSelectable || isEigenvalueType) ? 'cursor-pointer hover:text-blue-600 transition-colors' : ''}`}
                  >
                    <span className="flex items-center">
                      {question.title}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                      {isNlaOperation && (
                        <svg
                          className={`w-5 h-5 ml-2 transform transition-transform ${
                            collapsedSections.has(question.id) ? 'rotate-0' : 'rotate-180'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </h3>
                  {isSelectedButCollapsed && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      isOperationComplete 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isOperationComplete ? 'Completed' : 'Incomplete'}
                    </span>
                  )}
                </div>
                {isNlaOperation && selectedNlaOperations.length > 3 && formData[question.id] && (
                  <p className="text-amber-600 text-xs mt-1">
                    Consider prioritizing this operation if it&apos;s among your top 3 dominant operations.
                  </p>
                )}
                {isNlaOperation && selectedNlaOperations.length > 3 && !formData[question.id] && hoveredOperation === question.id && (
                  <div className="absolute z-10 mt-2 bg-white border border-amber-200 rounded-lg p-4 shadow-lg w-96">
                    <p className="text-amber-600 text-sm font-medium mb-2">
                      Recommendation: Focus on Top 3 Operations
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      While you can select multiple operations, we recommend focusing on your top 3 dominant operations for benchmarking purposes.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Currently selected:
                    </p>
                    <ul className="mt-1 space-y-1">
                      {selectedNlaOperations.map(op => (
                        <li key={op} className="text-gray-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {getOperationDisplayName(op)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
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
              
              if (isNlaOperation && !formData[question.id]) {
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
        {/* Warning Dialog */}
        {showWarningDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Warning: Multiple Operations Selected
              </h3>
              <p className="text-gray-600 mb-4">
                You are about to select more than 3 NLA operations. While it&apos;s recommended to focus on up to 3 operations, you can proceed if these operations are essential for your application.
              </p>
              <p className="text-gray-600 mb-4">
                Currently selected operations:
                <ul className="mt-2 list-disc pl-5">
                  {selectedNlaOperations.map(op => (
                    <li key={op} className="text-sm">
                      {getOperationDisplayName(op)}
                    </li>
                  ))}
                </ul>
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleWarningCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWarningConfirm}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Proceed Anyway
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-700">Survey Progress</h3>
            <span className="text-sm font-medium text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Application/Simulation Library Survey
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Help us understand the Numerical Linear Algebra (NLA) operations used in your application/simulation libraries. 
              This survey will help prepare for benchmarking and identify common NLA patterns across different domains.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {surveyData.map((section, index) => (
              <div key={section.id} className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 
                          ${completedSections.has(section.id) ? 'border-l-4 border-l-green-500' : ''}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                    ${completedSections.has(section.id) 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-blue-100 text-blue-700'}`}>
                          {index + 1}
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                      </div>
                      {section.description && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-gray-700">
                            {section.description.split('\n\n').map((paragraph, idx) => (
                              <div key={idx} className="mb-4 last:mb-0">
                                {paragraph.split('\n').map((line, lineIdx) => (
                                  <p key={lineIdx} className={`${
                                    line.startsWith('•') ? 'ml-4' : ''
                                  } ${
                                    line.startsWith('⚠️') ? 'text-orange-600 font-semibold mt-6' : ''
                                  } mb-1`}>
                                    {line}
                                  </p>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {collapsedSections.has(section.id) ? (
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="mt-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-lg
                               hover:from-blue-500 hover:to-blue-600 transform hover:scale-[1.02]
                               transition-all duration-200 font-medium text-base shadow-sm 
                               hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                               focus:ring-offset-2 flex items-center group"
                    >
                      <span>Start This Section</span>
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="mb-4 text-blue-600 hover:text-blue-800 transition-all px-4 py-2 rounded-lg 
                                 border border-blue-600 hover:border-blue-800 flex items-center group
                                 hover:bg-blue-50"
                      >
                        <span>Collapse Section</span>
                        <svg
                          className="w-5 h-5 ml-2 transform rotate-180 group-hover:-translate-y-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="space-y-8 mt-6 border-t border-gray-100 pt-6 animate-fadeIn">
                        {section.questions.map((question) => renderQuestion(question))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-center pt-10">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl
                         hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02]
                         transition-all duration-200 font-semibold text-lg shadow-sm 
                         hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2 relative group"
              >
                <span className="relative z-10">Submit Survey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl 
                              opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 