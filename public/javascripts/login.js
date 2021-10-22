function checkCredentials({ username, password }, callback) {
  axios.post('http://localhost:3000/auth/login',
    {
      username: username,
      password: password,
    },
    { headers: { "Content-type": "application/json; charset=UTF-8" }}
  ).then((r) => callback({ success: true, response: r }))
    .catch((e) => callback({ success: false, response: e }))
}

document.getElementById('password').addEventListener('keyup', ({ key }) => key === 'Enter' ? submitForm() : null);
document.getElementById('username').addEventListener('keyup', ({ key }) => key === 'Enter' ? submitForm() : null);
document.getElementById('lock').onclick = submitForm;

function submitForm() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (!usernameInput.value) return usernameInput.select();
  if (!passwordInput.value) return passwordInput.select();

  checkCredentials({ username: usernameInput.value, password: passwordInput.value }, ({ success, response }) => {
    console.log(success, response);
    if (success) {
       window.location.href = '../../secret';
       return;
    }

    document.getElementById('error').innerText = response.message;
  })
}