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
            <button onclick="addCart(${count})" class="button card-button">В корзину</button>
    `;

    main.appendChild(card);

}

for (let i = 0; i < products.length; i++) {
    createProductCard(products[i], i)
}
