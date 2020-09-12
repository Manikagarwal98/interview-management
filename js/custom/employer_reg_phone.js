    function myFunction() //to check the length of Mobile no
    {
      if(document.getElementById('phone').value.length == 10 )
      {
      document.getElementById("OTP").style.visibility = "visible";//to open the otp section
    return false;
  }
      else{
        alert("enter correct number");
        return false;
      }
    }
  //----------------------------------------------------------------------------
    var getToken = window.location.search.slice(1); //to get the token value
  let phoneNo = []; //api to post mobile no
  const add_pn = (ev)=>{
      ev.preventDefault();  //to stop the form submitting
      let detail = {
        "phoneNo": document.getElementById('phone').value
        }
      phoneNo.push(detail);
      const option ={
        method:"POST",
headers: {
 'Content-Type': 'application/json'
},
        body: JSON.stringify(detail)
      };
      fetch('https://hr502.herokuapp.com/getMsg', option)
      .then(function(response) {
        return response.json();
      }).then(function(text){
      })
 };
 document.addEventListener('DOMContentLoaded', ()=>{
      document.getElementById('btn').addEventListener('click', add_pn);
 });
 //---------------------------------api ends here----------------------------
 let emp_data = []; //api to post otp, phone no and token(received from mail)

 const add_emp = (ev)=>{
     ev.preventDefault();  //to stop the form submitting
     let details = {
       "code": document.getElementById('code').value,
       "mobileNo": document.getElementById('phone').value,
       "token":  getToken.substring(getToken.indexOf('=') + 1)
       }
     emp_data.push(details);
     const options ={
       method:"POST",
 headers: {
 'Content-Type': 'application/json'
 },
       body: JSON.stringify(details)
     };
     fetch('https://hr502.herokuapp.com/postCode', options)
     .then(function(response) {
       return response.json();
     }).then(function(text){
      if(text.msg === 'Looks like wrong code'){
        alert('OTP is Incorrect');
        document.getElementById('code').value == 'NULL';
      }
      else if (typeof(text.msg) === 'undefined') {
        alert('OTP length inappropriate')
      }
       else{
         alert('Company Registered Successfully');
       var emp_login = (window.location.protocol + "//" + window.location.host + "/interview-management/employer_login.html");
       window.location.replace(emp_login);
     } })
 };
 document.addEventListener('DOMContentLoaded', ()=>{
     document.getElementById('btn1').addEventListener('click', add_emp);
 });
//-----------------------api ends here---------------------------------------
