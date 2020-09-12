//to check if user is already loged in or not---------------
  if(localStorage.getItem('token') != null) {
      var emp_db = (window.location.protocol + "//" + window.location.host + "/interview-management/employer_dashboard.html");
     window.location.replace(emp_db);
  }
//-------------------------------------------------------------------------------------------------
function emp_fp(){ //to reset password
  let change_pw = (window.location.protocol + "//" + window.location.host + "/interview-management/employer_changepassword.html");
      window.location.replace(change_pw);
}
//------------------------------api to post email id and password------------------------------------
let emp_data = [];
const add_emp = (ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let details = {
        'email': document.getElementById('Email').value,
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
    fetch('https://hr502.herokuapp.com/company/login', options)
    .then(function(response) {
      return response.json();
    }).then(function(text){            //store token and companyId in localStorage
      localStorage.setItem("companyId",text.companyId);
      localStorage.setItem("token",text.token);
      if(text.status === 'OK'){      //redirect to company dashboard
        var emp_db = (window.location.protocol + "//" + window.location.host + "/interview-management/employer_dashboard.html");
         window.location.replace(emp_db);
      }
      else if (text.status==='Failed') {
        alert(text.msg);
      }
      else{
        alert('wrong inputs');
      }
    })
  };
  document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('btn').addEventListener('click', add_emp);
});
