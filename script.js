/* ============================================================
   script.js — dynamic behaviour: loads data.json, draws particles,
   radar chart, skill bars, typing, project modal and small network.
   Drop into repo root along with index.html and style.css.
   ============================================================ */

/* ----------------- Helpers ----------------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ----------------- Load data.json and initialize ----------------- */
let portfolio = {};
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    portfolio = data;
    initializeAll();
  })
  .catch(err => {
    console.error('Failed to load data.json — falling back to embedded defaults', err);
    portfolio = {
      name: "Pavan",
      title: "Techno-Functional Consultant | ML & Analytics",
      tagline: "Business + Data + Product",
      about: "I bridge business and technology — ML, analytics, product thinking and supply chain optimization.",
      skills: [
        { name: "Python", value: 95 },
        { name: "Machine Learning", value: 88 },
        { name: "Data Visualization", value: 92 },
        { name: "Supply Chain", value: 86 },
        { name: "SAP", value: 78 },
        { name: "Product", value: 80 }
      ],
      projects: [
        { title: "AI AgriTech", desc: "Crop disease detection", details:"Worked on dataset, model and deployment", image: "" },
        { title: "Scrap Management", desc: "Recycling platform", details:"Fullstack app, routes & ML", image: "" }
      ],
      contact: { linkedin: "#", github: "#", email: "you@example.com" }
    };
    initializeAll();
  });

function initializeAll(){
  populateBasic();
  startTypingEffect();
  buildSocials();
  initParticles();
  initMiniNetwork();
  renderSkills();
  buildProjects();
  buildContact();
  initScrollReveal();
}

/* ----------------- Populate basic text ----------------- */
function populateBasic(){
  const name = portfolio.name || "Pavan";
  const title = portfolio.title || portfolio.tagline || "Tech + Data";
  document.title = `${name} | Portfolio`;
  $('#logo').textContent = (portfolio.shortName || name.split(' ')[0] || name);
  $('#typingName').textContent = name;
  $('#typingTitle').textContent = title;
  $('#aboutText').textContent = portfolio.about || "—";
  $('#footerText').textContent = `© ${new Date().getFullYear()} — ${name}`;
  // hero stat chips (simple)
  const chips = [
    `${portfolio.experience || "N/A"} yrs experience`,
    `${portfolio.projects ? portfolio.projects.length : 0} projects`,
    `${portfolio.skills ? portfolio.skills.length : 0} skills`
  ];
  $('#heroStats').innerHTML = chips.map(c=>`<div class="stat-chip">${c}</div>`).join('');
}

/* ----------------- Socials (icon-only) ----------------- */
function buildSocials(){
  const scont = $('#socialInline');
  const contact = portfolio.contact || {};
  const items = [
    { cls:'linkedin', href: contact.linkedin || '#', icon: svgLinkedIn() },
    { cls:'github', href: contact.github || '#', icon: svgGitHub() },
    { cls:'mail', href: `mailto:${contact.email||''}`, icon: svgMail() }
  ];
  scont.innerHTML = items.map(it=>{
    return `<a class="icon-btn ${it.cls}" href="${it.href}" target="_blank" rel="noopener noreferrer">${it.icon}</a>`;
  }).join('');

  // footer/contact actions
  $('#contactActions').innerHTML = items.map(it=>`<a class="icon-btn ${it.cls}" href="${it.href}" target="_blank">${it.icon}</a>`).join('');
}

/* ----------------- Typing effect for title line (simple loop) ----------------- */
function startTypingEffect(){
  const el = $('#typingTitle');
  if(!el) return;
  const phrases = (portfolio.tagline ? [portfolio.tagline] : [
    'Python · ML · Data · Visualization',
    'Supply Chain · SAP · Business Analysis',
    'Product thinking · Deployment · Dashboards'
  ]);
  let i=0, j=0, forward=true, pause=0;
  el.textContent = '';
  function step(){
    const str = phrases[i];
    if(forward){
      el.textContent = str.slice(0, ++j);
      if(j === str.length){ forward=false; pause=20; }
    } else {
      if(pause>0){ pause--; }
      else { el.textContent = str.slice(0, --j); if(j===0){ forward=true; i=(i+1)%phrases.length; }} 
    }
    setTimeout(step, forward?40:24);
  }
  step();
}

