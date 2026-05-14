export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function createApiError(response: Response, prefix = "API 요청") {
  let apiMessage = "";

  try {
    const body = (await response.json()) as { message?: string };
    apiMessage = body.message ? ` (${body.message})` : "";
  } catch {
    apiMessage = "";
  }

  return new ApiError(`${prefix}에 실패했습니다${apiMessage}.`, response.status);
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
}
