//----if the user is logged out it will redirect to login page---------------
if(localStorage.getItem('intv_token') == null) {
  var intv_log = (window.location.protocol + "//" + window.location.host + "/interview-management/interviewer_login.html");
   window.location.replace(intv_log);
}
//----------------------------function to show feedback form ----------------------------------
var cndt_id;
function fun(id) {
const disBtn1 = document.querySelector(".dis-btn");
const dis1 = document.querySelector(".dis");
const closeBtn = document.querySelectorAll(".close-btn");//to close the feedback form
cndt_id = id.getAttribute("data");
dis1.classList.add("open-dis");
closeBtn[0].addEventListener("click", function () {
dis1.classList.remove("open-dis");
});}
//--------------------------------api to get applicants profile------------------------------------
const options ={
method:"GET",
headers: {
authorization: "bearer " + localStorage.getItem("intv_token")
}
};
fetch('https://hr502.herokuapp.com/interviewer/getMyProfiles',options)
.then(function(response) {
return response.json();
}).then(function(text){
for (const val of text.profile) {
var option = document.createElement("option");
option.value = val;
option.text = val;
document.getElementById("jb_av").appendChild(option);
}
})
//-----------function for logout button---------------------------------------------
function logout() {
var intv_log = (window.location.protocol + "//" + window.location.host + "/interview-management/interviewer_login.html");
window.location.replace(intv_log);
window.localStorage.removeItem('intv_token');
window.localStorage.removeItem('interviewerId');
}
//---------------------------------------------
var activities = document.getElementById("jb_av");//filter by profile
activities.addEventListener("change", function () {
renderData();
});
window.onload = () => {
renderData();
};
//----------------------------api to get candidate details as per their profile-------------------------
function renderData() {
let emp_data = [];
let details = {
profile:document.getElementById('jb_av').value
};
emp_data.push(details);

const tbl = {
method: "POST",
headers: {
"Content-Type": "application/json",
authorization: "bearer " + localStorage.getItem("intv_token"),
},  body: JSON.stringify(details),
};
fetch("https://hr502.herokuapp.com/intervier/get/applications", tbl)
.then(function (response) {
return response.json();
})
.then(function (text) {
window.onload = () => {
loadTableData(text);
};
loadTableData(text);
function loadTableData(text, selectedSource) {
const tableBody = document.getElementById("tableData");
let dataHtml = "";
for (let person of text) {
      dataHtml +=
      "<tr><td>" +
      person.fname +
      " " +
      person.lname +
      "</td><td>" +
      person.jobName +
      "</td><td>" +
      person.source +
      "</td><td>" +
      person.status +
      "</td><td>" +
      person.email +
      "</td><td>" +  person.mobileNo +  "</td><td>" + person.currentDesignation +  "</td><td>" + person.address + "</td><td>" + person.cCTC +"</td><td>" +
      person.eCTC +  "</td><td>" +  person.noticePeriod +"</td><td>" + person.skills +  "</td><td>" +`<a href='${person.resumeUrl}'>Open_CV</a>` +`</td><td><button class='dis-btn' data=${person._id} onclick='fun(this)'>feedback</button></td><tr>`;
  }
console.log(dataHtml);

tableBody.innerHTML = dataHtml;
}
});}
//---------------------------api to post feedback of the candidate-------------------------------
let feed_data = [];
const add_feed = (ev) => {
ev.preventDefault(); //to stop the form submitting
let ids = {
status: document.getElementById("status").value,
feedback: document.getElementById("remark").value,
applicatantId: cndt_id
};
feed_data.push(ids);
const opt = {
method: "POST",
headers: {
  "Content-Type": "application/json",
  authorization: "bearer " + localStorage.getItem("intv_token"),
},
body: JSON.stringify(ids),
};
fetch("https://hr502.herokuapp.com/interviewer/post/review", opt)
.then(function (response) {
  return response.json();
})
.then(function (text) {
  renderData();
});
};
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("feed_btn").addEventListener("click", add_feed);
});
