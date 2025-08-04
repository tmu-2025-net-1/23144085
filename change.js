
document.getElementById('tab-howto').addEventListener('click', function () {
  document.getElementById('howto-section').classList.add('active');
  document.getElementById('about-section').classList.remove('active');
  this.classList.add('active');
  document.getElementById('tab-about').classList.remove('active');
});


document.getElementById('tab-about').addEventListener('click', function () {
  document.getElementById('about-section').classList.add('active');
  document.getElementById('howto-section').classList.remove('active');
  this.classList.add('active');
  document.getElementById('tab-howto').classList.remove('active');
});