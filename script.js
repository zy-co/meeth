function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const menus = document.querySelectorAll(".menu-item");
  const backgrounds = [`radial-gradient(#2B3769, #0B1023)`, `radial-gradient(#4E3022, #161616)`, `radial-gradient(#4E4342, #161616)`];
  
  let current = 0
  let scrollSlide = 0;
  
  menus.forEach(menu => {
    menu.addEventListener("click", function() {
      changeItems(this);
    });
  });
  
  function changeItems(item) {
    menus.forEach(menu => {
      menu.classList.remove('actv');
    });
    item.classList.add('actv');
  }
  
  slides.forEach((slide,index) => {
    slide.addEventListener("click", function() {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });
  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }
  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector('.hero .model-left');
    const nextRight = nextPage.querySelector('.hero .model-right');
    const currentLeft = currentPage.querySelector('.hero .model-left');
    const currentRight = currentPage.querySelector('.hero .model-right');
    const nextText = nextPage.querySelector('.details');
    const navLinks = document.querySelector('.nav-links');
    const portofolio = document.querySelector('.portofolio');
    
    const tl = new TimelineMax({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });
  
    tl.fromTo(currentLeft, 0.3, {y: '-10%'}, {y: '-100%'})
    .fromTo(currentRight, 0.3, {y: '10%'}, {y: '-100%'}, '-=0.2')
    .to(portofolio, 0.3, {backgroundImage: backgrounds[pageNumber]})
    .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity: 0, pointerEvents: 'none'})
    .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: 'none'}, {opacity: 1, pointerEvents: 'all'}, '-=0.5')
    .fromTo(nextLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.45')
    .fromTo(nextRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.45')
    .fromTo(nextText, 0.3, {opacity: 0, y: '0%'}, {opacity: 1, y: '0%'})
    .set(nextLeft, {clearProps: 'all'})
    .set(nextRight, {clearProps: 'all'})
    
    current = pageNumber;
  }
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500));

  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
  }
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

let navOpen = document.querySelector('#menu');
let navToggle = document.querySelector('.toggle');
let ovr = document.querySelector('.overlay');

navToggle.onclick = function() {
  navOpen.classList.toggle('active');
  navToggle.classList.toggle('active');
  ovr.classList.toggle('active');
}

ovr.onclick = function() {
  navOpen.classList.remove('active');
  navToggle.classList.remove('active');
  ovr.classList.remove('active');
}

const menu = document.getElementById('menu');

Array.from(document.getElementsByClassName('menu-item'))
 .forEach((item, index) => {
  item.onmouseover = () => {
    menu.dataset.activeIndex = index;
  }
})

init()