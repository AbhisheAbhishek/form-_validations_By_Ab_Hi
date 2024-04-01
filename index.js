const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const dob  = document.getElementById("date");
const gender = document.getElementById("gender");
const phone = document.getElementById("phone");
const otp = document.getElementById("otp");
const hh2 = document.getElementById("hh2");
const send = document.getElementById("send");
// store the data
let flag =false;
const formValues  =[];

const formFields = {
    username:null,
    email:null,
    password:null,
    password2:null,
    dob:null,
    gender:null,
    phone:null,
    otp:null,
}


send.addEventListener("click",function generate(){
    let rando = Math.floor(1000 +Math.random()*9000);
    window.localStorage.setItem(0,rando);
    hh2.innerHTML = rando;
   
})




function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    
    let small = formControl.querySelector("small");
    if (!small) {
        small = document.createElement("small");
        formControl.appendChild(small);
    }
    small.innerText = message;
}


function showSuccess(input){
    const  formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(input){
    const re =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(re.test(input.value)){
        showSuccess(input);
        formFields.email = true;
    }
    else{
        showError(input,"email is not valid");
        formFields.email = false;
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value === ""){
            showError(input,`${getFieldName(input)} is  required`);
            formFields.username = false;
        }
        else{
            showSuccess(input);
            formFields.username = true;
        }
    });
}

function checkPasswordsMatch(password,password2){
    if(password.value !== password2.value){
        showError(password2,"Password do not match")
        formFields.password2 = false;
    }
    formFields.password2 = true; 
}

function checkPhone(phone){
if(phone.value.length >= 10){
    formFields.phone =true;
}
 else {
    showError(phone,"enter valid phone number")
    formFields.phone =false;

}
}

function checkLength(input,min,max){
    if(input.value.length <= min){
        showError(input,`${getFieldName(input)} must be more than ${min} characters`)
        formFields[input] = false;
    }
    else if(input.value.length >= max){
     showError(input,`${getFieldName(input)} must be less than ${max} characters`)
     formFields[input] = false;
    }
    else{
        showSuccess(input);
        formFields[input] = true;
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit",function(e){
    e.preventDefault();
    checkRequired([username,email,password,password2,dob,gender,phone,otp]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkPhone(phone);
    checkEmail(email);
    
    if(password2.value !== ""){
        checkPasswordsMatch(password,password2);
    }

    
    
    const formData = {
        username : username.value,
        email : email.value,
        password: password.value,
        confirmPassword: password2.value,
        dob:dob.value,
        gender:gender.value,
        phone:phone.value,
    };

    let hasError = false;

    
        Object.values(formFields).map((e)=>{
            if(e === false){
                hasError = true;
            }
        })
    

  
    if(hasError) return;

    formValues.push(formData);

    localStorage.setItem("formData", JSON.stringify(formData));

    // Redirect to second page
    window.location.href = "index2.html";
    // clear the input value
    form.reset();

    // add form control class 

    const userName = username.parentElement; 
    const emailClass = email.parentElement; 
    const passwordClass = password.parentElement; 
    const password2Class = password2.parentElement; 

    // userName.className = "form-control";
    // emailClass.className = "form-control";
    // passwordClass.className = "form-control";
    // password2Class.className = "form-control";

    alert("form submitted  succesfully")
    console.log("form inputs:",formValues);
})