export const getAccessToken = async () => {
  const client_id = "NbMiZO05fugs3i93Wr7RuHjU5nYzsbZI";
  const client_secret = "poW96DmCZTswIhGo";

  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id,
        client_secret,
      }),
    }
  );

  const data = await response.json();
  return data.access_token;
};
