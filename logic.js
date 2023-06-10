
const url = 'https://api.instagram.com/oauth/authorize?client_id=547762730900603&redirect_uri=https://daniellegelikas.github.io/hopto/index&scope=user_profile&response_type=code'


async function logJSONData() {
  const response = await fetch(url);
  const jsonData = await response.text();
  console.log(jsonData);
}
logJSONData()