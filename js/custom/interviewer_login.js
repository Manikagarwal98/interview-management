//------------------to check if the interviewer is logedin or not--------------------------
  if(localStorage.getItem('interviewerId') != null) {
    var intv_db = (window.location.protocol + "//" + window.location.host + "/interview-management/interviewer_dashboard.html");
    window.location.replace(intv_db);
  }
//------------------------to redirect to forgot password page-------------------------------------
  function intv_fp(){
    let change_pw = (window.location.protocol + "//" + window.location.host + "/interview-management/interviewer_changepassword.html");
        window.location.replace(change_pw);
  }
//---------------------api to post login cridentials----------------------------------
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
      fetch('https://hr502.herokuapp.com/interviewer/login', options)
      .then(function(response) {
        return response.json();
      }).then(function(text){
      if(text.status === 'OK'){
          localStorage.setItem("interviewerId",text.interviewerId);
          localStorage.setItem("intv_token",text.token);
          var intv_db = (window.location.protocol + "//" + window.location.host + "/interview-management/interviewer_dashboard.html");
          window.location.replace(intv_db);
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
