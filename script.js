const form = document.querySelector('form');
const input = form.querySelector('input')

const button = document.querySelector('button.register');
const userlogin = {};


//login user and verify details, then redirect
form.addEventListener('submit',(e)=>{
  const formData = new FormData(form);
 e.preventDefault();
  console.log(input.value);
  for (const [key, value] of formData) {
    {console.log(`${key}: ${value}\n`);}
    userlogin[key] = value;
    
  }
   console.log(JSON.stringify(userlogin));
   postData();
   
})

button.addEventListener('click',(e)=>{
  window.location.href= "http://127.0.0.1:5500/loginbasic/signup.html"
})

async function postData(data = {}) {
  // Default options are marked with *
  url = "http://localhost:3000/login";
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
       //'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(userlogin) // body data type must match "Content-Type" header
  });
  
  if(response.ok){
    window.localStorage.setItem('user', userlogin.email);
    window.location.href= "http://127.0.0.1:5500/loginbasic/welcome.html";


  }
  else
  {
    const label = form.querySelector('label.forgot');
    label.textContent = "Wrong email/password";
  }

}



