async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
        ...options.headers,
      },
    });
    if (!response.ok) {
      console.warn(`Admin request failed: ${path}`, response.status);
      return {} as T;
    }
    return response.json();
  } catch (error) {
    console.error('Admin service error:', error);
    return {} as T;
  }
}