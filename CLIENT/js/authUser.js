const emailReg = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const alphaOnly = (/^[a-zA-Z0-9]*$/);
const signupBtn = document.getElementById('signupBtn');
const loader = document.getElementById('loaderDiv');

/* eslint-disable class-methods-use-this */
/**
 * Represents the class that handles user authentication.
 */
class UserAuthentication extends Request {
  /**
     * This function validate the user input on the client side.
     * @returns {object} Returns error or the signup credentials needed.
     */
  authInputValidator() {
    const errorHandle = document.getElementById('signUpErrorHandler');
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('password').value;
    const repPassword = document.getElementById('confirmPassword').value;
    if (!email) {
      errorHandle.innerHTML = 'Email is Required';
      return false;
    }
    if (!password) {
      errorHandle.innerHTML = 'Password is Required';
      return false;
    }
    if (email.length < 6) {
      errorHandle.innerHTML = 'Email should be six character and above';
      return false;
    }
    if (password.length < 6) {
      errorHandle.innerHTML = 'Password can only be six character and above';
      return false;
    }
    if (!email.match(emailReg)) {
      errorHandle.innerHTML = 'Please Enter a valid Email';
      return false;
    }
    if (!password.match(alphaOnly)) {
      errorHandle.innerHTML = 'Password can only be alphabets and numbers';
      return false;
    }
    if (email.length > 40) {
      errorHandle.innerHTML = 'Email should be less than 30 char';
      return false;
    }
    if (password.length > 40) {
      errorHandle.innerHTML = 'Password must be less than 40 char';
      return false;
    }
    if (password !== repPassword) {
      errorHandle.innerHTML = 'Password must match with repeat password';
      return false;
    }
    const uDrl = '/auth/signup';
    const payload = {
      userEmail: email,
      userPassword: password
    };
    loader.style.display = 'flex';
    this.post(uDrl, payload)
      .then((res) => {
        if (res.error) {
          errorHandle.innerHTML = res.error;
          loader.style.display = 'none';
          return false;
        }
        const token = res.token;
        localStorage.setItem('token', token);
        setTimeout(() => {
          loader.style.display = 'flex';
          location.href = 'fastfood.html';
        },
        2000);
      });
  }
}

const authentication = new UserAuthentication();

signupBtn.onclick = () => {
  authentication.authInputValidator();
};
