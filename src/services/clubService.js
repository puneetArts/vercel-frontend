export const createClub = async (clubData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clubs/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubData),
  });
  return res.json();
};

export const getRecommendations = async (interests) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clubs/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interests }),
  });
  return res.json();
};
