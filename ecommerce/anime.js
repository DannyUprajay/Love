function test1() {
    document.getElementById("mentext").innerHTML = "Men"
    document.getElementById("mentext").style.color = "black";
    document.getElementById("mentext").style.left = "150px"

}

function test2() {
    document.getElementById("mentext").innerHTML = "Women";
    document.getElementById("mentext").style.color = "white";
    document.getElementById("mentext").style.left = "120px";

}
function test3() {
    document.getElementById("mentext").innerHTML = "Kids"
    document.getElementById("mentext").style.color = "black";
    document.getElementById("mentext").style.left = "150px";

}
function test4() {
    document.getElementById("mentext").innerHTML = "Accessoires"
    document.getElementById("mentext").style.color = "black";
    document.getElementById("mentext").style.left = "90px";

}

(function () {

    var doc = document.documentElement;
    var w = window;

    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = document.getElementById('site-header');

    var checkScroll = function () {

        /*
        ** Find the direction of scroll
        ** 0 - initial, 1 - up, 2 - down
        */

        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
        }
        else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };

    var toggleHeader = function (direction, curScroll) {
        if (direction === 2 && curScroll > 52) {

            //replace 52 with the height of your header in px

            header.classList.add('hide');
            prevDirection = direction;
        }
        else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };

    window.addEventListener('scroll', checkScroll);

})();

////////////////////////panier//////////////////////////

let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Veste élégante simple en laine',
        tag: 'greytshirt',
        price: 129,
        inCart: 0
    },
    {
        name: 'Cordigan en coton et lamé',
        tag: 'giletbleu',
        price: 49,
        inCart: 0
    },
    {
        name: 'Jean homme ample',
        tag: 'jeangris',
        price: 39,
        inCart: 0
    },
    {
        name: 'T-shirt ample',
        tag: 'chemisenoir',
        price: 29,
        inCart: 0
    },
    {
        name: 'Pantalon droit belge',
        tag: 'pantalonbelge',
        price: 49,
        inCart: 0
    },
    {
        name: 'Veste en denim',
        tag: 'vestverte',
        price: 69,
        inCart: 0
    },
    {
        name: 'Veste effet cuir',
        tag: 'vestblanche',
        price: 79,
        inCart: 0
    },
    {
        name: 'Veste bleu ',
        tag: 'vestbleu',
        price: 69,
        inCart: 0
    },
    {
        name: 'Pochette louis vuitton',
        tag: 'bagbleu',
        price: 329,
        inCart: 0
    },
    {
        name: 'Bague couronne en fleur',
        tag: 'bague',
        price: 29,
        inCart: 0
    },
    {
        name: `Lot de boucles d'oreilles`,
        tag: 'boucle',
        price: 49,
        inCart: 0
    },
    {
        name: 'Petit sac Louis vuitton',
        tag: 'baglouis',
        price: 429,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.oui span').textContent = productNumbers;
    }
}
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.oui span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.oui span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                  <div class="product">
                      <ion-icon id="remove" name="close-circle-outline"></ion-icon>
                      <img id='register' src="image/${item.tag}.jpg">
                      <span>${item.name}</span>
                  </div>
                  <div class="price">${item.price}€</div>
                 <div class="quantity">
                      <ion-icon name="caret-back-circle-outline"></ion-icon><span>${item.inCart}</span><ion-icon name="caret-forward-circle-outline"></ion-icon>
                 </div>
                 <div class="total">
                 ${item.inCart * item.price},00€
                 </div> 
                  `;
        });

        productContainer.innerHTML += `
              <div class="basketTotalContainer">
              <h4 class="basketTotalTitle">
             TOTAL :
             </h4>
              <h4 class="basketTotal">
              ${cartCost},00€
              </h4>   
              `;
    }
}





onLoadCartNumbers();
displayCart();

document.getElementById("remove").onclick = function () {
    document.getElementById("register").remove();
}