// Load projects dynamically from JSON file
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('projects-container');
    if (!container) return;

    data.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.url}" class="btn" target="_blank">View Project</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading project data:', error));
