import Validator from './Validators';
import Api from './Api'

export default class RegistrationForm {
  constructor(formId) {
    if (!formId || !document.getElementById(formId)) return;
    this.validate = new Validator();
    this.api = new Api();
    this.form = document.getElementById(formId);
    this.fio = this.form.querySelector('#fio');
    this.email = this.form.querySelector('#email');
    this.phone = this.form.querySelector('#phone');
    this.password = this.form.querySelector('#password');
    this.passwordReset = this.form.querySelector('#password-reset');
    this.preloader = this.form.querySelector('#preloader');
    this.fioBlock = this.form.querySelector('#fio-block');
    this.phoneBlock = this.form.querySelector('#phone-block');
    this.passwordBlock = this.form.querySelector('#password-block');
    this.formButton = this.form.querySelector('#login-form-button');
    this.greetings = document.getElementById('greetings');

    function addError(field) {
      field.classList.remove('login-form__input_valid');
      field.classList.add('login-form__input_error');
    }

    function addSuccess(field) {
      field.classList.remove('login-form__input_error');
      field.classList.add('login-form__input_valid');
    }

    /**
     * Храним обработчики кликов по кнопке, чтобы для каждого состояния формы был актуальный обработчик
     */
    this.formButton.eventHandlers = {
      click: {
        login: () => this.loginUser(),
        register: () => this.registerNewUser()
      }
    };

    this.form.addEventListener('submit', e => e.preventDefault());

    this.passwordReset.addEventListener('click', () => {
      if (this.validate.email(this.email.value)) {
        this.api.resetPassword(this.email.value).then(resolved => {
          if (resolved.STATUS !== 'ERROR') alert('Пароль успешно сброшен. Проверьте Ваш Email.')
        });
      }
    });

    this.email.addEventListener('input', (e) => {
      if (this.validate.email(e.target.value)) {
        addSuccess(e.target);
        this.preloader.style.display = 'block';
        this.api.emailChecker(e.target.value).then(resolved => {
          if (resolved.STATUS === 'ERROR') {
            this.preloader.style.display = 'none';
            this.fioBlock.classList.add('hidden');
            this.phoneBlock.classList.add('hidden');
            this.passwordBlock.classList.remove('hidden');
            this.formButton.innerText = 'Войти';
            this.formButton.removeEventListener('click', this.formButton.eventHandlers.click.register);
            this.formButton.addEventListener('click', this.formButton.eventHandlers.click.login);
          } else {
            this.preloader.style.display = 'none';
            this.fioBlock.classList.remove('hidden');
            this.phoneBlock.classList.remove('hidden');
            this.passwordBlock.classList.add('hidden');
            this.formButton.innerText = 'Зарегистрироваться';
            this.formButton.removeEventListener('click', this.formButton.eventHandlers.click.login);
            this.formButton.addEventListener('click', this.formButton.eventHandlers.click.register);
          }
        })
      } else {
        addError(e.target);
      }
    });

    this.fio.addEventListener('input', (e) => {
      if (this.validate.fio(e.target.value)) {
        addSuccess(e.target);
      } else {
        addError(e.target);
      }
    });

    this.phone.addEventListener('input', (e) => {
      if (this.validate.phone(e.target.value)) {
        addSuccess(e.target);
      } else {
        addError(e.target);
      }
    });

    this.password.addEventListener('input', (e) => {
      if (this.validate.password(e.target.value)) {
        addSuccess(e.target);
      } else {
        addError(e.target);
      }
    });
  };

  checkEmail(data) {
    this.api.emailChecker(data).then(resolved => {
      console.log(resolved);
    }, rejected => {
      console.log(rejected);
    });
  }

  registerNewUser() {
    const regInfo = {
      EMAIL: this.email.value,
      LAST_NAME: this.fio.value.split(/\s/g)[0],
      NAME: this.fio.value.split(/\s/g)[1],
      SECOND_NAME: this.fio.value.split(/\s/g)[2],
      PERSONAL_PHONE: this.phone.value,
      AUTHORIZE: 'Y'

    };

    this.api.registerUser(regInfo).then((resolved) => {
      if (resolved.STATUS === 'ERROR') return;
      this.form.classList.add('hidden');
      this.greetings.classList.remove('hidden');
      this.greetings.innerText = `Поздравляем! Вы успешно зарегистировались!`;
      setTimeout(() => window.location.reload(), 5000);
    });
  }

  loginUser() {
    const loginInfo = {
      LOGIN: this.email.value,
      PASSWORD: this.password.value,
      REMEMBER: 'N'
    };

    this.api.loginUser(loginInfo).then(resolved => {
      if (resolved.STATUS === 'ERROR') return;
      this.form.classList.add('hidden');
      this.greetings.classList.remove('hidden');
      this.greetings.innerText = `Здравствуйте, ${resolved.DATA.USER.FIRST_NAME}! Вы успешно авторизовались!`;
    });
  }
}