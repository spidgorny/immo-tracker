// @ts-ignore
export const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    let jsonError = await res.json();
    const error = new Error(jsonError.message);
    // Attach extra info to the error object.
    // @ts-ignore
    error.info = jsonError;
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return res.json();
};
