document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('satPopup');
  const close = document.getElementById('satClose');
  const nameEl = document.getElementById('satName');
  const typeEl = document.getElementById('satType');
  const yearEl = document.getElementById('satYear');
  const descEl = document.getElementById('satDesc');

  if (!popup) {
    return;
  }

  document.querySelectorAll('.satellite').forEach(function (sat) {
    sat.addEventListener('click', function () {
      const { name, type, year, desc } = sat.dataset;
      nameEl.textContent = name || 'Unknown Satellite';
      typeEl.textContent = type || 'Type unknown';
      yearEl.textContent = year || 'Year unknown';
      descEl.textContent = desc || 'No description available.';
      popup.classList.add('visible');
    });
  });

  close.addEventListener('click', function () {
    popup.classList.remove('visible');
  });

  popup.addEventListener('click', function (event) {
    if (event.target === popup) {
      popup.classList.remove('visible');
    }
  });
});
