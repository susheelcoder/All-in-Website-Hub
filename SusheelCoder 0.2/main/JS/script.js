
// Header {mobile}

function toggleMenu() {
    document.getElementById("navbar").classList.toggle("show");
}

function toggleMenu() {
    document.querySelector('.nav').classList.toggle('active');
}


//  // Mouse 3D Tilt Effect {hero section home page }

const card = document.getElementById("card");

card.addEventListener("mousemove", (e) => {
    let x = (card.offsetWidth / 2 - e.offsetX) / 12;
    let y = (card.offsetHeight / 2 - e.offsetY) / 12;
    card.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
});



//  // Animate skill bars when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const skillLevels = document.querySelectorAll('.skill-level');

    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';

        setTimeout(() => {
            level.style.transition = 'width 1.5s ease-in-out';
            level.style.width = width;
        }, 300);
    });
});



// Add animation to project cards on scroll
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});


// Simple form handling  {conct section}
(function() {
    const form = document.getElementById('contactFormSimple');
    const submitBtn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('statusMsg');

    // Your SheetDB endpoint:
    const SHEETDB_ENDPOINT = 'https://sheetdb.io/api/v1/wj4uial6bin63';

    // Create dd/mm/yy, HH:MM (24-hour) in Asia/Kolkata timezone
    function formatDateTimeForIndia() {
        try {
            // Use toLocaleString so it respects daylight savings/etc.
            const optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'Asia/Kolkata' };
            const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };

            const now = new Date();

            // date part dd/mm/yy
            const datePart = now.toLocaleDateString('en-GB', optionsDate); // e.g. 22/11/25

            // time part HH:MM (24h)
            // toLocaleTimeString may include seconds depending on browser; we'll use toLocaleString and split
            const timePart = now.toLocaleTimeString('en-GB', optionsTime); // e.g. 14:05

            return `${datePart}, ${timePart}`;
        } catch (err) {
            // Fallback: manual UTC-to-IST conversion (IST = UTC+5:30)
            const now = new Date();
            const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
            const dd = String(ist.getDate()).padStart(2, '0');
            const mm = String(ist.getMonth() + 1).padStart(2, '0');
            const yy = String(ist.getFullYear()).slice(-2);
            const HH = String(ist.getHours()).padStart(2, '0');
            const MM = String(ist.getMinutes()).padStart(2, '0');
            return `${dd}/${mm}/${yy}, ${HH}:${MM}`;
        }
    }

    async function postToSheetDB(payload) {
        // SheetDB expects { "data": [ { ... } ] } for POST (usually)
        const body = { data: [ payload ] };

        const resp = await fetch(SHEETDB_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            const text = await resp.text().catch(()=>null);
            throw new Error(`HTTP ${resp.status} ${resp.statusText} ${text ? ' - ' + text : ''}`);
        }
        return resp.json().catch(()=>null);
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        statusMsg.textContent = '';
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';

        // collect values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const datetime = formatDateTimeForIndia(); // dd/mm/yy, HH:MM

        // very basic client-side validation
        if (!name || !email || !subject || !message) {
            statusMsg.style.color = 'crimson';
            statusMsg.textContent = 'Please fill all fields.';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        }

        // Prepare payload keys - choose column names you want in your Google Sheet / SheetDB
        // Example keys: name, email, subject, message, datetime
        const payload = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            datetime: datetime
        };

        try {
            await postToSheetDB(payload);
            statusMsg.style.color = 'green';
            statusMsg.textContent = 'Message sent successfully. Thank you!';
            form.reset();
        } catch (err) {
            console.error('SheetDB error:', err);
            statusMsg.style.color = 'crimson';
            statusMsg.textContent = 'Failed to send — please try again later.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
})();


// Add animation to project cards on scroll
// Section Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate child elements with delay
            if (entry.target.id === 'skills') {
                animateSkills();
            } else if (entry.target.id === 'projects') {
                animateProjects();
            } else if (entry.target.id === 'contact') {
                animateContact();
            }
        }
    });
}, observerOptions);





// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});





// Skills grid animation
function animateSkills() {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.classList.add('visible');
        }, index * 200);
    });
}

// Projects grid animation
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
}

// Contact section animation
function animateContact() {
    const contactItems = document.querySelectorAll('.contact-item-simple');
    const contactForm = document.querySelector('.contact-form-simple');
    
    contactItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 150);
    });
    
    setTimeout(() => {
        contactForm.classList.add('visible');
    }, 600);
}

