const data={
  name:'Akash',
  date:'September 9, 2026',
  traits:[
    ['✦','The Energy','Somehow you bring energy into even the most random moments.'],
    ['☀','The Laughs','The best moments usually become funny stories later.'],
    ['◎','The Friendship','The kind of friendship that makes ordinary days better.'],
    ['↗','The Ambition','Keep chasing the things that make you excited about tomorrow.'],
    ['◈','The Vibe','Effortlessly yourself. That is the whole point.'],
    ['✧','The Memories','Here is to making a lot more of them this year.']
  ],
  memories:[
    {date:'A day to remember',title:'That random day',description:"One of those moments we'll always remember."},
    {date:'Somewhere between plans',title:'The good times',description:'The kind of day that did not need a plan.'},
    {date:'Still one of the favourites',title:'Another memory',description:'Add a real photo later and keep this one forever.'}
  ],
  wishes:[
    ['A friend','Keep smiling, keep growing, and keep being the person everyone enjoys having around.'],
    ['Someone who cares','May this year bring you good people, good surprises, and plenty of reasons to laugh.'],
    ['Your future self','You have a lot ahead of you. Go make it a year worth remembering.']
  ]
};

const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
const traits=$('#traits'),memories=$('#memories'),wishes=$('#wishes');

data.traits.forEach(([icon,title,description])=>{const el=document.createElement('article');el.className='trait';el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-expanded','false');el.innerHTML=`<div class="trait-icon">${icon}</div><h3>${title}</h3><p>${description}</p>`;const toggle=()=>{const open=el.classList.toggle('open');el.setAttribute('aria-expanded',String(open))};el.onclick=toggle;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}};traits.appendChild(el)});

data.memories.forEach((m,i)=>{const el=document.createElement('article');el.className='memory';el.tabIndex=0;el.innerHTML=`<div class="memory-visual">${i+1} · a moment</div><div class="memory-info"><small>${m.date}</small><h3>${m.title}</h3><p>${m.description}</p></div>`;const open=()=>openModal(m);el.onclick=open;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}};memories.appendChild(el)});

data.wishes.forEach(([from,msg])=>{const el=document.createElement('article');el.className='wish';el.innerHTML=`<p>“${msg}”</p><small>— ${from}</small>`;wishes.appendChild(el)});

function openModal(m){$('#modalDate').textContent=m.date;$('#modalTitle').textContent=m.title;$('#modalDescription').textContent=m.description;const visual=$('#modalVisual');visual.className='modal-visual';visual.textContent='A memory waiting for its photo ✦';if(m.image){visual.style.backgroundImage=`url('${m.image}')`;visual.textContent=''}$('#modal').hidden=false;$('#modalClose').focus()}
function closeModal(){$('#modal').hidden=true}
$('#modalClose').onclick=closeModal;$('#modal').onclick=e=>{if(e.target===$('#modal'))closeModal()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').hidden)closeModal()});

function celebrate(){const box=$('#confetti');for(let i=0;i<90;i++){const p=document.createElement('i');p.className='confetti-piece';p.style.left='50%';p.style.top='45%';p.style.setProperty('--x',`${(Math.random()-.5)*110}vw`);p.style.setProperty('--y',`${(Math.random()-.3)*110}vh`);p.style.transform=`rotate(${Math.random()*360}deg)`;p.style.background=`hsl(${Math.random()*55+325} 70% ${65+Math.random()*20}%)`;box.appendChild(p)}setTimeout(()=>box.replaceChildren(),2200)}

$('#openBtn').onclick=()=>{celebrate();$('#experience').hidden=false;$('#hero').classList.add('celebrated');$('#musicToggle').hidden=!musicAvailable;setTimeout(()=>document.querySelector('.message').scrollIntoView({behavior:'smooth',block:'start'}),350)};

const music=$('#music');let playing=false;let musicAvailable=false;
music.addEventListener('canplay',()=>{musicAvailable=true;$('#musicEnable').hidden=false});
music.addEventListener('error',()=>{musicAvailable=false;$('#musicEnable').hidden=true;$('#musicToggle').hidden=true});
async function startMusic(){if(!musicAvailable)return;try{await music.play();playing=true;$('#musicToggle').textContent='♫';$('#musicToggle').setAttribute('aria-label','Pause birthday music')}catch{playing=false}}
$('#musicEnable').onclick=()=>startMusic();
$('#musicToggle').onclick=()=>{if(playing){music.pause();playing=false;$('#musicToggle').textContent='♪';$('#musicToggle').setAttribute('aria-label','Play birthday music')}else startMusic()};

$('#blowBtn').onclick=()=>{const cake=$('#cake');cake.classList.add('off');$('#blowBtn').disabled=true;celebrate();setTimeout(()=>$('#cakeReveal').hidden=false,650)};
$('#oneMore').onclick=()=>$('#final').scrollIntoView({behavior:'smooth',block:'start'});
$('#replay').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});$('#experience').hidden=true;$('#cake').classList.remove('off');$('#cakeReveal').hidden=true;$('#blowBtn').disabled=false;$('#hero').classList.remove('celebrated');if(playing){music.pause();playing=false}$('#musicToggle').textContent='♪'};

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal-on-scroll').forEach(e=>observer.observe(e));

data.memories.forEach((m,i)=>{if(m.image){const v=memories.children[i]?.querySelector('.memory-visual');if(v){v.style.backgroundImage=`url('${m.image}')`;v.textContent=''}}});
