import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {YelpBackendService} from '../services/YelpBackendService';

declare var google: any;

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  res;
  category;
  comments = [];
  constructor(private service: YelpBackendService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadDetails(params['id'], params['name'], params['lat'], params['lng']));

  }

  initMap() {
    // The location of Uluru
    let uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    let map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    let marker = new google.maps.Marker({position: uluru, map: map});
  }

  loadGoogleMap() {
    const geocoder = new google.maps.Geocoder()
    const address = this.res.display_address

    geocoder.geocode({'address': address}, function (results, status) {
      if (status === 'OK') {
        const mapOption = {
          center: results[0].geometry.location,
          zoom: 12,
        };
        this.googleMap = new google.maps.Map(document.getElementById('map'), mapOption);
        const marker = new google.maps.Marker({
          map: this.googleMap,
          position: results[0].geometry.location
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  loadDetails(id, name, lat, lng) {
    this.service.findRestaurantDetails(id, name, lat, lng).then(res => this.res = res).then(res => this.loadCategory(res));
  }

  loadCategory(res) {
    this.category = res.category[0].title;
  }

  ngOnInit() {
    this.initMap()
  }

}
