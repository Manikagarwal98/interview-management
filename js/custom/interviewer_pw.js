//-----------------------function to check both the password fields matches or not-----------------------------------------
function checkPassword(form) {
             password1 = form.password1.value;
             password2 = form.password2.value;

            if (password1 != password2) {
                 alert ("\nPassword did not match: Please try again...")
                 return false;
             }
             else{
                 return true;
             }
         }
//--------------------------post api for token and passwerd----------------------------------
     var getToken = window.location.search.slice(1);// store token from url to a variable
      let emp_data = [];

       const add_emp = (ev)=>{
           ev.preventDefault();  //to stop the form submitting
           let details = {
               'token': getToken.substring(getToken.indexOf('=') + 1),
               'password': document.getElementById('password').value

             }
         emp_data.push(details);
         const options ={
           method:"POST",
           headers: {
             'Content-Type': 'application/json'
           },
             body: JSON.stringify(details)
           };
           fetch('https://hr502.herokuapp.com/interviewer/register', options)
           .then(function(response) {
             return response.json();
           }).then(function(text){
             if(text.status=== 'OK'){
               alert("you r registered");
               var intv_log = (window.location.protocol + "//" + window.location.host + "/interview-management/interviewer_login.html");
               window.location.replace(intv_log);
             }

           })
         };
         document.addEventListener('DOMContentLoaded', ()=>{
         document.getElementById('btn').addEventListener('click', add_emp);
       });
