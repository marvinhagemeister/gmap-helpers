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
  var marker = map.placeMarker(pos, {
    url: "https://example.com/"
  });

  var info = document.createElement("div");
  info.textContent = "asdf";

  var raw = map.getMap();
  raw.controls[google.maps.ControlPosition.TOP_CENTER].push(info);
}
