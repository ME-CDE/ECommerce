const images = document.querySelectorAll('.images');
const imagesMain = document.querySelectorAll('.imagesMain');
const previous = document.querySelector('.previous');
const nexts = document.querySelector('.next');
const orderContent = document.querySelectorAll('.orderContent');
const containerDiv = document.querySelectorAll('.containerDiv');
const closes = document.querySelector('.close');
const imageOrder = document.querySelectorAll('.imgOrder');
const lightBox = document.querySelector('#lightBox');
const productImage = document.querySelector('.productImage');
const bigPicture = document.querySelector('#bigPicture');
const bigPictureMain = document.querySelector('#bigPictureMain');
const number = document.getElementById('number');
const addCart = document.getElementById('addCart');
const addNumber = document.getElementById('add');
const minusNumber = document.getElementById('minus');
const pOrder = document.querySelectorAll('.pOrder'); 
const orderCount = document.querySelectorAll('.orderCount');
const cart = document.querySelectorAll('#cart');
const deletes = document.querySelectorAll('.delete');

const imageUrl = [
    './images/image-product-1.jpg', './images/image-product-2.jpg', './images/image-product-3.jpg', './images/image-product-4.jpg'
]
function remove() {
    images.forEach((image)=>{
        image.className = 'images';
        image.style.background = '';
    });
}
function remove2() {
    imagesMain.forEach((image)=>{
        image.className = 'imagesMain';
        image.style.background = '';
    });
}

images.forEach((image,index) => {
    images[0].className = 'images imagesClicked';
    images[0].style.background = 'none';
    image.addEventListener('click' ,()=>{
        remove();
        image.style.background = 'none';
        image.className = 'images imagesClicked';
        bigPicture.src = imageUrl[index];
        counter = index;
    })
});
imagesMain.forEach((image,index) => {
    imagesMain[0].className = 'imagesMain imagesClickedMain';
    imagesMain[0].style.background = 'none';
    image.addEventListener('click' ,()=>{
        remove2();
        image.style.background = 'none';
        image.className = 'imagesMain imagesClickedMain';
        bigPictureMain.src = imageUrl[index];
    })
});

let counter = 0;
let counter1 = 0;

function prev() {
    counter--;
    if (counter === -1) {
        counter = imageUrl.length-1;
    }
    productImage.style.backgroundImage = `url(${imageUrl[counter]})`;
}
function next() {
    counter++;
    if (counter === imageUrl.length) {
        counter = 0;
    }
    productImage.style.backgroundImage = `url(${imageUrl[counter]})`;
}
function decrease() {
    if (counter1 > 0) {
        counter1--;
        number.textContent = counter1;
    }
}
function increase() {
    counter1++;
    number.textContent = counter1;
}

closes.addEventListener('click', ()=>{
    lightBox.style.display = 'none';
});

bigPicture.addEventListener('click', ()=>{
    if (window.screen.width > 768) {
        lightBox.style.display = 'flex';
    }
});

orderNumber();

function createOrder() {
    if (localStorage.getItem('cart') != null) {
        orderContent[0].style.display = 'flex';
        orderContent[1].style.display = 'flex';
        const data = JSON.parse(localStorage.getItem('cart'));
        pOrder.forEach((order, index) =>{
            order.innerHTML = screen.width > 400 ? `Fall Limited Edition Sneakers <br> $125 x <span class="count"><span class="count">${data[0]}</span>  <span class="amount">$${data[0]*125}</span>` : `Fall Limited Edition...<br> $125 x <span class="count">${data[0]}</span>  <span class="amount">$${data[0]*125}</span>`;
            imageOrder[index].style.backgroundImage = `url(${data[1]})`;
        })
    };
};
function orderNumber() {
    if (localStorage.getItem('cart')) {
        const data = JSON.parse(localStorage.getItem('cart'));
        orderCount.forEach(order =>{
            order.style.display = 'inline-block';
            order.textContent = data[0];
        });
    }
}
function addCartItem() {
    if (counter1 > 0) {
        const data1 = [counter1, imageUrl[counter]];
        localStorage.setItem('cart', JSON.stringify(data1));
        number.textContent = 0;
        orderNumber();
        counter1 = 0;
    }
};


addCart.addEventListener('click', addCartItem);

cart.forEach((car, index) =>{
    car.addEventListener('click', ()=>{
        containerDiv[index].classList.toggle('containerDivClick');
        orderContent[index].style.display = 'none';
        createOrder();
    });
});

deletes.forEach((del, index) =>{
    del.addEventListener('click', ()=>{
        localStorage.clear();
        orderContent[1].style.display = 'none';
        orderCount[index].style.display = 'none';
    })
})
minusNumber.addEventListener('click', decrease);
addNumber.addEventListener('click', increase);
previous.addEventListener('click', prev);
nexts.addEventListener('click', next);