/* ----------------- Particles canvas (subtle) ----------------- */
function initParticles(){
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const N = Math.round((W*H)/70000); // scale with screen
  const pts = [];
  for(let i=0;i<N;i++){
    pts.push({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, r:Math.random()*1.8+0.6 });
  }
  let mx = -9999, my = -9999;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
  window.addEventListener('resize', ()=>{ W=canvas.width=innerWidth; H=canvas.height=innerHeight; });

  function draw(){
    ctx.clearRect(0,0,W,H);
    // lines
    for(let i=0;i<pts.length;i++){
      const a=pts[i];
      for(let j=i+1;j<pts.length;j++){
        const b=pts[j];
        const dx=a.x-b.x, dy=a.y-b.y, d=dx*dx+dy*dy;
        if(d<14000){
          const alpha = 0.08*(1 - d/14000);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(165, 255, 235, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    // points
    pts.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      // mouse repulse
      const dx = p.x - mx, dy = p.y - my, dd = dx*dx+dy*dy;
      if(dd < 40000){
        p.x += (dx/Math.sqrt(dd))*0.6;
        p.y += (dy/Math.sqrt(dd))*0.6;
      }
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,245,212,0.9)';
      ctx.globalAlpha = 0.85;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ----------------- Mini network (decorative) ----------------- */
function initMiniNetwork(){
  const canvas = document.getElementById('miniNetwork');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; }
  resize(); window.addEventListener('resize', resize);
  const nodes = [];
  for(let i=0;i<12;i++){
    nodes.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4 });
  }
  function anim(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // edges
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const d2 = (a.x-b.x)**2 + (a.y-b.y)**2;
        if(d2 < 90000){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(120,220,200,${1 - d2/90000})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n=>{
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > canvas.width) n.vx*=-1;
      if(n.y < 0 || n.y > canvas.height) n.vy*=-1;
      ctx.beginPath();
      ctx.fillStyle = '#00F5D4';
      ctx.arc(n.x,n.y,2.4,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(anim);
  }
  anim();
}

/* ----------------- Skills radar using Chart.js and skill lines ----------------- */
function renderSkills(){
  const skills = (portfolio.skills && Array.isArray(portfolio.skills)) ? portfolio.skills : defaultSkillObjs();
  // Chart data expectation: if skills are strings -> map default values (not ideal). Prefer skill objects [{name,value}]
  const labels = skills.map(s => typeof s === 'string' ? s : s.name);
  const values = skills.map(s => typeof s === 'string' ? 75 : (s.value ?? 75));
  // radar
  const ctx = document.getElementById('skillsRadar');
  if(ctx){
    const radar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Proficiency',
          data: values,
          borderColor: '#00F5D4',
          backgroundColor: 'rgba(0,245,212,0.12)',
          pointBackgroundColor: '#FF4ECD',
          pointRadius: 4,
          borderWidth: 2
        }]
      },
      options: {
        responsive:true,
        scales: {
          r: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            angleLines: { color: 'rgba(255,255,255,0.03)' },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: { color: 'rgba(255,255,255,0.4)', stepSize: 20 }
          }
        },
        plugins:{ legend:{ display:false } }
      }
    });
  }

  // Build skill bars on right
  const right = $('#skillsList');
  right.innerHTML = '';
  skills.forEach(s=>{
    const name = (typeof s === 'string')? s : s.name;
    const value = (typeof s === 'string')? 75 : (s.value ?? 75);
    const el = document.createElement('div');
    el.className = 'skill-line';
    el.innerHTML = `
      <div class="skill-name">${name}</div>
      <div class="skill-bar"><div class="skill-fill" style="width:0%; background: linear-gradient(90deg, ${adjustColor(value)}, rgba(255,255,255,0.02));"></div></div>
      <div style="width:50px; text-align:right; color:var(--muted); font-weight:600">${value}%</div>
    `;
    right.appendChild(el);
    // animate fill
    requestAnimationFrame(()=> {
      const fill = el.querySelector('.skill-fill');
      setTimeout(()=> { fill.style.transition='width 900ms var(--ease)'; fill.style.width = value + '%'; }, 100);
    });
  });
}
function defaultSkillObjs(){
  return ["Python","Machine Learning","Tableau","Power BI","Supply Chain","Business Analysis"].map((n,i)=>({name:n, value: 80 - i*2}));
}
function adjustColor(val){
  // returns gradient color based on value
  if(val>85) return '#00F5D4';
  if(val>70) return '#7AF0C9';
  if(val>55) return '#FFD166';
  return '#FF8E8E';
}

