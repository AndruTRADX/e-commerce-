// @ts-nocheck
'use strict';

// @ts-ignore

// api con axios
const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/products',
  headers: {
    'Content-Type': 'application.json;chartser=utf-8'
  },
});

// lazyLoad
const lazyLoader = new IntersectionObserver (entries=> {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const url = entry.target.getAttribute('data-img');
      // @ts-ignore
      entry.target.setAttribute('src',url);
    }
  })
});


/**
 * @param {any[]} products
 * @param {{appendChild(card): unknown; innerHTML: string}} container
 */


function createProduct(productsJson, container, {lazyLoad = false,clean = false}) {
  if (clean) {
    container.innerHTML = '';
  }

  productsJson.forEach(product => {
    // crear los elementos
    const card = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardProductTitle = document.createElement('h3');
    const cardProductDescription = document.createElement('p');
    const cardProductPrice = document.createElement('h3');

    // añadir clases
    card.classList.add('card');

    // añadir atributos
    cardProductTitle.innerText = product.title
    cardProductDescription.innerText = product.description
    cardProductPrice.innerText = '$' + product.price
    
    // lazy load
    cardImage.setAttribute(
      lazyLoad?'data-img': 'src', product.images[0]
    );
  
    cardImage.addEventListener('error',()=>{
      cardImage.setAttribute('src','https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200?k=20&m=924949200&s=170667a&w=0&h=-g01ME1udkojlHCZeoa1UnMkWZZppdIFHEKk6wMvxrs=')
    });

    if (lazyLoad) {
      lazyLoader.observe(cardImage);
    }

    // añadir elementos como hijos
    card.appendChild(cardImage);
    card.appendChild(cardProductTitle);
    card.appendChild(cardProductDescription);
    card.appendChild(cardProductPrice);
    container.appendChild(card);

    // añadir función de acceso al elemento
    card.addEventListener('click', ()=> getProductById(product.id));
  });
}

// observar los productos
let observadorIS = new IntersectionObserver((entries)=> {
  entries.forEach( entry => {
    if(entry.isIntersecting) {
      page = page + 10 
      getProductsPreview()
    }
  })
},{
  rootMargin: '0px 0px 10px 0px',
  threshold: 1.0,
})

// obtener los productos
async function getProductsPreview(){
  if (page < 200) {
    const {data} = await api(`?offset=${page}&limit=10`);
    const productsJson = data

    createProduct(productsJson,trendlyProductsContainer,{lazyLoad:true});

    const productsOnDisplay = document.querySelectorAll('.card');
    lastProduct = productsOnDisplay[productsOnDisplay.length - 1];

    if(lastProduct) {
      observadorIS.unobserve(lastProduct);
    }
  
    observadorIS.observe(lastProduct);
  }
}

// obtener producto en especifico
async function getProductById(id) {
  const {data: product} = await api('/' + id);
  location.hash = `#product=${id}`

  productTitle.textContent = product.title;
  productPrice.textContent = '$' + product.price;
  productDescripttion.textContent = product.description;
  body.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 15%, rgba(0, 0, 0, 0) 29.17%), url(${product.images[0]}) top no-repeat`;

}
