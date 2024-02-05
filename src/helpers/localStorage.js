export function getUsetLS() {
  const user = JSON.parse(localStorage.getItem("user")) || false;
  return user;
}
export function setUserLS(value) {
  localStorage.setItem("user", JSON.stringify(value));
}
export function removeUserLS() {
  localStorage.removeItem("user");
}
