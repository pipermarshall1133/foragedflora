// Smooth effect to content sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
     e.preventDefault();

     document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
     });
  });
});

// Mobile navigation open and close
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.querySelector('.menu-icon');
  const navList = document.querySelector('.nav ul');
  const navItems = document.querySelectorAll('.nav li a');

  menuIcon.addEventListener('click', function () {
     navList.classList.toggle('active');
  });

  navItems.forEach(function (item) {
     item.addEventListener('click', function () {
        navList.classList.remove('active');
     });
  });
});


// Portfolio gallery 
const images = [ 
    { src: "1.png", alt: "Flowers" },
    { src: "2.png", alt: "Flowers" },
    { src: "3.png", alt: "Flowers" },
    { src: "4.png", alt: "Flowers" },
    { src: "5.png", alt: "Flowers" },
    { src: "6.png", alt: "Flowers" },
    { src: "7.png", alt: "Flowers" },
    { src: "8.png", alt: "Flowers" },
    { src: "9.png", alt: "Flowers" },
    { src: "10.png", alt: "Flowers" },
    { src: "11.png", alt: "Flowers" },
    { src: "12.png", alt: "Flowers" },
    { src: "13.png", alt: "Flowers" },
    { src: "14.png", alt: "Flowers" },
    { src: "15.png", alt: "Flowers" },
    { src: "16.png", alt: "Flowers" },
  ];

  let slideIndex = 1;

  const slideshowContainer = document.getElementById("slideshow-container");
  const thumbnailContainer = document.getElementById("thumbnail-container");
  
  function initSlides() {
    images.forEach((image, i) => {
      const slide = document.createElement("div");
      slide.className = "mySlides";
      slide.innerHTML = `<img src="images/${image.src}" alt="${image.alt}" loading="lazy">`;
      slide.style.display = "none";
      slideshowContainer.appendChild(slide);
    });
  
    showSlides(slideIndex);
  }
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const total = slides.length;
  
    if (n > total) slideIndex = 1;
    if (n < 1) slideIndex = total;
  
    for (let i = 0; i < total; i++) {
      slides[i].style.display = "none";
    }
  
    slides[slideIndex - 1].style.display = "block";
    updateThumbnails();
  }
  
  function updateThumbnails() {
    const total = images.length;
    let start = slideIndex - 3;
    if (start < 0) start = 0;
    if (start > total - 5) start = total - 5;
    if (total <= 5) start = 0;
  
    thumbnailContainer.innerHTML = "";
  
    for (let i = start; i < start + 5 && i < total; i++) {
      const thumb = document.createElement("img");
      thumb.className = "thumbnail" + (i + 1 === slideIndex ? " selected" : "");
      thumb.alt = images[i].alt;
      thumb.loading = "lazy";  // Enable native lazy loading
  
      // Initially set a placeholder image
      thumb.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zY3JlZW5zL3hzbC1wYXRoIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHN0eWxlPSJmaWxsOiMwMDAwMDA7Ii8+Cjwvc3ZnPg==";  // 1x1 transparent placeholder
  
      // Set the actual image URL as a data-src attribute
      thumb.setAttribute('data-src', "images/" + images[i].src);
  
      thumb.onclick = () => currentSlide(i + 1);
  
      thumbnailContainer.appendChild(thumb);
  
      // Use IntersectionObserver to load the image when it's in the viewport
      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Replace the placeholder with the actual image when it's about to come into view
            thumb.src = thumb.getAttribute('data-src');
            observerInstance.unobserve(entry.target); // Stop observing once the image is loaded
          }
        });
      });
  
      // Start observing the thumbnail image
      observer.observe(thumb);
    }
  }
  
  document.addEventListener("DOMContentLoaded", initSlides);
  
  

// Open street maps 
var map = L.map('map').setView([-41.065581481196446, 175.471647627618], 9.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let locations = [
   {
     "id": 1,
     "lat": -41.07107179012294,
     "long": 175.47033903995413,
     "title": "Pinehaven Orchards",
     "address": "Pinehaven Orchards, Greytown 5794"
  },
  {
     "id": 2,
     "lat": -41.11645653629864,
     "long": 175.3227930101438,
     "title": "Adamsons Service Station",
     "address": "32 Fitzherbert Street, Featherston 5710" 
  },
  {
     "id": 3,
     "lat": -41.08687220142622,
     "long": 175.45271025333255,
     "title": "Challenge Greytown",
     "address": "Challenge Greytown, Greytown 5712" 
  },
  {
      "id": 4,
      "lat": -41.21867913895586,
      "long": 175.45878960631535,
      "title": "P&K Four Square Martinborough",
      "address": "P%26K+Four+Square+Martinborough" 
   }
]

locations.forEach(element => {

  let iconOptions = {
     title: element.title,
     draggable: false,
  }

  let green_icon = L.AwesomeMarkers.icon({
     "extraClasses": "fa-rotate-0",
     "icon": "circle",
     "iconColor": "white",
     "markerColor": "green",
     "prefix": "fa"
  });

  let basePopup = '<div class="card">' +
     '<h3>' + element.title + '</h3>' +
     '<a target="_blank" href="http://maps.google.com/?q=' + element.address +'"> Directions </a>' +
     '</div>';


  let marker = new L.Marker([element.lat, element.long], iconOptions).addTo(map);
  marker.setIcon(green_icon);
  marker.on("mouseover", event => {
     event.target.bindPopup(basePopup).openPopup();
  })

});