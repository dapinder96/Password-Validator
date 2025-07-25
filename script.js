const passwordInput = document.getElementById('password');
const strengthIndicator = document.getElementById('strengthIndicator');
const generatedContainer = document.getElementById('generatedContainer');
const generatedPasswordSpan = document.getElementById('generatedPassword');

passwordInput.addEventListener('input', function () {
  updateStrength(passwordInput.value);
});

function togglePassword() {
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

function updateStrength(password) {
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const noRepeats = !/(.)\1{2,}/.test(password);

  let strength = 'Weak';
  let className = 'weak';

  if (length < 8 || !(hasUpper || hasLower || hasNumber || hasSpecial)) {
    strength = 'Weak';
    className = 'weak';
  } else if (
    length >= 8 &&
    [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length >= 2
  ) {
    strength = 'OK';
    className = 'ok';
  }

  if (
    length >= 12 &&
    hasUpper &&
    hasLower &&
    hasNumber &&
    hasSpecial &&
    noRepeats
  ) {
    strength = 'Strong';
    className = 'strong';
  }

  strengthIndicator.textContent = `Strength: ${strength}`;
  strengthIndicator.className = `strength ${className}`;
}

function generatePassword() {
  const length = 14;
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+[]{}<>?';

  const all = upper + lower + numbers + special;

  let password = '';
  password += getRandomChar(upper);
  password += getRandomChar(lower);
  password += getRandomChar(numbers);
  password += getRandomChar(special);

  for (let i = 4; i < length; i++) {
    password += getRandomChar(all);
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');

  passwordInput.value = password;
  updateStrength(password);
  generatedPasswordSpan.textContent = password;
  generatedContainer.style.display = 'flex';
}

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function copyPassword() {
  navigator.clipboard.writeText(generatedPasswordSpan.textContent)
    .then(() => alert("Password copied to clipboard!"))
    .catch(() => alert("Failed to copy password"));
}