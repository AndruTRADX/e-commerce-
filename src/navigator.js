let page = 0;
let lastProduct;

// escucha de eventos
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
headerArrow.addEventListener('click',()=> {
  history.back();
})

// función principal
function navigator() {


  if(location.hash.startsWith('#product=')){
    productPage()
  } else {
    trendlyProductsContainer.innerHTML = ''
    homePage()
    getProductsPreview()
  }
  window.scrollTo(0,0);

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // if (infiniteScroll) {
  //   window.addEventListener('scroll', infiniteScroll, {passive:false});
  // }
}

// funciones de páginas
function homePage() {
  console.log('Home :D');

  mainHeaderHome.classList.remove('inactive');
  logoContainer.classList.remove('inactive');
  trendlyProductsContainer.classList.remove('inactive');

  headerArrow.classList.add('inactive');
  productDetailContainer.classList.add('inactive');
  body.classList.remove('image-preview')
}

function productPage() {
  console.log('This is your product :D');

  mainHeaderHome.classList.add('inactive');
  logoContainer.classList.add('inactive');
  trendlyProductsContainer.classList.add('inactive');

  headerArrow.classList.remove('inactive');
  productDetailContainer.classList.remove('inactive');
  body.classList.add('image-preview')
}


