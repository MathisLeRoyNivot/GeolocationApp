$(document).ready(function($) {

  var $findMeBtn = $('.find-me');

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
        localStorage.setItem("Mes positions", myPos_serialized);
        let myPos_deserialized = JSON.parse(localStorage.getItem("myPos_serialized"));
        //console.log(myPos_deserialized);


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