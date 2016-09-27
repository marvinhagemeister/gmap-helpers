function initMap() {
  var GMap = GMapHelpers.default;

  var canvas = document.getElementById('map');
  var pos = new google.maps.LatLng("50.937531", "6.960278600000038");
  var options = {
    zoom: 4,
    maxZoom: 18,
    center: pos,
    disableDefaultUI: true
  };

  var map = new GMap(canvas, options);
  var marker = map.placeMarker({
    position: pos,
    url: "https://example.com/"
  });

  var pos2 = new google.maps.LatLng("52.937531", "6.960278600000038");
  var marker2 = map.placeMarker({ position: pos2 });

  map.fitMarkers([marker, marker2]);

  map.setActiveIcon([marker], '', 'https://placehold.it/50x50/aaaaaa');

  var info = document.createElement("div");
  info.style.background = 'white';
  info.style.padding = '10px';
  info.textContent = "asdf";

  map.addControl(google.maps.ControlPosition.RIGHT_BOTTOM, info);
}
