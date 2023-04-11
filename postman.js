console.log("this is postman project file no 56");

let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";
let addCount = 0;
function createdivtagsfunc(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// if the user clickes on params box,hide the json box
let paramsRadio = document.getElementById("parmsRadio");
// console.log(paramsRadio);

paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// if  user click on + button add more paremeters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = ` <div id="parametersBox">
    <div class="row">
       <label for="url" class="col-sm-2 col-form-label">Parameter${
         addCount + 2
       }</label>

       <div class="col">
         <input type="text" class="form-control" id="parameterkey${
           addCount + 2
         }" placeholder="enter Parameter ${addCount + 2} key">
       </div>
       <div class="col">
         <input type="text" class="form-control" id="parametervalue${
           addCount + 2
         }" placeholder="enter Parameter ${addCount + 2} value" >
       </div>
         <div class="col">
         <button id="addParam" class="btn btn-primary deleteelement ">-</button>
         </div>
     </div>
   </div>`;
  let paramElement = createdivtagsfunc(string);
  params.appendChild(paramElement);
  let deleteitem = document.getElementsByClassName("deleteelement");
  for (let item of deleteitem) {
    // console.log(item);
    item.addEventListener("click", (e) => {
      // TODO: add a confirmation box to confirm parameter deletion
      e.target.parentElement.parentElement.remove();
    });
  }
  addCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responsePrism").innerHTML = "please wait.... fetching response....";


  //  fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name=requestType]:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name=ContentType]:checked"
  ).value;

  if (contentType == "params") {
    
    let data = {};
    for (let i = 0; i < addCount + 1; i++) {
      let key = document.getElementById("parameterkey" + (i + 1)).value;
      let value = document.getElementById("parametervalue" + (i + 1)).value;

      data[key] = value;
    }
    JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  console.log(url);
    console.log(requestType);
    console.log(contentType);
  // if the request type is get , invoke fetch api to create a post request 
  if(requestType=="GET")
  {
    fetch(url,{
      method:"GET"
    }).then(Response=>Response.text()).then((text)=>{
      document.getElementById("responsePrism").innerHTML = text
      Prism.highlightAll();
    });
  }
  else{
    fetch(url,{
      method: "post",
      body: data,
      Headers:{
        'content-type':"application/json"
    }
    }).then(Response=>Response.text()).then((text)=>{
      // document.getElementById("responseJsonText").innerHTML = text
      document.getElementById("responsePrism").innerHTML = text
      Prism.highlightAll();

    })
  }
});
