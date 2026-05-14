
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-button');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const profilePic = document.getElementById('profile-pic'); // Profile image element

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            if (profilePic) {
                profilePic.src = 'placeholder-profile-dark.png';
                profilePic.alt = 'Your Name - Dark Mode';
            }
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            if (profilePic) {
                profilePic.src = 'placeholder-profile.png';
                profilePic.alt = 'Your Name - Light Mode';
            }
        }
    }

    function toggleTheme() {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        // Default to light mode
        applyTheme('light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme');
        if (!currentTheme) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});
