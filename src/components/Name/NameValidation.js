export function validateName(name) {
  const nameRegex = /^[a-zA-Z\s-]+$/;
  return nameRegex.test(name);
}
