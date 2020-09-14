//redirect to invite page
let invite_page = (window.location.protocol + "//" + window.location.host + "/interview-management/invite_page.html");
 document.getElementById('invite_link').innerHTML = invite_page;
 function redirect() {
   window.location.href= invite_page;
 }
 //redirect to login page if the user is loged out
  if(localStorage.getItem('token') == null) {
    var emp_log = (window.location.protocol + "//" + window.location.host + "/interview-management/employer_login.html");
     window.location.replace(emp_log);
  }
//----------------------export table to excel------------------------------------
  function exportTableToExcel(tableexp, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  var tableSelect = document.getElementById(tableexp);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  filename = filename?filename+'.xls':'excel_data.xls';
  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }
  else{
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      downloadLink.download = filename;
      downloadLink.click();
  }
}
//------------------------api to get Company details-----------------------------------------------------
const info ={
  method:"GET",
  headers: {
    authorization: "bearer " + localStorage.getItem("token")
  }
};
  fetch("https://hr502.herokuapp.com/company/get/information",info)
    .then(function(response) {
      return response.json();
    }).then(function(text){
      const C_info = document.getElementById("company_info");
      let cHtml = "";
      var c_Data = text.Details[0];
            cHtml +=
            "</section id='top_header' class='layout'>"+
                "<div class='name'><b>"+ c_Data.name +"</b></div>"
            +"<div class='txt'>"+ c_Data.hrFirstName + " "+c_Data.hrLastName +"</div>" +
            "<a class=' fa fa-map-marker b'><b style='padding:0px 5px'>"+ c_Data.address  +"</b></a>"+
            "<div class='contact'>"+
              `<a class='fa fa-phone a' href='tel:${c_Data.mobileNo}'><b>  ` +c_Data.mobileNo +"</b></a>"+
               `<a class='fa fa-envelope a'  href='mailto:${c_Data.email}'>  ` + c_Data.email +"</a>" +
            "</div>"+
          "</section>"
      C_info.innerHTML = cHtml;
})
//--------------------------------api to assign interviewer--------------------------------
  let itvr_data = [];

  const add_itvr = (ev) => {
    ev.preventDefault();
    let ids = {
      email: document.getElementById("int_email").value,
      profile: document.getElementById("jb_av").value
    };
    emp_data.push(ids);
    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(ids),
    };
    fetch("https://hr502.herokuapp.com/company/add/interviewer", opt)
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        if(text.msg === "Email is sent"){
          alert("Mail is sent to interviewer");
        }
        else{
          alert("Fill all the inputs");
        }
      });
  };
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("Interviewer_btn").addEventListener("click", add_itvr);
  });
//------------------------------------------api to create job-------------------------
  let emp_data = [];
  const add_emp = (ev) => {
    ev.preventDefault(); //to stop the form submitting
    let details = {
      jobName: document.getElementById("vac_for").value,
      vacancy: document.getElementById("no_v").value,
      skills: document.getElementById("skills_req").value,
      datefrom: document.getElementById("d_from").value,
      dateto: document.getElementById("d_to").value,
      timefrom: document.getElementById("t_from").value,
      timeto: document.getElementById("t_to").value,
    };
    emp_data.push(details);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(details),
    };
    fetch("https://hr502.herokuapp.com/addJobs", options)
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
         let errString = ("Please enter following fields: \n");
        if(typeof(text.msg) === 'undefined' )//check for errors
         {
          for(let err of text.errors){//to print errors in alert box
          errString += err.msg +", ";
        }
           alert(errString);
         }
         else{
           alert(text.msg);

         }
        getJob();
      });
  };
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener("click", add_emp);
  });
  //-----------------------logout function-----------------------------------------
  function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('companyId');
    var emp_log = (window.location.protocol + "//" + window.location.host + "/interview-management/employer_login.html");
    window.location.replace(emp_log);
  }
//---------------------------------get job list for dropdown used in create interview section------------------------------
window.onload = getJob();
function getJob() {
  const ddown = {
    method: "GET",
  };
  fetch(
    "https://hr502.herokuapp.com/comapanyjobs" +
      localStorage.getItem("companyId"),
    ddown
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (text) {
      let arr = [];
      for (let i = 0; i < text.length; i++) {
        arr.push(text[i].jobName);
      }
      document.getElementById("jb_av").options.length=1;
      for (const val of arr) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        document.getElementById("jb_av").appendChild(option);
      }
    });
}
//---------------------------function to show applicants data according to the interview-------------------------------------
var jobname_id;
function fun(id) {
const disBtn1 = document.querySelector(".detail_app");
const dis1 = document.querySelector(".applicant_data");
const closeBtn = document.querySelectorAll(".close-btn");
jobname_id = id.getAttribute("data");
renderData();
dis1.classList.add("open_applicant_data");
closeBtn[0].addEventListener("click", function () {
dis1.classList.remove("open_applicant_data");
});}
//----------------------------api to get interview details--------------------------------------------
const job_tb = {
  method: "GET",
};
fetch("https://hr502.herokuapp.com/comapanyjobs" + localStorage.getItem("companyId"),  job_tb)
  .then(function (response) {
    return response.json();
  })
  .then(function (text) {
    window.onload = () => {
      loadTable(text);
    };
    loadTable();
    function loadTable() {
      const job_tbl = document.getElementById("job_table");
      let tabdata = "";
      for (let person of text) {
            tabdata +=
            "<tr><td>" + person.jobName+  "</td><td>" +person.datefrom +" To " +person.dateto +"</td><td>" +person.timefrom +" To " +
            person.timeto+ `</td><td><button class='detail_app' data=${person._id} onclick='fun(this)'>Details</button></td><tr>`;
        }
      job_tbl.innerHTML = tabdata;
    }
  });
