# gmap-helpers

gmap-helpers is a tiny wrapper around the google maps API. It is made for users
like me who usually only have to embed a map on a contact page. The existing API
from Google itself is awesome, but I always forget the little details like:
how to zoom out so that all markers fit into the view. Why doesn't a click on
a marker with a URL open the URL?

This library does all this automatically for you, which is great for simlpe maps.

## Usage

```bash
npm install gmap-helpers
```

```js
import GMap from "gmap-helpers";

const canvas = document.getElementById("map");
const pos = new google.maps.LatLng("50.937531", "6.960278600000038");
const options = {
  zoom: 4,
  maxZoom: 18,
  center: pos,
  disableDefaultUI: true
};

const map = new GMap(canvas, options);
const marker = map.placeMarker(pos, {
  url: "https://example.com/"
});

```


## `GMap` class methods

### `placeMarker`

Adds a marker to the current map and fit all markers into the current view.
Also assigns a click event if a URL is set.

### `clearMarkers`

Remove all markers from the current map.|
