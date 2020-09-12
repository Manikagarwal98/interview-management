//to check password
         function checkPassword(form) {
             password1 = form.password1.value;
             password2 = form.password2.value;

            if (password1 != password2) {
                 alert ("\nPassword did not match: Please try again...")
                 return false;
             }

             else{
                 return false;
             }
         };
  //-------------------------------------------------------------------------------------
  //POST api for input
       let emp_data = [];
       const add_emp = (ev)=>{
           ev.preventDefault();  //to stop the form submitting
           let details = {              //to store input data in an array
               'name': document.getElementById('c_name').value,
               'address': document.getElementById('address').value,
               'hrFirstName':document.getElementById('HR_fn').value,
               'hrLastName':document.getElementById('HR_ln').value,
               'email':document.getElementById('Email').value,
               'password':document.getElementById('password1').value,
               'cpassword':document.getElementById('password2').value
             };
           emp_data.push(details);
           const options ={
             method:"POST",
		 headers: {
      'Content-Type': 'application/json'},
       body: JSON.stringify(details)
           };
           fetch('https://hr502.herokuapp.com/company/register', options)
           .then(function(response) {
             return response.json();
           }).then(function(text){
             let errString = ("Please enter following fields: \n");
             if(typeof(text.msg) === 'undefined' )     //to check if api is returning errors or not
              {
               for(let err of text.errors){
               errString += err.msg +", ";
             }
                alert(errString);
              }
              else{
                alert("verification mail is sent to Your Email");
                window.location.replace(window.location.protocol + "//" + window.location.host + "/interview-management");
              }
           })
      };
      document.addEventListener('DOMContentLoaded', ()=>{
           document.getElementById('btn').addEventListener('click', add_emp);
      });
