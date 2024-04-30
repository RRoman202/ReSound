import { jwtDecode } from "jwt-decode";

const url = "https://localhost:7262/Users";
export const getUser = async (token: string) => {
  const decoded = jwtDecode(token);
  const userId = decoded.ID;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
  const options = {
    method: "GET",
    headers: headers,
  };
  const result = await fetch(url + `/${userId}`, options);

  if (result.ok) {
    const user = await result.json();
    const username = user.login;
    const userid = user.idUser;
    localStorage.setItem("user", username);
    localStorage.setItem("userid", userid);
    localStorage.setItem("userfull", JSON.stringify(user));

    window.location.reload();
  }
};
