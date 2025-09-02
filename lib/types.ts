export type SurveyResponseValue = string | string[] | boolean | number;

export interface SurveyResponses {
  'library-name'?: string;
  'library-version'?: string;
  'domain-selection'?: string;
  [key: string]: SurveyResponseValue | undefined;
}

export interface SurveySubmission {
  id: string;
  created_at?: string;
  library_name?: string;
  library_version?: string;
  responses: SurveyResponses;
  user_agent?: string;
}

export type { Database } from './database.types.ts'
