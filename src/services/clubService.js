export const createClub = async (clubData) => {
  const res = await fetch("http://localhost:5000/api/clubs/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubData),
  });
  return res.json();
};

export const getRecommendations = async (interests) => {
  const res = await fetch("http://localhost:5000/api/clubs/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interests }),
  });
  return res.json();
};
