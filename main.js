const copyEmail = document.getElementById('copy-email');
const emailHandle = document.getElementById('email-handle');

copyEmail.addEventListener('click', () => {
  navigator.clipboard.writeText('paogines.photos@gmail.com');
  emailHandle.textContent = 'Copied!';
  setTimeout(() => {
    emailHandle.textContent = 'paogines.photos@gmail.com';
  }, 2000);
});