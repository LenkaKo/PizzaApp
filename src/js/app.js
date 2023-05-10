import { settings, select, classNames, } from './settings.js';
import Product from './Components/Product.js';
import Cart from './Components/Cart.js';
import Booking from './Components/Booking.js';
import Home from './Components/Home.js';
  
const app = {
  initHome: function() {
    const thisApp = this;

    // find home container
    const homeWrapper = document.querySelector(select.containerOf.homePage);

    // create new instance of Home class
    thisApp.homePage = new Home(homeWrapper);

    thisApp.homeLinks = document.querySelectorAll(select.home.links);

    for (let link of thisApp.homeLinks){
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const linkHref = link.getAttribute('href').replace('#', '');

        thisApp.activatePage(linkHref);
      });
    }
  },

  initPages: function() {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages) {
      if(page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks) {
      link.addEventListener('click', function(e){
        const clickedElement = this;
        e.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );  
    }
    
  },
  
  initMenu: function (){
    const thisApp = this;

    //console.log('thisApp.data:', thisApp.data);
      
    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(e) {
      app.cart.add(e.detail.product.prepareCartProduct());
      console.log(e.detail.product);
    });
  },
      
  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.products;

    fetch(url)
      .then((rawResponse) => rawResponse.json())
      .then((parsedResponse) => {
        console.log('parsedResponse', parsedResponse);
        /** save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /** execute initMenu method */
        thisApp.initMenu();
      });

    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initBooking: function() {
    const thisApp = this;
    thisApp.bookingContainer = document.querySelector(select.containerOf.booking);
    new Booking(thisApp.bookingContainer);
  },

  init: function(){
    const thisApp = this;
  
    thisApp.initData();
    thisApp.initCart();
    thisApp.initPages();
    thisApp.initBooking();
    thisApp.initHome();
    thisApp.initMenu();
  },
};

app.init();

