document.addEventListener("DOMContentLoaded", function(){
    if(!localStorage.datos2){
        localStorage.datos2;
    }
    else{
      const personalData = JSON.parse(localStorage.getItem("datos2")) ;
      name1.value = personalData.name1;
      name2.value = personalData.name2;
      lastName.value = personalData.lastName;
      lastName2.value = personalData.lastName2;
      cel.value =  personalData.cel;  
    }
})
const email = document.getElementById("email");
const name1 = document.getElementById("name");
const name2 = document.getElementById("name2");
const lastName = document.getElementById("lastName");
const lastName2 = document.getElementById("lastName2");
const cel = document.getElementById("cel");
const btn = document.getElementById("btn");
const data = JSON.parse(localStorage.getItem("datos")); 

email.value = data.email;
btn.addEventListener("click", function(){
      const datos2 = {
        name1: name1.value,
        name2: name2.value,
        lastName: lastName.value,
        lastName2: lastName2.value,
        cel: cel.value,
    }
    localStorage.datos2 = JSON.stringify(datos2);
})