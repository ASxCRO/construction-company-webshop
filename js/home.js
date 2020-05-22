var content = [
  { title: 'Kontakt' },
  { title: 'Adresa' },
  { title: 'Partneri' },
  { title: 'Projekti' },
  { title: 'Prozvodi' },
  { title: 'Prijava' }
];

$('.ui.search')
  .search({
    source: content
  });

  $(document).on('click','a.result',
    function() {  
      console.log($(this).find('.title')[0].innerText);
    } 
  );

  $('.menu .item')
  .tab()
;


// Sticky menu background
window.addEventListener('scroll', function() {
  if (window.scrollY > 150) {
    document.querySelector('#navbar').style.opacity = 0.9;
  } else {
    document.querySelector('#navbar').style.opacity = 1;
  }
});


// Smooth Scrolling
$('#navbar a, .btn').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top -100
      },
      800
    );
  }
});



$( document ).ready(function() {
  // position we will use later
  var lat = 45.331032;
  var lon = 17.676991;

  // initialize map
  map = L.map('mapDiv').setView([lat, lon], 13);

  // set map tiles source
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // add marker to the map
  marker = L.marker([lat, lon]).addTo(map);

  // add popup to the marker
  marker.bindPopup("<b>ASXCRO </b><br />Trg Sv.Trojstva 1<br />Požega").openPopup();

});