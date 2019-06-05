export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Response not ok");
}

export async function handleError(error) {
  console.error(error);
  throw error;
}

export async function fetchGet(requestUri, itemId) {
  try {
    const response = await fetch(scrubId(requestUri, itemId));
    return await handleResponse(response);
  } catch (error) {
    await handleError(error);
  }
}

export async function fetchDelete(requestUri, itemId) {
  try {
    const response = await fetch(scrubId(requestUri, itemId), {
      method: "DELETE"
    });
    return await handleResponse(response);
  } catch (error) {
    await handleError(error);
  }
}

function scrubId(requestUri, itemId) {
  const cleanId = itemId || "";
  return requestUri + cleanId;
}