// Skill bars animation
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';
        
        setTimeout(() => {
            level.style.transition = 'width 1.5s ease-in-out';
            level.style.width = width;
        }, 500);
    });
}

// Initialize when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Page load animations
document.addEventListener('DOMContentLoaded', function() {
    // Add visible class to hero section immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
    
    // Add visible class to about section if it's in view
    const aboutSection = document.getElementById('about');
    if (aboutSection && isElementInViewport(aboutSection)) {
        aboutSection.classList.add('visible');
    }
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


























  // Sample data for search functionality
        const searchData = [
            {
                title: "Home Section",
                content: "Welcome to my portfolio website. Learn more about my skills and projects.",
                section: "home"
            },
            {
                title: "About Me",
                content: "I'm a full-stack developer with 3+ years of experience building web applications.",
                section: "about"
            },
            {
                title: "Skills",
                content: "HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB, Git, Responsive Web Design",
                section: "skills"
            },
            {
                title: "Projects",
                content: "E-commerce Website, Task Management App, Weather Application, Portfolio Website",
                section: "projects"
            },
            {
                title: "Contact Information",
                content: "Reach out via email at susheel@example.com or connect on LinkedIn and GitHub.",
                section: "contact"
            },
            {
                title: "Web Development",
                content: "Building modern, responsive websites using the latest technologies and best practices.",
                section: "skills"
            },
            {
                title: "JavaScript Programming",
                content: "Expertise in JavaScript for both frontend and backend development.",
                section: "skills"
            },
            {
                title: "React Applications",
                content: "Creating dynamic user interfaces with React and related libraries.",
                section: "projects"
            },
            {
                title: "Node.js Backend",
                content: "Developing server-side applications and APIs using Node.js and Express.",
                section: "skills"
            },
            {
                title: "Portfolio Website",
                content: "This responsive portfolio website built with HTML, CSS, and JavaScript.",
                section: "projects"
            }
        ];

        // Get DOM elements
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const searchResults = document.getElementById('searchResults');
        const resultsList = document.getElementById('resultsList');
        const mainContent = document.querySelector('.main-content');

        // Function to perform search
        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            // Clear previous results
            resultsList.innerHTML = '';
            
            // If search term is empty, hide results and show main content
            if (searchTerm === '') {
                searchResults.style.display = 'none';
                mainContent.style.display = 'block';
                return;
            }
            
            // Filter data based on search term
            const filteredResults = searchData.filter(item => {
                return item.title.toLowerCase().includes(searchTerm) || 
                       item.content.toLowerCase().includes(searchTerm);
            });
            
            // Display results
            if (filteredResults.length > 0) {
                filteredResults.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    
                    const title = document.createElement('div');
                    title.className = 'result-title';
                    title.textContent = result.title;
                    
                    const snippet = document.createElement('div');
                    snippet.className = 'result-snippet';
                    snippet.textContent = result.content;
                    
                    // Add click event to scroll to section
                    resultItem.addEventListener('click', function() {
                        document.getElementById(result.section).scrollIntoView({
                            behavior: 'smooth'
                        });
                        searchResults.style.display = 'none';
                        mainContent.style.display = 'block';
                    });
                    
                    resultItem.appendChild(title);
                    resultItem.appendChild(snippet);
                    resultsList.appendChild(resultItem);
                });
                
                searchResults.style.display = 'block';
                mainContent.style.display = 'none';
            } else {
                // Show no results message
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'No results found for "' + searchTerm + '"';
                resultsList.appendChild(noResults);
                searchResults.style.display = 'block';
                mainContent.style.display = 'none';
            }
        }

        // Function to toggle mobile menu
        function toggleMenu() {
            const nav = document.querySelector('.nav');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (mobileMenu) {
                mobileMenu.remove();
            } else {
                const menuDiv = document.createElement('div');
                menuDiv.className = 'mobile-menu';
                
                // Clone nav links
                const navLinks = document.querySelector('.nav-links').cloneNode(true);
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        menuDiv.remove();
                    });
                });
                
                // Clone auth buttons
                const authButtons = document.querySelector('.auth-buttons').cloneNode(true);
                
                menuDiv.appendChild(navLinks);
                menuDiv.appendChild(authButtons);
                nav.appendChild(menuDiv);
            }
        }

        // Event listeners
        searchButton.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-box') && !event.target.closest('.search-results')) {
                if (searchInput.value.trim() === '') {
                    searchResults.style.display = 'none';
                    mainContent.style.display = 'block';
                }
            }
        });