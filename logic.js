const auth_url = 'https://api.instagram.com/oauth/authorize?client_id=547762730900603&redirect_uri=https://daniellegelikas.github.io/hopto/&scope=user_profile&response_type=code'
fetch(auth_url, {
    method: "GET" // default, so we can ignore
})