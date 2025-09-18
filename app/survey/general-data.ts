import { SurveySection } from './types';

export const generalData: SurveySection[] = [
  {
    id: 'library-info',
    title: 'Codes Information',
    description: 'Basic information about your application/simulation codes.',
    questions: [
      {
        id: 'library-name',
        title: 'Library Name',
        type: 'text',
        required: true,
        content: 'What is the name of your application/simulation codes? (e.g., CP2K, Quantum ESPRESSO, SIESTA, etc.)'
      },
      {
        id: 'library-version',
        title: 'Current Version',
        type: 'text',
        content: 'What is the current version of your codes?'
      },
      {
        id: 'contact-info',
        title: 'Contact Information',
        type: 'section',
        children: [
          {
            id: 'contact-name',
            title: 'Name',
            type: 'text',
            required: true,
            content: 'Your full name'
          },
          {
            id: 'contact-email', 
            title: 'Email',
            type: 'text',
            required: true,
            content: 'Your email address'
          },
          {
            id: 'contact-organization',
            title: 'Organization',
            type: 'text',
            required: true,
            content: 'Your institution or company'
          }
        ]
      },      
      {
        id: 'library-domain',
        title: 'Application Domain',
        type: 'section',
        children: [
          {
            id: 'domain-selection',
            title: 'What is the primary application domain of your codes?',
            type: 'multiple-choice',
            required: true,
            content: 'Select the main domain:',
            options: [
              'Materials Science',
              'Fluid Dynamics',
              'Climate/Weather Modeling',
              'Other (please specify):'
            ]
          },
          {
            id: 'materials-science-functions',
            title: 'Materials Science',
            type: 'section',
            children: [
              {
                id: 'materials-functions',
                title: 'What are the main functionalities of your code?',
                type: 'checkbox',
                content: 'Check all that apply:',
                options: [
                  'Ground state DFT',
                  'Time-dependent DFT',
                  'Many-body perturbation theory (GW, BSE)',
                  'Molecular dynamics',
                  'Quantum transport',
                  'Excited-state dynamics',
                  'Crystal structure prediction',
                  'Phase transitions',
                  'Defect calculations',
                  'Surface science',
                  'Other'
                ]
              },
              {
                id: 'materials-other-specify',
                title: 'If you selected "Other", please specify:',
                type: 'text',
                content: 'Describe the other functionalities:'
              }
            ]
          },
          {
            id: 'climate-weather-functions',
            title: 'Climate/Weather Modeling',
            type: 'section',
            children: [
              {
                id: 'climate-functions',
                title: 'What are the main functionalities of your code?',
                type: 'checkbox',
                content: 'Check all that apply:',
                options: [
                  'Atmospheric modeling',
                  'Ocean modeling',
                  'Climate prediction',
                  'Weather forecasting',
                  'Climate change analysis',
                  'Extreme weather events',
                  'Other'
                ]
              },
              {
                id: 'climate-other-specify',
                title: 'If you selected "Other", please specify:',
                type: 'text',
                content: 'Describe the other functionalities:'
              }
            ]
          },
          {
            id: 'fluid-dynamics-functions',
            title: 'Fluid Dynamics',
            type: 'section',
            children: [
              {
                id: 'fluid-functions',
                title: 'What are the main functionalities of your code?',
                type: 'checkbox',
                content: 'Check all that apply:',
                options: [
                  'Incompressible flow',
                  'Compressible flow',
                  'Turbulence modeling',
                  'Multiphase flow',
                  'Heat transfer',
                  'Combustion',
                  'Aerodynamics',
                  'Other'
                ]
              },
              {
                id: 'fluid-other-specify',
                title: 'If you selected "Other", please specify:',
                type: 'text',
                content: 'Describe the other functionalities:'
              }
            ]
          },
          {
            id: 'other-domain-functions',
            title: 'Other Domain Functions',
            type: 'section',
            children: [
              {
                id: 'other-functions',
                title: 'What are the main functionalities of your code?',
                type: 'text',
                content: 'Please describe the main functionalities of your code',
              }
            ]
          }
        ]
      },
      {
        id: 'use-case-info',
        title: 'Use Case Information',
        type: 'section',
        children: [
          {
            id: 'multiple-use-cases',
            title: 'Does your codes have multiple distinct use cases?',
            type: 'multiple-choice',
            content: 'Different use cases might involve different matrix types, operations, or performance requirements.',
            required: true,
            options: [
              'No, single primary use case',
              'Yes, multiple distinct use cases'
            ]
          },
          {
            id: 'current-use-case',
            title: 'Which use case are you describing in this submission?',
            type: 'text',
            content: 'Please provide a brief name/description for this specific use case (e.g., "Ground state DFT calculations", "Time evolution", "Transport calculations"). This helps us track different submissions from the same codes.',
            required: true
          }
        ]
      },      
            {
        id: 'library-description',
        title: 'Library Description',
        type: 'textarea',
        content: 'Please provide a brief description of your codes and its main functionality.'
      }
    ]
  }
]; 