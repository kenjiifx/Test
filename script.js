document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize projects from localStorage or use default data
    initializeProjects();
    
    // Set up event listeners
    setupEventListeners();
});

// Dark Mode Functions
function initializeDarkMode() {
    const darkModeToggles = [
        document.getElementById('darkModeToggle'),
        document.getElementById('darkModeToggle2')
    ];
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        darkModeToggles.forEach(toggle => {
            if (toggle) toggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        });
    }

    // Add click event listeners to both dark mode toggles
    darkModeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                darkModeToggles.forEach(t => {
                    if (t) t.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
                });
            });
        }
    });
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active');
}

// Project Management Functions
function initializeProjects() {
    const savedProjects = localStorage.getItem('projects');
    let projects;
    
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    } else {
        // Default projects
        projects = [
            {
                title: 'Testing-Arya',
                description: 'This is My Passion Project Building A Community For Cs Major Students.',
                contact: 'arya.bugs',
                fieldOfInterest: 'Tech'
            },
            {
                title: 'Web Development Bootcamp',
                description: 'A bootcamp for beginners to learn HTML, CSS, and JavaScript',
                contact: '@teenempower or https://teenempower.org',
                fieldOfInterest: 'undefined'
            }
        ];
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    displayProjects(projects);
}

function displayProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    projectsList.innerHTML = '';
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsList.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="field">Field of Interest: ${project.fieldOfInterest}</div>
        <div class="contact">Contact: ${project.contact}</div>
    `;
    return card;
}

function setupEventListeners() {
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', showAddProjectModal);
    }
}

function showAddProjectModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Add New Project</h2>
            <form class="project-form">
                <input type="text" placeholder="Project Title" required>
                <textarea placeholder="Project Description" required></textarea>
                <input type="text" placeholder="Field of Interest" required>
                <input type="text" placeholder="Contact Information" required>
                <button type="submit">Add Project</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
    };

    // Form submission
    const form = modal.querySelector('form');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        const newProject = {
            title: form.elements[0].value,
            description: form.elements[1].value,
            fieldOfInterest: form.elements[2].value,
            contact: form.elements[3].value
        };

        // Get existing projects
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        
        // Add new project
        projects.push(newProject);
        
        // Save to localStorage
        localStorage.setItem('projects', JSON.stringify(projects));
        
        // Update display
        displayProjects(projects);
        
        // Close modal
        modal.remove();
    };
}
