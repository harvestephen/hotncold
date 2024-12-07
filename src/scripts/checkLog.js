//Check if a user is logged in
//This function will return a boolean
//run this function inside a async environment
export default async function() {
  const response = await fetch('/api/is-log');
  const data = await response.json();
  return data.logStatus;
}