export interface SurveyQuestion {
  id: string;
  title: string;
  type: 'text' | 'textarea' | 'multiple-choice' | 'checkbox' | 'rating' | 'section';
  content?: string;
  required?: boolean;
  options?: string[];
  children?: SurveyQuestion[];
  collapsed?: boolean;
  isSelectable?: boolean;
  optionGroups?: {
    groupTitle: string;
    options: string[];
  }[];
  showOnlyWhenParentSelected?: boolean;
}

export interface SurveySection {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
} 