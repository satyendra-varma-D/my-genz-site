let portfolioData = {};

// Load data
fetch('data.json')
  .then(r => r.json())
  .then(data => { portfolioData = data; initializeContent(); })
  .catch(err => {
    console.error(err);
    portfolioData = { name: "Satyendra Varma DN", title: "Techno-Functional Consultant", about: "Loading...", skills:["Loading..."], projects:[{title:"Loading...", desc:"Loading..."}], contact:{linkedin:"#", github:"#", email:"contact@example.com"}};
    initializeContent();
  });

// Initialize
function initializeContent() {
  populateBasicInfo();
  createNodesNetwork();
  populateSkills();
  populateProjects();
  populateContact();
  animateOnScroll();

  setTimeout(() => typeWriter(document.getElementById('typingName'), portfolioData.name, 80), 500);
  setTimeout(() => typeWriter(document.getElementById('typingTitle'), portfolioData.title, 50), 2500);
}

// Populate basics
function populateBasicInfo() {
  document.title = portfolioData.name + " | Portfolio";
  document.getElementById('footerName').textContent = portfolioData.name;
  document.getElementById('aboutText').textContent = portfolioData.about;
}

// Skills
function populateSkills() {
  const grid = document.getElementById('skillsGrid'); grid.innerHTML='';
  portfolioData.skills.forEach((s,i)=>{ let c=document.createElement('div'); c.className='skill-card'; c.innerHTML=`<h3>${s}</h3>`; c.style.animationDelay=(i*0.1)+'s'; grid.appendChild(c); });
}

// Projects
function populateProjects() {
  const grid = document.getElementById('projectsGrid'); grid.innerHTML='';
  portfolioData.projects.forEach((p,i)=>{ let c=document.createElement('div'); c.className='project-card'; c.innerHTML=`<h3 class="project-title">${p.title}</h3><p style="color:#b0b0b0;line-height:1.6;">${p.desc}</p>`; c.style.animationDelay=(i*0.2)+'s'; grid.appendChild(c); });
}

// Contact
function populateContact() {
  const grid=document.getElementById('contactGrid'); grid.innerHTML='';
  const items = [{icon:'💼',label:'LinkedIn',url:portfolioData.contact.linkedin},{icon:'🚀',label:'GitHub',url:portfolioData.contact.github},{icon:'📧',label:'Email',url:`mailto:${portfolioData.contact.email}`}];
  items.forEach((i,j)=>{ let c=document.createElement('a'); c.className='contact-card'; c.href=i.url; if(i.label!=='Email') c.target='_blank'; c.innerHTML=`<span>${i.icon}</span><span>${i.label}</span>`; c.style.animationDelay=(j*0.1)+'s'; grid.appendChild(c); });
}

// Typing effect
function typeWriter(el,text,speed=100){ let i=0; el.innerHTML=''; function type(){ if(i<text.length){ el.innerHTML+=text.charAt(i); i++; setTimeout(type,speed);} } type(); }

// Scroll animation
function animateOnScroll(){
  document.querySelectorAll('.section-title, .glass-card, .skill-card, .project-card, .contact-card').forEach(el=>{
    const top = el.getBoundingClientRect().top, vis=150;
    if(top<window.innerHeight-vis) el.classList.add('animate');
  });
}

// Scroll & navbar
function updateScrollProgress(){ const sp=document.getElementById('scrollProgress'); const progress=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100; sp.style.width=progress+'%'; }
function handleNavbarScroll(){ const n=document.getElementById('navbar'); window.scrollY>50?n.classList.add('scrolled'):n.classList.remove('scrolled'); }
document.addEventListener('scroll',()=>{ animateOnScroll(); updateScrollProgress(); handleNavbarScroll(); });
document.querySelectorAll('a[href^="#"]').forEach(a=>{ a.addEventListener('click',e=>{ e.preventDefault(); const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth',block:'start'}); }); });

// Nodes network background
function createNodesNetwork(){
  const canvas=document.getElementById('networkCanvas'); const ctx=canvas.getContext('2d');
  let w=canvas.width=window.innerWidth, h=canvas.height=window.innerHeight;
  const nodes=[]; const nodeCount=80; const maxDist=200;
  for(let i=0;i<nodeCount;i++){ nodes.push({x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5, r:Math.random()*2+1}); }
  function animate(){ ctx.clearRect(0,0,w,h); nodes.forEach(n=>{ n.x+=n.vx; n.y+=n.vy; if(n.x<0||n.x>w) n.vx*=-1; if(n.y<0||n.y>h) n.vy*=-1; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle='rgba(0,255,136,0.8)'; ctx.fill(); }); for(let i=0;i<nodeCount;i++){ for(let j=i+1;j<nodeCount;j++){ const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy); if(d<maxDist){ ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.strokeStyle=`rgba(0,255,136,${1-d/maxDist})`; ctx.lineWidth=0.8; ctx.stroke(); } } } requestAnimationFrame(animate); } animate();
  window.addEventListener('resize',()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; });
}
