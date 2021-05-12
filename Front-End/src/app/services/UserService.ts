import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  base = 'http://localhost:3000';

  constructor() {
  }

  register(user) {
    return fetch(this.base + '/api/register', {
      method: 'POST',
      body: JSON.stringify(user),
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

  login(username, password) {
    return fetch(this.base + '/api/login', {
      method: 'POST',
      body: JSON.stringify({username: username, password: password}),
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

  setUserRole(userId, role) {
    return fetch(this.base + '/api/user/' + userId + '/role/' + role, {
      method: 'PUT',
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

  approveRequest(userId) {
    return fetch(this.base + '/api/approve/user/' + userId , {
      method: 'PUT',
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

  getFollowersForUser(userId) {
    console.log(userId)
    return fetch(this.base + '/api/users/followers/' + userId, {
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

  getFollowingForUser(userId) {
    return fetch(this.base + '/api/users/following/' + userId, {
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

  logout() {
    return fetch(this.base + '/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
  }

  findLoggedUser() {
    return fetch(this.base + '/api/profile', {
      credentials: 'include',
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  updateUserProfile(user) {
    return fetch(this.base + '/api/profile', {
      method: 'PUT',
      body: JSON.stringify(user),
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

  deleteUser(userId) {
    return fetch(this.base + '/api/user' + '/' + userId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  findAllUsers() {
    return fetch(this.base + '/api/user', {
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }


  findUserProfile(pid) {
    return fetch(this.base + '/api/profile/' + pid, {
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

  followUser(user, currentUser) {
    return fetch(this.base + '/api/addFollowing/user/' + currentUser + '/following/' + user, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return fetch(this.base + '/api/addFollower/user/' + user + '/follower/' + currentUser, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        });
      } else {
        return null;
      }
    });
  }

  unfollowUser(user, currentUser) {
    return fetch(this.base + '/api/removeFollowing/user/' + currentUser + '/following/'+ user, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return fetch(this.base + '/api/removeFollower/user/' + user + '/followers/' + currentUser, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        });
      } else {
        return null;
      }
    });
  }
}
