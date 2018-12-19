export default class Validators {
  constructor() {
    this.regExp = {
      email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
      fio: /^([A-Za-zА-Яа-яЁё]{2,})\s([A-Za-zА-Яа-яЁё]{2,})\s([A-Za-zА-Яа-яЁё]{2,})$/i,
      phone: /^[0-9]{10,}$/,
      password: /^[0-9]{6,}$/
    }
  }

  email(email) {
    return this.regExp.email.test(email);
  }

  fio(fio) {
    return this.regExp.fio.test(fio);
  }

  phone(phone) {
    return this.regExp.phone.test(phone);
  }

  password(password) {
    return this.regExp.password.test(password);
  }
}