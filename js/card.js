let main = document.getElementById("main")
let params = new URLSearchParams(window.location.search)

let count = params.get("id") - 1;

let products = JSON.parse(localStorage.getItem('products'));
let title = products[count].title;
let price = products[count].price;
let imgSrc = products[count].imgSrc;
let disc = products[count].disc;

card = document.createElement("div");

card.innerHTML = `
                <section class="card">
                    <div class="card__slider">
                        <h1 class="card__info-title1">${title}</h1>
                        <img class="card__slider-img1" src="../${imgSrc}" alt="Шкаф">
                        <div class="card__slider-item">
                        <p class="product__info-price text-size_28">${price} KZT</p>
                        </div>
                    </div>
                    <div class="card__info">
                        <h1 class="card__info-title">${title}</h1>
                        <p class="text-size_25">${disc}</p>
                        <div class="card__info-elem"></div>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px; justify-content: space-evenly;">
                       <button class="button text-size_30" onclick="Buy()" > Заказать</button>
                       <button class="button text-size_30" onclick="addCart(${count})">В корзину</button>
                            
                        </div>
                    </div>
                </section>

`

main.appendChild(card);


function Buy() {
    alert("Заказ оформлен!")
}