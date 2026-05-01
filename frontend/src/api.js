const API_BASE = process.env.REACT_APP_API_URL || "";

export async function reviewCode(code, language) {
  const res = await fetch(`${API_BASE}/api/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Server error. Please try again.");
  }

  return data;
}
