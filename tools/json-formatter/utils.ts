export interface JsonValidationResult {
  isValid: boolean;
  parsed: any | null;
  error: string | null;
  errorLine?: number;
}

export function formatJson(input: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    throw error;
  }
}

export function minifyJson(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch (error) {
    throw error;
  }
}

export function validateJson(input: string): JsonValidationResult {
  if (!input.trim()) {
    return { isValid: false, parsed: null, error: 'Input is empty.' };
  }

  try {
    const parsed = JSON.parse(input);
    return { isValid: true, parsed, error: null };
  } catch (error: any) {
    let errorMsg = error.message;
    let errorLine = undefined;
    
    // Extract position for more helpful debugging
    const positionMatch = errorMsg.match(/position (\d+)/);
    if (positionMatch && positionMatch[1]) {
      const position = parseInt(positionMatch[1], 10);
      const textUpToError = input.substring(0, position);
      errorLine = textUpToError.split('\n').length;
    } else {
      const lineMatch = errorMsg.match(/line (\d+)/);
      if (lineMatch && lineMatch[1]) {
        errorLine = parseInt(lineMatch[1], 10);
      }
    }

    const result: JsonValidationResult = { isValid: false, parsed: null, error: errorMsg };
    if (errorLine !== undefined) {
      result.errorLine = errorLine;
    }
    return result;
  }
}
