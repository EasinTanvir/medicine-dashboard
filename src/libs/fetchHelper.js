export async function fetchData(endpoint, options = {}) {
  try {
    const res = await fetch(endpoint, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: options.cache,
      next: { ...options.next },
    });

    if (!res.ok) {
      console.error(`❌ Fetch failed: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ fetchData error:", error);
    throw error;
  }
}
