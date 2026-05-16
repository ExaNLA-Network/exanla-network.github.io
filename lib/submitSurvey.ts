import type { SurveyResponses } from './types';

export interface SurveySheetPayload {
  library_name: string;
  library_version: string;
  responses: SurveyResponses;
  user_agent: string;
}

export async function submitSurveyToGoogleSheets(
  payload: SurveySheetPayload
): Promise<void> {
  const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!googleScriptUrl) {
    throw new Error('Missing NEXT_PUBLIC_GOOGLE_SCRIPT_URL');
  }

  await fetch(googleScriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
