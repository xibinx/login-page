let loggedUser = window.localStorage.getItem('user');
const form = document.querySelector('form');
const input = document.querySelector('input');
let user = {};
console.log(loggedUser);
async function getData(){
    url = `http://localhost:3000/info/${loggedUser}`;
   const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
       //'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(userlogin) // body data type must match "Content-Type" header
  });
 user = await response.json();
  console.log(user.email);
  return user;
 
 }
 async function fill(){
    const head = document.querySelector('h1');
    
    user = await getData();
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const adress = document.querySelector('#Adress');
    name.value = user.name;
    email.value = user.email;
    phone.value = user.phone;
    adress.value = user.adress;
    head.textContent = `Welcome , ${user.name}` ;

 }

fill();
const userSend = {};
//TODO: when form is submitted parse data to server and update database.
 form.addEventListener('submit',(e)=>{
   const formData = new FormData(form);
   e.preventDefault();
   for (const [key, value] of formData) {
      {console.log(`${key}: ${value}\n`);}
      userSend[key] = value;
      }
      console.log(JSON.stringify(userSend));
      postData();
      

 })

 async function postData(data = {}) {
   // Default options are marked with *
   url = "http://localhost:3000/editUser";
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
     body: JSON.stringify(userSend) // body data type must match "Content-Type" header
   });
   
   if(response.ok)
   alert('Details Changed Successfuly!');
   
 }