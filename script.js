const domInputs = document.querySelectorAll("input");
const submit = document.querySelector("button");
const username = "username";
const email = "email";
const password = "password";
const c_passowrd = "confirm password";

function getName(input){
    return input.name.trim();
}
function showError(input, message){
    let formParent = input.parentElement;
    formParent.className = "form-control error";
    const small = formParent.querySelector("small");
    small.innerHTML = message;
}   
function showSuccess(input){
    defaultSetup();
    let formParent = input.parentElement;
    formParent.classList.remove = "error";
    let small = formParent.querySelector("small");
    small.innerHTML = "";
}
function checkInputLength(min, max, input){
    if(input.value.length >= min && input.value.length <= max){
        showSuccess(input);
    }else{
        showError(input, `invalid number of input/s for ${getName(input)}`);
    }
}

function checkEmailIfValid(email){
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(email.value)){
        showSuccess(email)
    }else{
        showError(email, `email does not meet the format`);
    }
}
function checkPassworMatch(password, c_password){
    if(password.value === c_password.value){
        showSuccess(password);
        showSuccess(c_password);
    }else{
        showError(password, "");
        showError(c_password, `Password does not match`);
    }
}

function checkInputs(inputs){
    let isRequired = false;
    let l_password;
    let l_c_password;
    inputs.forEach(input => {
        if(input.value === ""){
            showError(input, `${getName(input)} is required`);
            isRequired = true;
        }else if(input.value !== ""){
            ({ l_password, l_c_passowrd } = inputFilter(input, l_password, l_c_password));
            isRequired = false;
        }
        else{
            showSuccess(input);
        }
        console.log(input.parentElement);
    });
    return isRequired;
}
function inputFilter(input, l_password, l_c_password) {
    if (getName(input) === username) {
        checkInputLength(3, 20, input);
    }
    if (getName(input) === email) {
        checkEmailIfValid(input);
    }
    if (getName(input) === password) {
        l_password = input;
    }
    if (getName(input) === c_passowrd) {
        l_c_passowrd = input;
        checkPassworMatch(l_password, l_c_password);
    }
    return { l_password, l_c_password };
}

function defaultSetup(){
    domInputs.forEach(input => {
        let formParent = input.parentElement;
        if(formParent.classList.contains("error")){
            formParent.classList.remove("error");
            let small = formParent.querySelector("small");
            small.innerHTML = "";
        }
    });
}

submit.addEventListener("click", (e) =>{
    e.preventDefault();
    checkInputs(domInputs);
       
})
