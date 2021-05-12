import {Injectable} from '@angular/core';

@Injectable()
export class ReviewService {
  base = 'http://localhost:3000';

  constructor() {
  }


  createReview(review) {
    return fetch(this.base + '/api/reviews/create', {
      method: 'POST',
      body: JSON.stringify(review),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  findAllReviews() {
    return fetch(this.base + '/api/reviews/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }


  findAllReviewsForRestaurant(rid) {
    return fetch(this.base + '/api/reviews/restaurantId/' + rid, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }


  findReviewById(rid) {
    return fetch(this.base + '/api/reviews/review/' + rid, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  findReviewByUsernameForRestaurant(username, rid) {
    return fetch(this.base + '/api/reviews/username/' + username + '/restaurant/' + rid, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  deleteReview(rid) {
    return fetch(this.base + '/api/reviews/review/' + rid, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  findAllReviewsForUser(username) {
    return fetch(this.base + '/api/reviews/username/' + username, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  findAllReviewsForList(userId) {
    return fetch(this.base + '/api/reviews/following/' + userId, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

}
