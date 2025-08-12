// API utility for making requests to the backend
const API_BASE_URL = "http://localhost:5000";

export const apiCall = async (
  endpoint,
  methodOrOptions = "GET",
  data = null
) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Handle both old format (endpoint, options) and new format (endpoint, method, data)
  let method = "GET";
  let requestData = null;

  if (typeof methodOrOptions === "string") {
    // New format: (endpoint, method, data)
    method = methodOrOptions;
    requestData = data;
  } else if (typeof methodOrOptions === "object") {
    // Old format: (endpoint, options)
    method = methodOrOptions.method || "GET";
    requestData = methodOrOptions.body
      ? JSON.parse(methodOrOptions.body)
      : null;
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token exists
  const token = localStorage.getItem("token");
  console.log(
    "API call to:",
    endpoint,
    "Method:",
    method,
    "Token exists:",
    !!token
  );
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: method,
    headers: defaultHeaders,
  };

  if (
    requestData &&
    (method === "POST" || method === "PUT" || method === "PATCH")
  ) {
    config.body = JSON.stringify(requestData);
  }

  try {
    console.log("Making request to:", url, "with config:", config);
    const response = await fetch(url, config);
    console.log("Response status:", response.status);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiCall;
