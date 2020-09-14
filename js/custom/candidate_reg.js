  let domain = "hr502.herokuapp.com"
var getToken = window.location.search.slice(1);
//----------------------------------api to get jobs for Apply for dropdown..............................................
const options ={
method:"GET"
};
fetch("https://"+ domain +"/comapanyjobs"+ getToken.substring(getToken.indexOf('=') + 1),options)
  .then(function(response) {
    return response.json();
  }).then(function(text){
    console.log(text);
    console.log(text.length);
    let arr = new Array(2);
    for(let i=0;i<text.length;i++)
    {
  arr[i]=new Array(2)
      arr[i][0] =(text[i].jobName);
  arr[i][1]=(text[i]._id);
    }
    console.log(arr);
    for (let c=0;c<arr.length;c++) {
      var option = document.createElement("option");
      option.data = arr[c][1];
  option.value = arr[c][0] +"$" + arr[c][1]	;
      option.text = arr[c][0];

      document.getElementById("jb_av").appendChild(option);
    }
})

//..........................api to post input data...................................
let emp_data = [];

const add_emp = (ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let details = {
        'fname': document.getElementById('fn').value,
        'lname': document.getElementById('ln').value,
        'email':document.getElementById('email').value,
        'address':document.getElementById('address').value,
        'jobName':document.getElementById('jb_av').value,
        'source':document.getElementById('source').value,
        'currentDesignation':document.getElementById('cd').value,
        'cCTC':document.getElementById('cCTC').value,
        'eCTC':document.getElementById('eCTC').value,
        'noticePeriod':document.getElementById('np').value,
        'skills':document.getElementById('skills').value,
        'resumeUrl':document.getElementById('cv').value,
        'companyId':getToken.substring(getToken.indexOf('=') + 1)
      }
    emp_data.push(details);
    const options ={
      method:"POST",
headers: {
'Content-Type': 'application/json'

},
      body: JSON.stringify(details)
    };
    fetch('https:/'+ domain +'/visiter', options)
    .then(function(response) {
      return response.json();
    }).then(function(text){

      let errString = ("Please enter following fields: \n");
      if(typeof(text.msg) === 'undefined' )
       {
        for(let err of text.errors){
        errString += err.msg +", ";
      }
         alert(errString);
       }
       else{
         alert("verification mail is sent to Your Email");
       }
    })
};
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', add_emp);
});
