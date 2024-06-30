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
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let thumbnails = document.getElementsByClassName("thumbnail");

  if (n > slides.length) {
     slideIndex = 1;
  }

  if (n < 1) {
     slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
  }

  for (i = 0; i < thumbnails.length; i++) {
     thumbnails[i].classList.remove("selected");
  }

  slides[slideIndex - 1].style.display = "block";
  thumbnails[slideIndex - 1].classList.add("selected");
}

// Open street maps 
var map = L.map('map').setView([-41.065581481196446, 175.471647627618], 9.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let locations = [
   {
     "id": 1,
     "lat": -41.065581481196446,
     "long": 175.471647627618,
     "title": "Pinehaven Orchards",
     "address": "2471 State Highway 2, Greytown 5794"
  },
  {
     "id": 2,
     "lat": -41.09028329524014,
     "long": 175.369897014067,
     "title": "Adamsons Service Station",
     "address": "32 Fitzherbert Street, Featherston 5710" 
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