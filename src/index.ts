import { encodeURI } from "./encodeURI";
import { jsonRequest } from "./request";
import { striptags } from "./striptags";

interface IGeocodeResult extends google.maps.GeocoderResult {
  status: number;
  results: google.maps.GeocoderResult[];
}

export default class GMaps {
  private static GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";
  private canvas: HTMLDivElement;
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  constructor(canvas: HTMLDivElement, options: Object) {
    this.canvas = canvas;
    this.map = new google.maps.Map(canvas, options);
  }

  public getMap(): google.maps.Map {
    return this.map;
  }

  public getPositionByAddress(address: string, callback: Function) {
    address = striptags(address);

    jsonRequest(GMaps.GEO_URL + address, (res: any): void => {
        if (res.status !== google.maps.GeocoderStatus.OK) {
          callback(null);
        }

        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;
        const pos = new google.maps.LatLng(lat, lng);

        callback(pos);
    });
  }

  public placeMarker(position: google.maps.LatLng, title?: string) {
    const marker = new google.maps.Marker({
      position,
      title,
    });

    marker.setMap(this.map);
    this.markers.push(marker);

    // Set the view to contain all Markers
    this.map.fitBounds(this.getBoundingBox(this.markers));
    return marker;
  }

  public clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  private getBoundingBox(markers: google.maps.Marker[]) {
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    return bounds;
  }
}
