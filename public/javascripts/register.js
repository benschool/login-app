function register({ username, password }, callback) {
  axios.post('http://localhost:3000/auth/register',
    {
      username: username,
      password: password,
    },
    { headers: { "Content-type": "application/json; charset=UTF-8" }}
  ).then((r) => callback({ success: r.success, response: r }))
    .catch((e) => callback({ success: false, response: e.response }))
}

document.getElementById('password').addEventListener('keyup', ({ key }) => key === 'Enter' ? submitForm() : null);
document.getElementById('username').addEventListener('keyup', ({ key }) => key === 'Enter' ? submitForm() : null);

function submitForm() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (!usernameInput.value) return usernameInput.select();
  if (!passwordInput.value) return passwordInput.select();

  register({ username: usernameInput.value, password: passwordInput.value }, ({ success, response }) => {
    console.log(response)
    if (success || response.data === 'OK') return window.location.href = "../..";

    document.getElementById('error').innerText = response.data
  })
}