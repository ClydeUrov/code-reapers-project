export function setUserLS(value) {
  localStorage.setItem("user", JSON.stringify(value));
}

export function getUserLS() {
  try {
    const item = localStorage.getItem("user");
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
}
export function removeUserLS() {
  localStorage.removeItem("user");
}
