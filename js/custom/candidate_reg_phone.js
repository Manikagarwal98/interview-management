//--------------function to check the length of the number------------------------
    function myFunction()
    {
      if(document.getElementById('phone').value.length == 10 )
      {
      document.getElementById("OTP").style.visibility = "visible";
    return false;
  }
      else{
        alert("enter correct number");
        return false;
      }
    }
    var getToken = window.location.search.slice(1); //store the token value from url in a variable
//------------------------api to post phone no.-------------------------------
  let phoneNo = [];
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
 //------------------------api to post OTP--------------------------------------------
 let emp_data = [];

 const add_emp = (ev)=>{
     ev.preventDefault();  //to stop the form submitting
     let details = {
       "code": document.getElementById('code').value, //OTP
       "mobileNo": document.getElementById('phone').value,//mobileno
       "token":  getToken.substring(getToken.indexOf('=') + 1)//token
       }
     emp_data.push(details);
     const options ={
       method:"POST",
 headers: {
 'Content-Type': 'application/json'
 },
       body: JSON.stringify(details)
     };
     fetch('https://hr502.herokuapp.com/save/application', options)
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
         alert('You have Successfully Registered');
     }
     })
 };
 document.addEventListener('DOMContentLoaded', ()=>{
     document.getElementById('btn1').addEventListener('click', add_emp);
 });
