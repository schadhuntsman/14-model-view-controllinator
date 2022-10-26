async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) => {


    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/members/', {
        method: 'POST',
        body: JSON.stringify({ 
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
  
        const response = await fetch('/api/members/login', {
         method: 'POST',
          body: JSON.stringify({
            username,
            password
            }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/dashboard'); 
        } else {
          alert(response.statusText);
        }
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
    document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
    document
    .querySelector('.submit-form')
    .addEventListener('submit', signupFormHandler);

    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);