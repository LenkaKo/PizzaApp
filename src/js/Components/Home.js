import { select, templates } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.initCarousel();
  }

  render(element) {
    const thisHome = this;

    /* generate HTML based on template */
    const generatedHTML = templates.homePage(element);

    // create empty object thisHome.dom
    thisHome.dom = {};

    // add new property to thisHome.dom object
    thisHome.dom.wrapper = element;

    // add innerHTML of the wrapper using generatedHTML
    thisHome.dom.wrapper.innerHTML = generatedHTML;

    thisHome.dom.carousel = thisHome.dom.wrapper.querySelector(select.home.carousel);
  }

  initCarousel() {
    const thisHome = this;

    thisHome.carousel = new Flickity (thisHome.dom.carousel, { // eslint-disable-line
      contain: true,
      autoPlay: true
    });

  }
}

export default Home;