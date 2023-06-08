
const url = 'https://api.instagram.com/oauth/authorize?client_id=547762730900603&redirect_uri=https://daniellegelikas.github.io/hopto/&scope=user_profile&response_type=code'


async function logJSONData() {
  const response = await fetch(url, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  });
  const jsonData = await response.json();
  console.log(jsonData);
}
logJSONData()