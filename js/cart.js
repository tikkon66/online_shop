let main = document.getElementById("products-block");


let products = JSON.parse(localStorage.getItem('products'));
let productsBlock = document.getElementById("products-block")

function createProductCard({ title, price, imgSrc, link }, count) {
    const card = document.createElement('div');
    card.className = 'product__info-item';

    card.innerHTML = `
            <a href="${link}">
                <img class="product__info-img" src="../${imgSrc}" alt="${title}">
                <div class="justify_sb">
                    <p style="margin-top: 8px;" class="text-size_25 black-text">${title}</p>
                    <div class="flex column">
                        <span style="margin-top: 5px;" class="product__info-price text-size_28">${price} KZT</span>
                    </div>
                </div>
            </a>
            <button onclick="fitt(${count})" class="button card-button">Примерить</button>
            <button onclick="Buy()" class="button card-button">Заказать</button>
    `;

    main.appendChild(card);

}

userArray = JSON.parse(localStorage.getItem('userArray'));
userInArray = localStorage.getItem('user');
isUser = localStorage.getItem('is-user');

if(isUser == "true") {
    if (userArray[userInArray].products !== undefined) {
    let parts = userArray[userInArray]?.products?.trim().split(" ").filter(Boolean) ?? [];

    console.log(parts);
    for (let i = 0; i < parts.length; i++) {
        createProductCard(products[i], i)
    }
}
}


else{alert("У вас нету товаров в корзине!")}




function fitt(count) {

    let classs = document.getElementsByClassName(`${products[count].type}`)
    classs[1].style.display = "none";
    classs[0].style.display = "none";

    document.getElementById(`${products[count].imgSrc2}`).style.display = "flex";


}

function hideFitt() {
    let classs = document.getElementsByClassName("clothe")

    for (let i = 0; i < classs.length; i++) {
        classs[i].style.display = "none";
    }
}

function Buy() {
    alert("Заказ оформлен!")
}