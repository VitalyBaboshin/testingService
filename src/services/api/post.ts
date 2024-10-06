export function post<T, V>(url: string, body: V): Promise<T> {
  return fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
    .catch(error => {
      console.error('Error:', error);
    });
}