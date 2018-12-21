$(document).ready(function($) {

  var $findMeBtn = $('.find-me');
  var iPos = 0;
  // vérifier que le navigateur supporte l'API
  if (!navigator.geolocation) {

    $findMeBtn.addClass('disabled');
    $('.no-geolocation-support').addClass('visible');

  } else {

    $findMeBtn.on('click', function(e) {

      e.preventDefault();

      navigator.geolocation.getCurrentPosition(function(position) {

        // récupérer les coordonnées
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        console.log("Latitude : " + lat);
        console.log("Longitude : " + lng);

        $('.latitude').text(lat.toFixed(6) + '°');
        $('.longitude').text(lng.toFixed(6) + '°');

        let myPos = {
          Latitude: lat,
          Longitude: lng
        }
        
        let myPos_serialized = JSON.stringify(myPos); 
        localStorage.setItem(iPos, myPos_serialized);
        let myPos_deserialized = JSON.parse(localStorage.getItem(iPos));
        iPos += 1;

        //récupérer une référence au tableau 
        var tableau = document.getElementById("tableauPos");

        //ajout d'une ligne au tableau 
        var ligne = tableau.insertRow(iPos);
        var colonne1 = ligne.insertCell(0);
        var colonne2 = ligne.insertCell(1);
        var colonne3 = ligne.insertCell(2);

        //remplir la ligne du tableau avec les coordonées
        colonne1.innerHTML = iPos;
        colonne2.innerHTML = myPos_deserialized.Latitude;
        colonne3.innerHTML = myPos_deserialized.Longitude;

        if ($(window).width() >900) {
          document.getElementById("btn-find").style.marginTop = "30px";
        }

        // Ajouter une propriété CSS à un élément HTML
        document.getElementById("myCurrentPos").style.display = "block";
        document.getElementById("myLastPos").style.display = "block";

        // Créer une carte et placer un marqueur aux coordonnées récupérées
        // https://developers.google.com/maps/documentation/javascript/reference

        var mapLatLng = new google.maps.LatLng(lat, lng);

        var mapOptions = {
          zoom: 15,
          mapTypeControl: false,
          center: mapLatLng,
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var mapMarker = new google.maps.Marker({
          position: mapLatLng,
          map: map,
          title: 'Your browser/device places you here',
        });

        // recentrer la carte sur notre position
        $(window).resize(function() {
          google.maps.event.trigger(map, 'resize');
          map.panTo(mapLatLng);
        });

      });

    });

  };

});