// Filter Functionality
const filterBtns  = document.querySelectorAll('.filter-btn');
const eventGroups = document.querySelectorAll('.event-group');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Deactivate all buttons, then activate the clicked one
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    eventGroups.forEach(group => {
      const match = filter === 'all' || group.dataset.category === filter;
      group.classList.toggle('hidden', !match);
    });
  });
});


// Copy Email Functionality
const copyEmail = document.getElementById('copy-email');
const emailHandle = document.getElementById('email-handle');

copyEmail.addEventListener('click', () => {
  navigator.clipboard.writeText('paogines.photos@gmail.com');
  emailHandle.textContent = 'Copied!';
  setTimeout(() => {
    emailHandle.textContent = 'paogines.photos@gmail.com';
  }, 2000);
});