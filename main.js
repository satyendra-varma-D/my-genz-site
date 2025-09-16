// Load portfolio data
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    // Hero
    document.getElementById("name").textContent = data.name;
    document.getElementById("title").textContent = data.title;
    document.getElementById("tagline").textContent = data.tagline;

    // About
    document.getElementById("about-text").textContent = data.about;

    // Skills
    const skillsList = document.getElementById("skills-list");
    data.skills.forEach(skill => {
      const div = document.createElement("div");
      div.className = "p-4 bg-gray-800 rounded-lg shadow-lg";
      div.textContent = skill;
      skillsList.appendChild(div);
    });

    // Projects
    const projectsList = document.getElementById("projects-list");
    data.projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "p-6 bg-gray-800 rounded-lg shadow-lg";
      card.innerHTML = `<h3 class="text-xl font-bold mb-2">${p.title}</h3>
                        <p class="text-gray-300">${p.desc}</p>`;
      projectsList.appendChild(card);
    });

    // Contact
    const contactLinks = document.getElementById("contact-links");
    contactLinks.innerHTML = `
      <a href="${data.contact.linkedin}" target="_blank" class="hover:text-blue-400">LinkedIn</a>
      <a href="${data.contact.github}" target="_blank" class="hover:text-blue-400">GitHub</a>
      <a href="mailto:${data.contact.email}" class="hover:text-blue-400">Email</a>
    `;

    // GSAP Animations
    gsap.from("#name", { duration: 1.2, y: -50, opacity: 0, ease: "bounce" });
    gsap.from("#title", { duration: 1, y: 50, opacity: 0, delay: 0.5 });
    gsap.from("#tagline", { duration: 1, opacity: 0, delay: 1 });

    gsap.utils.toArray("section").forEach(section => {
      gsap.from(section.children, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
    });
  })
  .catch(err => console.error("Error loading data:", err));
