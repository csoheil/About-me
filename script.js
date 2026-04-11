
document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar ul li a, .hero-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: unobserve after it becomes visible
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    document.querySelectorAll('.about-content, .portfolio-item, .blog-post, .contact-form').forEach(element => {
        observer.observe(element);
    });



    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            formStatus.textContent = 'Sending message.....';
            formStatus.style.color = '#00aaff';

            // --- IMPORTANT ---
            // The actual sending of the email will be handled by the Python backend.
            // This JavaScript will make a POST request to your Python server endpoint.
            // You'll need to configure your Python server (e.g., using Flask) to
            // receive this data and send the email.
            // Replace '/send-email' with your actual backend endpoint URL.
            try {
                const response = await fetch('/send-email', { // <<<  
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = '#00ff00'; // Green for success
                    contactForm.reset(); // Clear the form
                } else {
                    // Try to get error message from response
                    let errorMsg = 'Failed to send message. Please try again later.';
                    try {
                        const errorData = await response.json();
                        if (errorData.error) {
                            errorMsg = `Error: ${errorData.error}`;
                        }
                    } catch (jsonError) {
                        // If response is not JSON, use status text
                        errorMsg = `Failed to send message (Status: ${response.status} ${response.statusText}). Please try again later.`;
                    }
                    formStatus.textContent = errorMsg;
                    formStatus.style.color = '#ff0000'; // Red for error
                }
            } catch (error) {
                console.error('Network or fetch error:', error);
                formStatus.textContent = 'Network error. Please check your connection or try again later.';
                formStatus.style.color = '#ff0000'; // Red for error
            }
        });
    }
});
