$(document).ready(function($) {

  var $findMeBtn = $('.find-me');
  var iPos = 0;
  // Check if browser supports the Geolocation API
  if (!navigator.geolocation) {

    $findMeBtn.addClass('disabled');
    $('.no-geolocation-support').addClass('visible');

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

        for (let index = iPos; index > 0 ; index--) {
          document.getElementById("lastLat").innerHTML += myPos_deserialized.Latitude;
          document.getElementById("lastLng").innerHTML += myPos_deserialized.Longitude;
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