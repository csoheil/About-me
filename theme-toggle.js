
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-button');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const profilePic = document.getElementById('profile-pic'); // Profile image element

    // Function to apply the theme to the body class and optionally change image sources
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
            // erkherultt4434t
            if (profilePic) {
                profilePic.src = 'placeholder-profile.png';
                profilePic.alt = 'Your Name - Light Mode';
            }
        }
    }

    // Function to toggle between themes
    function toggleTheme() {
        // Determine current theme based on body class
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Save the chosen theme to localStorage
        localStorage.setItem('theme', newTheme);
        // Apply the new theme
        applyTheme(newTheme);
    }

    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Apply theme from localStorage if available
        applyTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        // Apply theme based on OS preference if no localStorage value
        applyTheme('dark');
    } else {
        // Default to light mode
        applyTheme('light');
    }

    // Add event listener for the theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Optional: Listen for changes in OS color scheme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme');
        // Only update if the user hasn't manually set a theme preference
        if (!currentTheme) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});
