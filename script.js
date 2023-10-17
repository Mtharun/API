
//API
const API="https://652ba705d0d1df5273ee93e2.mockapi.io/email";

const personList = document.querySelector("#person-list");
const personForm = document.querySelector("#person-form");

//creating 
personForm.innerHTML +=`
<form class="form-data">
<h1 class="display-3 m-3">Candidates Details</h1>
<div class="input-group m-3">
  <div class="input-group-prepend">
    <span class="input-group-text">First Name</span>
  </div>
  <input type="text" name="name" value="" placeholder="Enter Your Name" aria-label="First name" class="form-control" id="input-Name">
</div>

<div class="input-group m-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Phone Number</span>
  </div>
  <input type="text" name="Phone" value="" placeholder="Enter Your Phone Number" aria-label="First name" class="form-control" id="input-Phone">
</div>

<div class="input-group m-3">
  <div class="input-group-prepend">
    <span class="input-group-text">City</span>
  </div>
  <input type="text" name="City" value="" placeholder="Enter Your City" aria-label="First name" class="form-control" id="input-City">
</div>

<div class="input-group m-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Email</span>
  </div>
  <input type="text" name="Email" value="" placeholder="Enter Your Email ID" aria-label="First name" class="form-control" id="input-Email">
</div>

<button type="submit" id="add-btn" class="btn btn-success btn-center">Add Candidates</button>

</form>
`;

personForm.addEventListener("click",(e)=>{
const inputName = document.querySelector("#input-Name");
const inputPhone = document.querySelector("#input-Phone");
const inputCity = document.querySelector("#input-City");
const inputEmail = document.querySelector("#input-Email");
    e.preventDefault()
    if(e.target.id == "add-btn"){
      const Pers={
        Name:inputName.value,
        Phone:inputPhone.value,
        City:inputCity.value,
        Email:inputEmail.value

      } ;
      fetch(API,{
        method:"POST",
        body: JSON.stringify(Pers),
        headers:{
          "Content-Type":"application/json",
        },
      })
      .then((res)=>res.json())
      .then((data)=>renderPerson(data))
      .catch((err)=>console.log(err));
    }
});

// Reading all data (GET)
function ReadAllData(){
        fetch(API,{
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>renderAllPerson(data))
        .catch((err)=>console.log("error",err))
}

ReadAllData();


//DELETE FROM APIs
function deleData(id,parent){
    fetch(`${API}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then(()=>parent.remove())
    .catch((err)=>console.log(err));
}

function renderPerson(per){
    const personDiv = document.createElement("div");
    personDiv.className="card";
    personDiv.innerHTML += `
    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">
  <h2>${per.Name}</h2></div>
  <div class="card-body">
    <h5 class="card-title">Candidate  ${per.id}</h5>
    <p class="card-text text-justify">${per.Phone}</p>
    <p class="card-text text-justify">${per.City}</p>
    <p class="card-text text-justify">${per.Email}</p>
  </div>
  <button type="submit" data-id=${per.id} id="del-btn" class="btn btn-success">DELETE</button>
</div>
<br>
    `;
    personList.append(personDiv);
}

const sampleObject = {
    name:"TharunR",
    number:"100",
    address:"172 street advaidhsahram vennampattai salem-4",
    email:"tharun@gmail.com"
}

//renderPerson(sampleObject);

function renderAllPerson(Person){
        Person.forEach((Person)=>{
            renderPerson(Person);
        })
}


personList.addEventListener("click",(event)=>{
  const id = event.target.dataset.id;
  const parent = event.target.parentNode;
    if(event.target.id === "del-btn"){
       deleData(id,parent);
    }
})