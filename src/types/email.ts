export interface EmailAttachment {
  filename: string;
  content: string; // base64 encoded content
}

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  body: string;
  html?: string;
  cc: string[];
  bcc: string[];
  attachments: EmailAttachment[];
}

export interface EmailFormState extends EmailData {
  isLoading: boolean;
  sendStatus: 'idle' | 'sending' | 'success' | 'error';
  errorMessage?: string;
}

export interface EmailValidationErrors {
  to?: string;
  from?: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
  attachments?: string;
}