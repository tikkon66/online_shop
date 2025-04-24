let fon = document.getElementById("fon");

let loginButton = document.getElementById("login-button");
let cartButton = document.getElementById("cart-button");
let mobilLoginButton = document.getElementById("mobil-login-button");
let mobilCartButton = document.getElementById("mobil-cart-button");

let isUser = localStorage.getItem("is-user") || false;


function updateBoxStyle() {
    if (window.innerWidth < 1200) {
        if (!isUser) {
            mobilLoginButton.style.display = "flex"
        }
        else if (isUser) {
            mobilCartButton.style.display = "flex"
            mobilLoginButton.style.display = "none"
        }
    }
    else {
        if (!isUser) {
            loginButton.style.display = "flex"
        }
        else if (isUser) {
            cartButton.style.display = "flex"
            loginButton.style.display = "none"
        }
    }
}

window.addEventListener('resize', updateBoxStyle);
updateBoxStyle();



// функция для раскрытие и закрытие меню

function animate({ duration, timing, draw, presence }) {
    let start = performance.now();

    requestAnimationFrame(function animateFrame(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animateFrame);
        }
    });
}
const menu = document.getElementById('menu-block');



// раскрытие меню

document.getElementById('menuOpen').addEventListener('click', () => {

    animate({
        duration: 300,
        timing: t => t,
        draw: progress => {
            menu.style.marginLeft = (-100 + 100 * progress) + '%';
        },
    });


});



// закрытие меню

document.getElementById('menuClose').addEventListener('click', () => {

    animate({
        duration: 300,
        timing: t => t,
        draw: progress => {
            menu.style.marginLeft = (0 - 100 * progress) + '%';
        },
    });
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('header__list-item-link')) {
        animate({
            duration: 300,
            timing: t => t,
            draw: progress => {
                menu.style.marginLeft = (0 - 100 * progress) + '%';
            },
        });
    }
});



// уменьшение времени скидки

let DiscountItemDay = document.getElementById("cabinets-day");
let DiscountItemHour = document.getElementById("cabinets-hour");
let DiscountItemMin = document.getElementById("cabinets-min");
let DiscountItemSec = document.getElementById("cabinets-sec");

let discountLeftDay = +sessionStorage.getItem("discountDay");
let discountLeftHour = +sessionStorage.getItem("discountHour");
let discountLeftMin = +sessionStorage.getItem("discountMin");
let discountLeftSec = +sessionStorage.getItem("discountSec");

DiscountItemDay.textContent = discountLeftDay;
DiscountItemHour.textContent = discountLeftHour;
DiscountItemMin.textContent = discountLeftMin;
DiscountItemSec.textContent = discountLeftSec;

const discountTimer = setInterval(() => {
    discountLeftSec--;
    DiscountItemSec.textContent = discountLeftSec;


    if ((discountLeftDay + discountLeftHour + discountLeftMin + discountLeftSec) <= 0) {
        clearInterval(discountTimer);
    }

    if (discountLeftSec <= 0) {
        discountLeftSec = 59;
        discountLeftMin--;
        DiscountItemSec.textContent = discountLeftSec;

        if (discountLeftMin < 0 && discountLeftDay + discountLeftHour > 0) {
            discountLeftMin = 59;
            discountLeftHour--;

            if (discountLeftHour < 0 && discountLeftDay > 0) {
                discountLeftHour = 59;
                discountLeftDay--;

                DiscountItemDay.textContent = discountLeftDay;
            }
            DiscountItemHour.textContent = discountLeftHour;
        }
        DiscountItemMin.textContent = discountLeftMin;
    }

}, 1000);



// функционал окошки

function openWindow(window) {
    window.style.display = "flex";

    fon.style.filter = "brightness(0.8)";
    fon.style.pointerEvents = "none";
}

function hideWindow(window) {
    window.style.display = "none";

    fon.style.filter = "brightness(1)";
    fon.style.pointerEvents = "auto";
}


let windowLogin = document.getElementById("window-login");
let windowReg = document.getElementById("window-register");

let exitLogin = document.getElementById("exit-login");
let exitReg = document.getElementById("exit-register");

let textReg = document.getElementById("textReg");
let textLog = document.getElementById("textLog");


document.addEventListener("click", function (event) {
    if (event.target.classList.contains('login-button')) {
        openWindow(windowLogin);
    }
});

exitLogin.addEventListener("click", () => {
    hideWindow(windowLogin);
});
exitReg.addEventListener("click", () => {
    hideWindow(windowReg);
});

textReg.addEventListener("click", () => {
    hideWindow(windowLogin);
    openWindow(windowReg);
});
textLog.addEventListener("click", () => {
    hideWindow(windowReg);
    openWindow(windowLogin);
});



// вхождения аккаунта или регистрация

let userArray = JSON.parse(localStorage.getItem('userArray')) || [];

let login = document.getElementById("login");
let register = document.getElementById("register");

function checkUser(name, password) {
    let i = 0;
    let ok = true;

    while (i < userArray.length && ok) {
        if (name == userArray[i]["name"] && password == userArray[i]["password"]) {
            localStorage.setItem("user", userArray.length)
            ok = false;
        }
        i++;
    }

    return ok;
}

let loginName = document.getElementById("login-name");
let loginPassword = document.getElementById("login-password")

let regName = document.getElementById("register-name");
let regPassword = document.getElementById("register-password");

login.addEventListener("click", () => {
    if (checkUser(loginName.value, loginPassword.value)) {
        alert("Не правильный пароль или имя!");
        loginName.value = "";
        loginPassword.value = "";
    }
    else {
        alert("Успешно вошли!")

        hideWindow(windowLogin);

        updateBoxStyle();

        isUser = true;
        localStorage.setItem("is-user", true);
    }
});

register.addEventListener("click", () => {
    if (checkUser(regName.value, regPassword.value)) {
        alert("Успешно создано!")
        userArray.push({
            "name": regName.value,
            "password": regPassword.value
        })

        localStorage.setItem("user", userArray.length)
    }
    else {
        alert("Такой аккаунт уже есть!");
    }

    updateBoxStyle();

    hideWindow(windowReg);

    isUser = true;

    localStorage.setItem("is-user", true);
    localStorage.setItem("userArray", JSON.stringify(userArray))
});