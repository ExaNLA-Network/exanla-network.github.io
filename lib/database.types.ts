export interface Database {
  public: {
    Tables: {
      survey_submissions: {
        Row: {
          id: string;
          created_at: string;
          library_name: string | null;
          library_version: string | null;
          responses: Record<string, string | string[] | boolean | number>;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          library_name?: string | null;
          library_version?: string | null;
          responses: Record<string, string | string[] | boolean | number>;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          library_name?: string | null;
          library_version?: string | null;
          responses?: Record<string, string | string[] | boolean | number>;
          user_agent?: string | null;
        };
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: unknown;
    };
    Enums: {
      [key: string]: unknown;
    };
  };
}
