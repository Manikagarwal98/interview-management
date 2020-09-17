let domain = "hr502.herokuapp.com";
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
    var getToken = window.location.search.slice(1);
    console.log(getToken);

    console.log(getToken.substring(getToken.indexOf('=') + 1));


  let phoneNo = [];

  const add_pn = (ev)=>{
      ev.preventDefault();  //to stop the form submitting
      let detail = {

        "phoneNo": document.getElementById('phone').value


        }
      phoneNo.push(detail);

      console.warn('added' , {phoneNo} );
      const option ={
        method:"POST",
headers: {
 'Content-Type': 'application/json'
 // 'Content-Type': 'application/x-www-form-urlencoded',
},
        body: JSON.stringify(detail)
      };
      fetch('https://'+ domain +'/getMsg', option)
      .then(function(response) {
        return response.json();
      }).then(function(text){
        console.log('its working');
        console.log(text);
      })
 };
 document.addEventListener('DOMContentLoaded', ()=>{
      document.getElementById('btn').addEventListener('click', add_pn);
 });

 let emp_data = [];

 const add_emp = (ev)=>{
     ev.preventDefault();  //to stop the form submitting
     let details = {
       "code": document.getElementById('code').value,
       "mobileNo": document.getElementById('phone').value,
       "token":  getToken.substring(getToken.indexOf('=') + 1)


       }
     emp_data.push(details);

     console.warn('added' , {emp_data} );
     const options ={
       method:"POST",
 headers: {
 'Content-Type': 'application/json'

 },
       body: JSON.stringify(details)
     };
     fetch('https://'+domain+'/save/application', options)
     .then(function(response) {
       return response.json();
     }).then(function(text){
       console.log('its working');
       console.log(text.msg);
       console.log(text);
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
