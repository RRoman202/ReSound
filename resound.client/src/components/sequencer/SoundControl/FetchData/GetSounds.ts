const url = 'https://localhost:7262/Files';
export const getSounds = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const options = {
    method: "GET",
  };
  const result = await fetch(url, { ...options, headers });

  if (result.ok) {
    const sounds = await result.json();

    return sounds;
  }
  return [];
};
