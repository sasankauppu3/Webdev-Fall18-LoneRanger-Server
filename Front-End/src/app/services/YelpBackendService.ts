import {Injectable} from '@angular/core';

@Injectable()
export class  YelpBackendService {
  server_url = 'http://localhost:3000';
  findRestaurantByNameAndLocation(name, location) {
    return fetch(this.server_url + '/api/restaurant/name/' + name + '/location/' + location , {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}}).then(res => res.json());
  }

  findAllRestaurants(loc) {
    return fetch(this.server_url + '/api/restaurant/location/' + loc , {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}}).then(res => res.json());
  }

  findRestaurantDetails(id, name, lat, lng) {
    return fetch(this.server_url + '/api/restaurant/name/' + name + '/rid/' + id + '/lat/' + lat + '/lng/' + lng, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}}).then(res => res.json());
  }
}
