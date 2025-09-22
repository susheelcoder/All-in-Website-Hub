
  // toggle menu on mobile
  // document.getElementById('menuToggle').addEventListener('click', function () {
  //   document.querySelector('.header-senter').classList.toggle('active');
  // });

 const menuToggle = document.getElementById('menuToggle');
  const headerMenu = document.getElementById('headerMenu');

  menuToggle.addEventListener('click', () => {
    headerMenu.classList.toggle('active');
    // optional: change icon
    menuToggle.textContent = headerMenu.classList.contains('active') ? '✖' : '☰';
  });