$(document).ready(function($) {

  var $findMeBtn = $('.find-me');
  var iPos = 0;
  // Check if browser supports the Geolocation API
  if (!navigator.geolocation) {

    $findMeBtn.addClass('disabled');
    $('.no-geolocation-support').addClass('visible');

  // Check if the page is accessed over HTTPS
  } else {

    $findMeBtn.on('click', function(e) {

      e.preventDefault();

      navigator.geolocation.getCurrentPosition(function(position) {

        // Get the location coordinates
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        console.log("Latitude : " + lat);
        console.log("Longitude : " + lng);

        $('.latitude').text(lat.toFixed(6) + '°');
        $('.longitude').text(lng.toFixed(6) + '°');
        $('.coordinates').addClass('visible');

        let myPos = {
          Latitude: lat,
          Longitude: lng
        }
        
        let myPos_serialized = JSON.stringify(myPos); 
        localStorage.setItem(iPos, myPos_serialized);
        let myPos_deserialized = JSON.parse(localStorage.getItem(iPos));
        iPos += 1;
        
      
        console.log(myPos_deserialized);
        console.log(iPos); 

        for (let index = 1; index < iPos ; index++) {
          var tableau = document.getElementById("tableauPos");
          
          var ligne = tableau.insertRow(index);
          var colonne1 = ligne.insertCell(0);
          var colonne2 = ligne.insertCell(1);
          var colonne3 = ligne.insertCell(2);
          if (index < iPos - 1 ) {
            tableau.deleteRow(index);
          }

          colonne1.innerHTML = index;
          colonne2.innerHTML = myPos_deserialized.Latitude;
          colonne3.innerHTML = myPos_deserialized.Longitude;
        }


        // Create a map and place a marker at the current location
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

        // Re-center the map on user location when window/viewport resizes
        $(window).resize(function() {
          google.maps.event.trigger(map, 'resize');
          map.panTo(mapLatLng);
        });

      });

    });

  };

});