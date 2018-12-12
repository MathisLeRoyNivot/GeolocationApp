$(document).ready(function($) {

    var $findMeBtn = $('.find-me');
  
    // Check if browser supports the Geolocation API
    if (!navigator.geolocation) {
  
      $findMeBtn.addClass('disabled');
      $('.no-geolocation-support').addClass('visible');
  
    // Check if the page is accessed over HTTPS
    } else if (location.protocol !== 'https:') {
  
      // Check if top-level frame
      if (window.top === window.self) {
  
        // Reload the page over HTTPS
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  
      // If not top-level, display a message
        // Note: CodePen does not allow an `<iframe>` to reload the top-level frame (browser window). See about the `sandbox` attribute at https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes.
      } else {
  
        $findMeBtn.addClass('disabled');
        $('.not-on-https').addClass('visible');
  
      };
  
    // Let's use the Geolocation API
    } else {
  
      $findMeBtn.on('click', function(e) {
  
        e.preventDefault();
  
        navigator.geolocation.getCurrentPosition(function(position) {
  
          // Get the location coordinates
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
  
          $('.latitude').text(lat.toFixed(6) + '°');
          $('.longitude').text(lng.toFixed(6) + '°');
          $('.coordinates').addClass('visible');
  
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
  