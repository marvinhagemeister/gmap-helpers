import { jsonRequest } from "./request";
import { striptags } from "./striptags";
import "object-assign";

interface IGeocodeResult extends google.maps.GeocoderResult {
  status: number;
  results: google.maps.GeocoderResult[];
}

interface IMarkerOptions extends google.maps.MarkerOptions {
  title?: string;
  icon?: string;
  url?: string;
  label?: string;
}

export default class GMap {

  public static getPositionByAddress(address: string, callback: Function) {
    address = striptags(address);

    jsonRequest(GMap.GEO_URL + address, (res: any): void => {
      if (res.status !== google.maps.GeocoderStatus.OK) {
        callback(null);
      }

      const lat = res.results[0].geometry.location.lat;
      const lng = res.results[0].geometry.location.lng;
      const pos = new google.maps.LatLng(lat, lng);

      callback(pos);
    });
  }

  public static createInfoWindow(html: string): google.maps.InfoWindow {
    return new google.maps.InfoWindow({
      content: html,
    });
  }

  private static GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

  private canvas: HTMLDivElement;
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  constructor(canvas: HTMLDivElement, options: any) {
    this.canvas = canvas;

    if (!options.mapTypeId) {
      options.mapTypeId = google.maps.MapTypeId.ROADMAP;
    }

    this.map = new google.maps.Map(canvas, options);
  }

  public getMap(): google.maps.Map {
    return this.map;
  }

  public setCenter(position: google.maps.LatLng) {
    this.map.setCenter(position);
  }

  public placeMarker(position: google.maps.LatLng, options: IMarkerOptions) {
    let defaults: any = {
      position,
    };

    const newOpts: IMarkerOptions = Object.assign({}, defaults, options);
    const marker = new google.maps.Marker(newOpts);
    marker.setMap(this.map);
    this.markers.push(marker);

    if (newOpts.url) {
      google.maps.event.addListener(marker, "click", () => {
        window.open(newOpts.url, "_blank");
      });
    }

    // Set the view to contain all Markers
    this.map.fitBounds(this.getBoundingBox(this.markers));
    return marker;
  }

  public addControl(position: google.maps.ControlPosition, html: HTMLElement) {
    this.map.controls[position].push(html);
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
