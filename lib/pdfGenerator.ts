import jsPDF from 'jspdf';

interface SurveyFormData {
  [key: string]: string | string[] | boolean;
}

interface SurveyQuestion {
  id: string;
  title: string;
  description?: string;
  content?: string;
  children?: SurveyQuestion[];
}

interface SurveySection {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
}

export function generateSurveyPDF(formData: SurveyFormData, surveyData: SurveySection[]): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to format values
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

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ExaNLA Survey Response Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Submission Details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Submission Details', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`Library Name: ${formatValue(formData['library-name'])}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Version: ${formatValue(formData['library-version'])}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Contact Name: ${formatValue(formData['contact-name'])}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Email: ${formatValue(formData['contact-email'])}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Organization: ${formatValue(formData['contact-organization'])}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  // Selected NLA Operations
  const selectedOperations = Object.entries(formData)
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
    .map(([key]) => {
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
      return operationNames[key] || key;
    });

  if (selectedOperations.length > 0) {
    checkNewPage(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Selected NLA Operations', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    selectedOperations.forEach((operation, index) => {
      yPosition = addText(`${index + 1}. ${operation}`, margin + 10, yPosition, pageWidth - 2 * margin - 10);
    });
    yPosition += 10;
  }

  // Detailed Responses - Only show selected NLA operations and their responses
  const selectedOperationIds = Object.entries(formData)
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
    .map(([key]) => key);

  // Also check for standard-eigenvalue and generalized-eigenvalue selections
  const hasStandardEigenvalue = formData['standard-eigenvalue'] === true;
  const hasGeneralizedEigenvalue = formData['generalized-eigenvalue'] === true;

  // First, show general information sections (library info, contact, etc.)
  const generalSections = surveyData.filter(section => 
    ['library-info', 'use-case-info'].includes(section.id)
  );

  generalSections.forEach((section, sectionIndex) => {
    checkNewPage(30);
    
    // Section header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sectionIndex + 1}. ${section.title}`, margin, yPosition);
    yPosition += 8;

    if (section.description) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      yPosition = addText(section.description, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    }

    // Section questions
    const renderQuestion = (question: SurveyQuestion, level: number = 0) => {
      const value = formData[question.id];
      
      checkNewPage(15);
      
      const indent = level * 10;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      
      // Question title
      yPosition = addText(`${question.title}:`, margin + indent, yPosition, pageWidth - 2 * margin - indent);
      
      // Answer
      doc.setFont('helvetica', 'bold');
      yPosition = addText(formatValueWithOther(question.id, value), margin + indent + 10, yPosition, pageWidth - 2 * margin - indent - 10);
      yPosition += 3;

      // Children questions
      if (question.children && question.children.length > 0) {
        question.children.forEach((child: SurveyQuestion) => {
          yPosition = renderQuestion(child, level + 1);
        });
      }

      return yPosition;
    };

    section.questions.forEach(question => {
      yPosition = renderQuestion(question);
    });

    yPosition += 10;
  });

  // Then show only selected NLA operations with their detailed responses
  let operationIndex = 0;

  // Define renderOperationQuestion function outside the loops so it can be reused
  const renderOperationQuestion = (question: SurveyQuestion, level: number = 0) => {
    const value = formData[question.id];
    
    checkNewPage(15);
    
    const indent = level * 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    // Question title
    yPosition = addText(`${question.title}:`, margin + indent, yPosition, pageWidth - 2 * margin - indent);
    
    // Answer (show "Not specified" if no response)
    doc.setFont('helvetica', 'bold');
    yPosition = addText(formatValueWithOther(question.id, value), margin + indent + 10, yPosition, pageWidth - 2 * margin - indent - 10);
    yPosition += 3;

    // Children questions - Show ALL children for selected operations
    if (question.children && question.children.length > 0) {
      question.children.forEach((child: SurveyQuestion) => {
        yPosition = renderOperationQuestion(child, level + 1);
      });
    }

    return yPosition;
  };

  // Process direct operations (like matrix-multiplication)
  selectedOperationIds.forEach((operationId) => {
    const operationSection = surveyData.find(section => 
      section.questions.some(q => q.id === operationId)
    );
    
    if (!operationSection) return;

    const operationQuestion = operationSection.questions.find(q => q.id === operationId);
    if (!operationQuestion) return;

    checkNewPage(30);
    
    // Operation header
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

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${generalSections.length + operationIndex + 1}. ${operationNames[operationId] || operationId}`, margin, yPosition);
    yPosition += 8;

    // Operation description
    if (operationQuestion.content) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      yPosition = addText(operationQuestion.content, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    }

    // Operation questions and responses - Show ALL questions for selected operations

    // Process the operation question and its children
    yPosition = renderOperationQuestion(operationQuestion);
    yPosition += 10;
    operationIndex++;
  });

  // Process Standard Eigenvalue Problems (if selected)
  if (hasStandardEigenvalue) {
    const standardEigenvalueSection = surveyData.find(section => 
      section.questions.some(q => q.id === 'standard-eigenvalue')
    );
    
    if (standardEigenvalueSection) {
      const standardEigenvalueQuestion = standardEigenvalueSection.questions.find(q => q.id === 'standard-eigenvalue');
      if (standardEigenvalueQuestion) {
        checkNewPage(30);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${generalSections.length + operationIndex + 1}. Standard Eigenvalue Problems (Ax = λx)`, margin, yPosition);
        yPosition += 8;

        // Process each sub-option that was selected
        if (standardEigenvalueQuestion.children) {
          standardEigenvalueQuestion.children.forEach((subOption) => {
            const isSubOptionSelected = formData[subOption.id] === true;
            if (isSubOptionSelected) {
              checkNewPage(20);
              
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text(`${subOption.title}`, margin + 10, yPosition);
              yPosition += 6;

              if (subOption.content) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                yPosition = addText(subOption.content, margin + 10, yPosition, pageWidth - 2 * margin - 10);
                yPosition += 5;
              }

              // Process sub-option questions
              if (subOption.children) {
                subOption.children.forEach((question) => {
                  yPosition = renderOperationQuestion(question, 1);
                });
              }
              yPosition += 5;
            }
          });
        }
        operationIndex++;
      }
    }
  }

  // Process Generalized Eigenvalue Problems (if selected)
  if (hasGeneralizedEigenvalue) {
    const generalizedEigenvalueSection = surveyData.find(section => 
      section.questions.some(q => q.id === 'generalized-eigenvalue')
    );
    
    if (generalizedEigenvalueSection) {
      const generalizedEigenvalueQuestion = generalizedEigenvalueSection.questions.find(q => q.id === 'generalized-eigenvalue');
      if (generalizedEigenvalueQuestion) {
        checkNewPage(30);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${generalSections.length + operationIndex + 1}. Generalized Eigenvalue Problems (Ax = λBx)`, margin, yPosition);
        yPosition += 8;

        // Process each sub-option that was selected
        if (generalizedEigenvalueQuestion.children) {
          generalizedEigenvalueQuestion.children.forEach((subOption) => {
            const isSubOptionSelected = formData[subOption.id] === true;
            if (isSubOptionSelected) {
              checkNewPage(20);
              
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text(`${subOption.title}`, margin + 10, yPosition);
              yPosition += 6;

              if (subOption.content) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                yPosition = addText(subOption.content, margin + 10, yPosition, pageWidth - 2 * margin - 10);
                yPosition += 5;
              }

              // Process sub-option questions
              if (subOption.children) {
                subOption.children.forEach((question) => {
                  yPosition = renderOperationQuestion(question, 1);
                });
              }
              yPosition += 5;
            }
          });
        }
        operationIndex++;
      }
    }
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Page ${i} of ${pageCount} - ExaNLA Survey Response Report`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Download the PDF
  const fileName = `ExaNLA_Survey_Response_${formatValue(formData['library-name'])}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
