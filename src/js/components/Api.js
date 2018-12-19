export default class Api {
  constructor() {
    this.API_URL = 'https://demo.book24.ru/api/v1/';
    this.HEADERS = new Headers({
      "x-token": '330d207892855dbd5abd5147ea562094',
      "Authorization": 'Basic ZGVtby5ib29rMjQ6Ym9vazI0',
    });
    this.EMAIL_CHECK_PATH = 'user/check-email-availability/';
    this.PASSWORD_RESET_PATH = 'user/password-recovery/';
    this.LOGIN_PATH = 'user-session/';
    this.REGISTER_USER_PATH = 'user/';
  }

  authChecker() {
    return new Promise((resolve, reject) => {
      const url = `${this.API_URL}${this.LOGIN_PATH}?SESSID=330d207892855dbd5abd5147ea562094`;

      fetch(url, {
        method: 'GET',
        headers: this.HEADERS,
        credentials: 'include'
      }).then((response) => {
        if (response.status === 400) {
          throw new TypeError("Пользователь не авторизован");
        } else {
          return response.json();
        }
      }).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  emailChecker(email) {
    return new Promise((resolve, reject) => {
      const url = `${this.API_URL}${this.EMAIL_CHECK_PATH}`;
      const formData = new FormData();

      formData.append('EMAIL', email);

      fetch(url, {
        method: 'POST',
        headers: this.HEADERS,
        credentials: 'include',
        body: formData
      }).then((response) => {
        return response.json();
      }).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  registerUser(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.API_URL}${this.REGISTER_USER_PATH}`;
      const formData = new FormData();

      formData.append('EMAIL', data.EMAIL);
      formData.append('LAST_NAME', data.LAST_NAME);
      formData.append('NAME', data.NAME);
      formData.append('SECOND_NAME', data.SECOND_NAME);
      formData.append('PERSONAL_PHONE', data.PERSONAL_PHONE);
      formData.append('AUTHORIZE', data.AUTHORIZE);

      fetch(url, {
        method: 'POST',
        headers: this.HEADERS,
        credentials: 'include',
        body: formData
      }).then((response) => {
        return response.json();
      }).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  loginUser(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.API_URL}${this.LOGIN_PATH}`;
      const formData = new FormData();

      formData.append('LOGIN', data.LOGIN);
      formData.append('PASSWORD', data.PASSWORD);
      formData.append('REMEMBER', data.REMEMBER);

      fetch(url, {
        method: 'POST',
        headers: this.HEADERS,
        credentials: 'include',
        body: formData
      }).then((response) => {
        return response.json();
      }).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  resetPassword(login) {
    return new Promise((resolve, reject) => {
      const url = `${this.API_URL}${this.PASSWORD_RESET_PATH}`;
      const formData = new FormData();

      formData.append('LOGIN', login);
      formData.append('TYPE_PLATFORM', 'desktop');

      fetch(url, {
        method: 'POST',
        headers: this.HEADERS,
        body: formData
      }).then((response) => {
        return response.json();
      }).then((response) => {
        console.log(response);
        resolve(response);
      }).catch((e) => {
        reject(e);
      });
    });
  }
}