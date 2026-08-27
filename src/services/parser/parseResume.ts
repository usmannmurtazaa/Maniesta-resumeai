import mammoth from 'mammoth';

export async function parseResumeText(file: File): Promise<string> {
  const fileType = file.type;
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  } else if (fileType === 'application/pdf') {
    // PDF parsing is not implemented in this client-side demo.
    // A production system would use a serverless function with pdf-parse.
    throw new Error('PDF parsing is not supported yet. Please upload a DOCX file.');
  } else {
    throw new Error('Unsupported file type');
  }
}