//-------------------------api to get applicants data according to the filters---------------------------
  var activities = document.getElementById("Fil_source");//filter by source
  var activitie = document.getElementById("Fil_status");//filter by status
  activities.addEventListener("change", function () {
    renderData();
  });
  activitie.addEventListener("change", function () {
    renderData();
  });
   window.onload = () => {
          renderData();
           interviewer_table(); //to load interviewer details table(in interviewer<manage)-------------
        };
  function renderData() {//api starts here.........
    const tbl = {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    fetch("https://hr502.herokuapp.com/visiter", tbl)
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
            if(person.jobName_id=== jobname_id){
            if (person.source === document.getElementById("Fil_source").value && person.status === document.getElementById("Fil_status").value) {
              //when source filter and status filter is active
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
                "</td><td>" +
                person.mobileNo +  "</td><td>" +person.currentDesignation +"</td><td>" + person.feedback +
                "</td><td>" +
                person.address +
                "</td><td>" +
                person.cCTC +
                "</td><td>" +
                person.eCTC +
                "</td><td>" +
                person.noticePeriod +
                "</td><td>" +
                person.skills +
                "</td><td>" +
                `<a href='${person._id}'>Open_CV</a>` +
                "</td></tr>";
            }  else if (
              person.source === document.getElementById("Fil_source").value && document.getElementById("Fil_status").value === ""
            ) {
          //when source filter is active and status is not
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
              "</td><td>" +
              person.mobileNo +  "</td><td>" +person.currentDesignation +"</td><td>" + person.feedback +
              "</td><td>" +
              person.address +
              "</td><td>" +
              person.cCTC +
              "</td><td>" +
              person.eCTC +
              "</td><td>" +
              person.noticePeriod +
              "</td><td>" +
              person.skills +
              "</td><td>" +
            `<a href='${person.resumeUrl}'>Open_CV</a>` +
              "</td></tr>";
            }
            else if (
              document.getElementById("Fil_source").value === "" &&  person.status === document.getElementById("Fil_status").value
            ) {
            //when status filter is active and source is not
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
              "</td><td>" +
              person.mobileNo +  "</td><td>" +person.currentDesignation +"</td><td>" + person.feedback +
              "</td><td>" +
              person.address +
              "</td><td>" +
              person.cCTC +
              "</td><td>" +
              person.eCTC +
              "</td><td>" +
              person.noticePeriod +
              "</td><td>" +
              person.skills +
              "</td><td>" +
              `<a href='${person.resumeUrl}'>Open_CV</a>` +
              "</td></tr>";
            }
            else if (
              document.getElementById("Fil_source").value === "" && document.getElementById("Fil_status").value === ""
            ) { //when both filters are inactive
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
              "</td><td>" +
              person.mobileNo +  "</td><td>" +person.currentDesignation +"</td><td>" + person.feedback +
              "</td><td>" +
              person.address +
              "</td><td>" +
              person.cCTC +
              "</td><td>" +
              person.eCTC +
              "</td><td>" +
              person.noticePeriod +
              "</td><td>" +
              person.skills +
              "</td><td>" +
              `<a href='${person.resumeUrl}'>Open_CV</a>` +
              "</td></tr>";
            }
          }}
          tableBody.innerHTML = dataHtml;
        }
      });
  }
//-------------------------api to get interviewer's details--------------------
function interviewer_table() {

const intv_table = {
  method: "GET",
  headers: {
    authorization: "bearer " + localStorage.getItem("token"),
  },
};
fetch("https://hr502.herokuapp.com/company/get/interviewers", intv_table)
  .then(function (response) {
    return response.json();
  })
  .then(function (text) {
    window.onload = () => {
      loadTableData(text_tbl);
    };
    var text_tbl = text.interviewer;
    loadTableData(text_tbl);
    function loadTableData(text_tbl, selectedSource) {
      const tableBody = document.getElementById("interviewer_data");
      let data_Html = "";
      for (let person of text_tbl) {
            data_Html +=
            "<tr><td>" + person.email + "</td><td>" + person.profile
            +`</td><td><button class='delete' id="dlt_btn" data=${person._id} onclick='dlt(this)'>Delete</button></td><tr>`;
        }
      tableBody.innerHTML = data_Html;
    }
  });}
//----------------------------------------api to delete the assigned interviewer------------------------------------------------------------
var dlt_id;
function dlt(id) {
dlt_id = id.getAttribute("data");
let dlt_data=[];
  let ids = {
    id: dlt_id
  };
  dlt_data.push(ids);
  const opt = {
    method: "POST",
    headers: {
      authorization: "bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(ids),
  };
  fetch("https://hr502.herokuapp.com/company/delete/interviewer", opt)
    .then(function (response) {
      return response.json();
    })
    .then(function (text) {
    if(text.status === 'OK'){
         interviewer_table();
      }
    });
};
