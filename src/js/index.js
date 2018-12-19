import RegistrationForm from './components/RegistrationForm';
import Api from './components/Api';

const api = new Api();
const form = document.getElementById('login-form');
const greetings = document.getElementById('greetings');


api.authChecker().then(resolved => {
  form.classList.add('hidden');
  greetings.classList.remove('hidden');
  greetings.innerText = `Здравствуйте, ${resolved.DATA.USER.FIRST_NAME} ${resolved.DATA.USER.SECOND_NAME}!`;
}, () => {
  new RegistrationForm('login-form');
  form.classList.remove('hidden');
  greetings.classList.add('hidden');
});