let domain="hr502.herokuapp.com";
 let emp_data = [];
  const add_emp = (ev)=>{
      ev.preventDefault();  //to stop the form submitting
      let details = {
          'email': document.getElementById('Email').value
        }
    emp_data.push(details);
    const options ={
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(details)
      };
      fetch('https://'+ domain +'/forget/password/company', options)
      .then(function(response) {
        return response.json();
      }).then(function(text){
        if(text.msg === 'Email is sent'){
          alert("Reset password link is sent to your mail");
        }
      else{
        alert("Enter the registered email address")
      } })
    };
    document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('fp_mail').addEventListener('click', add_emp);
  });
