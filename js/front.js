let fon = document.getElementById("fon");

let loginButton = document.getElementById("login-button");
let cartButton = document.getElementById("cart-button");
let mobilLoginButton = document.getElementById("mobil-login-button");
let mobilCartButton = document.getElementById("mobil-cart-button");

let isUser = localStorage.getItem("is-user") || 'false';


function updateBoxStyle() {
    if (window.innerWidth < 1200) {
        if (isUser == 'false') {
            mobilLoginButton.style.display = "flex"
            mobilCartButton.style.display = "none"
        }
        else if (isUser == 'true') {
            mobilCartButton.style.display = "flex"
            mobilLoginButton.style.display = "none"
        }
    }
    else {
        if (isUser == 'false') {
            loginButton.style.display = "flex"
            cartButton.style.display = "none"
        }
        else if (isUser == 'true') {
            cartButton.style.display = "flex"
            loginButton.style.display = "none"
        }
    }
    console.log(window.innerWidth);
}

window.addEventListener('resize', updateBoxStyle);
updateBoxStyle();



// функция для раскрытие и закрытие меню

function animate({ duration, timing, draw }) {
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
            menu.style.marginTop = (-menu.offsetHeight + menu.offsetHeight * progress) + 'px';
        },
    });


});



// закрытие меню

document.getElementById('menuClose').addEventListener('click', () => {

    animate({
        duration: 300,
        timing: t => t,
        draw: progress => {
            menu.style.marginTop = (0 - menu.offsetHeight * progress) + 'px';
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


let windowLogin = document.getElementById("window-login");
let windowReg = document.getElementById("window-register");

let exitLogin = document.getElementById("exit-login");
let exitReg = document.getElementById("exit-register");

let textReg = document.getElementById("textReg");
let textLog = document.getElementById("textLog");

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

let userArray;

let login = document.getElementById("login");
let register = document.getElementById("register");

let userInArray;

function checkUser(name, password) {
    let i = 0;
    let ok = true;

    userArray = JSON.parse(localStorage.getItem('userArray')) || [];
    while (i < userArray.length && ok) {
        if (name == userArray[i]["name"] && password == userArray[i]["password"]) {
            userInArray = i;
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

        isUser = 'true';

        updateBoxStyle();
        localStorage.setItem("user", userInArray)
        localStorage.setItem("is-user", 'true');
    }
});

register.addEventListener("click", () => {
    if (checkUser(regName.value, regPassword.value)) {
        userArray.push({
            "name": regName.value,
            "password": regPassword.value,
            products: ""
        })

        localStorage.setItem("userArray", JSON.stringify(userArray))
        localStorage.setItem("user", userArray.length - 1)
        alert("Успешно создано!")
    }
    else {
        alert("Такой аккаунт уже есть!");
        localStorage.setItem("user", userInArray)
    }

    hideWindow(windowReg);

    isUser = 'true';

    updateBoxStyle();

    localStorage.setItem("is-user", 'true');
});




// выход из аккаунта

function exitAcc() {
    isUser = 'false';

    updateBoxStyle();

    localStorage.setItem("is-user", 'false');
}



// генерация карточек

let products = JSON.parse(localStorage.getItem('products'));
let productsBlock = document.getElementById("products-block")

function createProductCard({ title, price, imgSrc, link }, count) {
    const card = document.createElement('div');
    card.className = 'product__info-item';

    card.innerHTML = `
            <a href="page/${link}">
                <img class="product__info-img" src="${imgSrc}" alt="${title}">
                <div class="justify_sb">
                    <p style="margin-top: 8px;" class="text-size_25 black-text">${title}</p>
                    <div class="flex column">
                        <span style="margin-top: 5px;" class="product__info-price text-size_28">${price} KZT</span>
                    </div>
                </div>
            </a>
            <button onclick="addCart(${count})" class="button card-button">В корзину</button>
    `;
    productsBlock.appendChild(card);

}

for (let i = 0; i < products.length; i++) {
    createProductCard(products[i], i)
}


// добавить в корзину
function addCart(count) {
    if (isUser == "true") {
        let userArray = JSON.parse(localStorage.getItem("userArray"));
        let userInArray = localStorage.getItem("user");
        let inCart = false;
        console.log(userArray[userInArray].products)

        if (userArray[userInArray].products !== "") {
            let parts = userArray[userInArray]?.products?.trim().split(" ").filter(Boolean) ?? [];

            console.log(parts);

            for (let i = 0; i < parts.length && !inCart; i++) {
                if (parts[i] == count) {
                    inCart = true;
                }
            }
        }

        if (!inCart) {

            userArray[userInArray].products += `${count} `;
            localStorage.setItem("userArray", JSON.stringify(userArray));
            alert("Добавлено!");
        } else {
            alert("Товар уже в корзине!");
        }
    } else {
        alert("Вы не вошли в аккаунт!");
        openWindow(windowLogin);
    }
}

// подписаться

let followOk = false


function follow() {
    if (document.getElementById("email-follow").value != "") {
        if (!followOk) {
            alert("Данные получены!")

            followOk = true
        }
        else {
            alert("Данные изменены!")
        }
        localStorage.setItem("email", document.getElementById("email-follow").value)
    }
    else {
        alert("Напишите email!")
    }


}