/* ----------------- Projects grid + modal ----------------- */
function buildProjects(){
  const grid = $('#projectsGrid');
  grid.innerHTML = '';
  const projects = portfolio.projects || [];
  projects.forEach((p, idx)=>{
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `<h3>${p.title}</h3><p style="color:var(--muted)">${p.desc || ''}</p>`;
    card.addEventListener('click', ()=> openProjectModal(p));
    grid.appendChild(card);
  });
}
function openProjectModal(project){
  const modal = $('#projectModal');
  const content = $('#modalContent');
  content.innerHTML = `
    <h2 style="color:var(--accent)">${project.title}</h2>
    <p style="color:var(--muted)">${project.desc || ''}</p>
    <div style="margin-top:12px; color:#dbe9ef">${project.details || 'No further details provided.'}</div>
    ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width:100%; border-radius:8px; margin-top:12px">` : ''}
    ${project.link ? `<div style="margin-top:14px"><a href="${project.link}" target="_blank" class="cta primary">Open Demo</a></div>` : ''}
  `;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
$('#modalClose')?.addEventListener?.('click', ()=>{ $('#projectModal').classList.remove('show'); $('#projectModal').setAttribute('aria-hidden','true'); });

/* close modal when clicking outside inner panel */
$('#projectModal')?.addEventListener?.('click', (e)=>{ if(e.target === $('#projectModal')){ $('#projectModal').classList.remove('show'); $('#projectModal').setAttribute('aria-hidden','true'); } });

/* ----------------- Contact area ----------------- */
function buildContact(){
  $('#contactText').textContent = `Email: ${portfolio.contact?.email || '—'} — LinkedIn & GitHub links available.`;
}

/* ----------------- scroll reveal (simple) ----------------- */
function initScrollReveal(){
  const observers = document.querySelectorAll('.section, .project-card, .card');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.style.transform='translateY(0)', e.target.style.opacity=1, e.target.style.transition='all 600ms var(--ease)';
    });
  }, { threshold:0.12 });
  observers.forEach(el=>{
    el.style.opacity=0; el.style.transform='translateY(18px)';
    io.observe(el);
  });
}

/* ----------------- Mini SVG icons ----------------- */
function svgLinkedIn(){ return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.604 4.11 5.5 3 5.5C1.89 5.5 1 4.604 1 3.5C1 2.396 1.89 1.5 3 1.5C4.11 1.5 4.98 2.396 4.98 3.5ZM1.2 8.999H4.8V23H1.2V8.999ZM8.8 9H12.08V11.04H12.14C12.78 9.92 14.22 8.9 16.14 8.9C20.02 8.9 21 11.34 21 15.12V23H17.4V15.92C17.4 13.68 16.92 12.14 14.86 12.14C12.8 12.14 12.36 13.8 12.36 15.76V23H8.8V9Z" fill="white"/></svg>`;}
function svgGitHub(){ return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 .5C5.819.5.997 5.322.997 11.5c0 4.79 3.092 8.852 7.38 10.29.54.1.74-.234.74-.52 0-.26-.01-1.12-.014-2.03-3.002.662-3.63-1.45-3.63-1.45-.486-1.236-1.187-1.566-1.187-1.566-.97-.664.074-.652.074-.652 1.073.076 1.64 1.102 1.64 1.102.953 1.63 2.502 1.16 3.114.887.096-.69.373-1.16.679-1.428-2.397-.274-4.916-1.2-4.916-5.33 0-1.177.42-2.138 1.11-2.89-.113-.275-.48-1.383.105-2.882 0 0 .903-.289 2.957 1.103A10.19 10.19 0 0112 5.8c.915.004 1.836.124 2.696.363 2.05-1.392 2.95-1.103 2.95-1.103.588 1.5.222 2.608.11 2.883.693.752 1.11 1.71 1.11 2.89 0 4.14-2.525 5.052-4.928 5.32.383.335.724.999.724 2.012 0 1.452-.013 2.622-.013 2.978 0 .288.195.625.747.518C19.908 20.35 23 16.292 23 11.5 23 5.322 18.181.5 12 .5z" fill="white"/></svg>`;}
function svgMail(){ return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/></svg>`;}

/* ----------------- TinyUX: close modal with ESC ----------------- */
window.addEventListener('keydown', e=>{ if(e.key === 'Escape') { $('#projectModal')?.classList?.remove('show'); } });

/* ==========================
   End of script.js
   ========================== */
