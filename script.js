const mobileMenuButton = document.getElementById('mobileMenuButton');
const navLinks = document.getElementById('navLinks');

mobileMenuButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });

      navLinks.classList.remove('active');
    }
  });
});

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    }
  });
}, observerOptions);

document.querySelectorAll('.slide-up').forEach(element => {
  observer.observe(element);
});

const projectsTrack = document.getElementById('projectsTrack');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const sliderDots = document.getElementById('sliderDots');

let currentIndex = 0;
const slides = document.querySelectorAll('.project-slide');
const totalSlides = slides.length;
let slidesPerView = 1;

let totalDots = 0;

function createDots() {
  sliderDots.innerHTML = '';
  totalDots = totalSlides - slidesPerView + 1;
  if (totalDots < 1) totalDots = 1;
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
  }
}

createDots();

function updateSlidesPerView() {
  if (window.innerWidth >= 1024) {
    slidesPerView = 3;
  } else if (window.innerWidth >= 768) {
    slidesPerView = 2;
  } else {
    slidesPerView = 1;
  }
  createDots();
}


updateSlidesPerView();

window.addEventListener('resize', () => {
  updateSlidesPerView();
  goToSlide(currentIndex);
});

function goToSlide(index) {
  if (index < 0) {
    index = totalDots - 1;
  } else if (index > totalDots - 1) {
    index = 0;
  }
  
  currentIndex = index;
  
  const slideWidth = 100 / slidesPerView;
  projectsTrack.style.transform = `translateX(-${index * slideWidth}%)`;
  
  const dots = sliderDots.querySelectorAll('.slider-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

setInterval(() => {
  goToSlide(currentIndex + 1);
}, 5000);
