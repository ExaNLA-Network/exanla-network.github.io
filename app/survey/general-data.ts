import { SurveySection } from './types';

export const generalData: SurveySection[] = [
  {
    id: 'library-info',
    title: 'Library Information',
    description: 'Basic information about your application/simulation library.',
    questions: [
      {
        id: 'library-name',
        title: 'Library Name',
        type: 'text',
        required: true,
        content: 'What is the name of your application/simulation library? (e.g., CP2K, Quantum ESPRESSO, SIESTA, etc.)'
      },
      {
        id: 'library-version',
        title: 'Current Version',
        type: 'text',
        content: 'What is the current version of your library?'
      },
      {
        id: 'library-domain',
        title: 'Application Domain',
        type: 'section',
        children: [
          {
            id: 'domain-selection',
            title: 'What is the primary application domain of your library?',
            type: 'multiple-choice',
            required: true,
            content: 'Select the main domain:',
            options: [
              'Materials Science',
              'Fluid Dynamics',
              'Climate/Weather Modeling',
              'Other'
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
            title: 'Other',
            type: 'section',
            children: [
              {
                id: 'other-functions',
                title: 'What are the main functionalities of your code?',
                type: 'textarea',
                content: 'Please describe the main functionalities of your library:'
              }
            ]
          }
        ]
      },
            {
        id: 'library-description',
        title: 'Library Description',
        type: 'textarea',
        content: 'Please provide a brief description of your library and its main functionality.'
      }
    ]
  }
]; 