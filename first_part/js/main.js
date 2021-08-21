const loginName = document.loginForm.loginName;
const loginPassword = document.loginForm.loginPassword;

const registerEmail = document.registerForm.registerEmail;
const registerName = document.registerForm.registerName;
const registerPassword = document.registerForm.registerPassword;

const rememberPassword = document.getElementById('tooltip-remember');

const errorStatus = {
    maxLength: "Maximum number of characters",
    minLength: "Need more characters",
    empty: "Field is empty",
    email: "Enter a valid email address"
};

var firstLoginSubmit = false;
var firstRegisterSubmit = false;

const inputForms = document.querySelectorAll(".modal-input");
for (let i = 0; i < inputForms.length; i++) {
    inputForms[i].addEventListener('keyup', logKey);
}

rememberPassword.addEventListener('mouseenter', function (e) {
    document.getElementById('rememberPassword').classList.remove('d-none');
    document.getElementById('rememberPassword').classList.add('d-block');
});

rememberPassword.addEventListener('mouseout', function (e) {
    document.getElementById('rememberPassword').classList.remove('d-block');
    document.getElementById('rememberPassword').classList.add('d-none');
});

function logKey(e) {
    console.log(firstLoginSubmit);
    if (e.target.parentNode.parentNode.name == "loginForm") {
        if (firstLoginSubmit) {
            console.log(e.target.dataset.minlength);
            console.log(e.target.dataset.maxlength);
            inputValidation(e.target, Number(e.target.dataset.minlength), Number(e.target.dataset.maxlength));
        }
    } else {
        if (firstRegisterSubmit) {
            if (e.target.name == 'registerEmail') {
                emailValidation(e.target);
            } else {
                inputValidation(e.target, Number(e.target.dataset.minlength), Number(e.target.dataset.maxlength));
            }
        }
    }
}

function loginValidation() {
    let nameValidate = inputValidation(loginName, 4, 12);
    let passwordValidate = inputValidation(loginPassword, 6, 12);
    if (nameValidate && passwordValidate) {
        return true;
    } else {
        firstLoginSubmit = true;
        return false;
    }
}

function registrationValidation() {
    var emailValidate = emailValidation(registerEmail);
    var nameValidate = inputValidation(registerName, 4, 12);
    var passwordValidate = inputValidation(registerPassword, 6, 12);
    if (nameValidate && passwordValidate && emailValidate) {
        addToDatabase();
        return false;
    } else {
        firstRegisterSubmit = true;
        return false;
    }
}

function emailValidation(target) {
    // Для лучшей валидации можно использовать регулярное выражение.
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(target.value)) {
        showValid(target);
        setErrorMessage(target, "");
        return true;
    } else {
        showInvalid(target);
        setErrorMessage(target, errorStatus.email);
        return false;
    }
}

function inputValidation(target, min, max) {
    if (target.value.length <= 0) {
        showInvalid(target);
        setErrorMessage(target, errorStatus.empty);
        return false;
    } else if (target.value.length < min) {
        showInvalid(target);
        setErrorMessage(target, errorStatus.minLength);
        return false;
    } else if (target.value.length > max) {
        showInvalid(target);
        setErrorMessage(target, errorStatus.maxLength);
        return false;
    } else {
        showValid(target);
        setErrorMessage(target, "");
        return true;
    }
}

function showInvalid(target) {
    const validIcon = target.parentNode.querySelector('.valid');
    const invalidIcon = target.parentNode.querySelector('.invalid');

    validIcon.classList.remove('d-block');
    validIcon.classList.add('d-none');

    target.classList.remove('input-valid');
    target.classList.add('input-invalid');

    invalidIcon.classList.remove('d-none');
    invalidIcon.classList.add('d-block');
}

function showValid(target) {
    const validIcon = target.parentNode.querySelector('.valid');
    const invalidIcon = target.parentNode.querySelector('.invalid');

    target.classList.remove('input-invalid');
    target.classList.add('input-valid');

    invalidIcon.classList.remove('d-block');
    invalidIcon.classList.add('d-none');

    validIcon.classList.remove('d-none');
    validIcon.classList.add('d-block');
}

function setErrorMessage(target, message) {
    const elem = target.parentNode.querySelector('.modal-register-error');
    elem.textContent = message;
    elem.classList.add('d-block');
}

function addToDatabase() {
    const registerForm = document.registerForm;

    const formData = {
        name: document.querySelector('input[name="registerName"]').value,
        password: document.querySelector('input[name="registerPassword"]').value,
        email: document.querySelector('input[name="registerEmail"]').value
    };

    const request = new XMLHttpRequest();

    request.addEventListener('load', function () {
        // В этой части кода можно обрабатывать ответ от сервера
        console.log(request.response);
        alert('Thank you for registration!');
    });

    request.open('POST', '../demo/send.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('name=' + encodeURIComponent(formData.name) + '&password=' + encodeURIComponent(formData.password) + '&email=' + encodeURIComponent(formData.email));
}