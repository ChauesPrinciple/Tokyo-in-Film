const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
        mobileMenu.setAttribute('aria-expanded', String(isOpen));
    });
}

// Dropdown Toggle Logic
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        // Only toggle if the click is on the logo container itself or the text, 
        // not if the user is clicking an actual link inside the dropdown
        if (!e.target.closest('.dropdown-item')) {
            logo.classList.toggle('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!logo.contains(e.target)) {
            logo.classList.remove('active');
        }
    });
}
