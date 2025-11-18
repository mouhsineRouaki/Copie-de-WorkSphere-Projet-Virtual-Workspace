const STORAGE_KEY = 'workers';



const modal = document.getElementById('modalEmploye');
const btnOuvrirForm = document.getElementById('btnOuvrirForm');
const btnFermerForm = document.getElementById('btnFermerForm');
const btnAnnuler = document.getElementById('btnAnnuler');
const form = document.getElementById('formEmploye');

const conteneurExperiences = document.getElementById('conteneurExperiences');
const btnAjouterExperience = document.getElementById('btnAjouterExperience');

const listeEmployes = document.getElementById('listeEmployes');
const champRecherche = document.getElementById('champRecherche');
const listeFiltres = document.getElementById('listeFiltres');


function getsWorkers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveWorkers(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ouvrirModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function fermerModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  form.reset();
  conteneurExperiences.innerHTML = '';
}

btnOuvrirForm.addEventListener('click', ouvrirModal);
btnFermerForm.addEventListener('click', fermerModal);
btnAnnuler.addEventListener('click', fermerModal);


function creerExperience() {
  const experience = document.createElement('div');
  experience.className = 'p-3 bg-slate-800/60 rounded space-y-2 experience';

  experience.innerHTML = `
    <div>
      <label class="block text-xs text-slate-300 mb-1">Entreprise</label>
      <input type="text" placeholder="Ex : OCP" class="w-full px-3 py-2 border rounded bg-transparent text-sm outline-none border-slate-700 focus:ring-2 focus:ring-amber-500" />
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="block text-xs text-slate-300 mb-1">De</label>
        <input type="date" class="w-full px-3 py-2 border rounded bg-transparent text-sm outline-none border-slate-700 focus:ring-2 focus:ring-amber-500" />
      </div>
      <div>
        <label class="block text-xs text-slate-300 mb-1">À</label>
        <input type="date" class="w-full px-3 py-2 border rounded bg-transparent text-sm outline-none border-slate-700 focus:ring-2 focus:ring-amber-500" />
      </div>
    </div>
    <div class="text-right">
      <button type="button" class="px-3 py-1.5 rounded bg-red-500/70 text-white text-xs hover:bg-red-600 btn-supprimer-exp">
        Supprimer
      </button>
    </div>
  `;

  // suppression experience
  experience.querySelector('.btn-supprimer-exp').addEventListener('click', () => bloc.remove());

  return experience;
}

btnAjouterExperience.addEventListener('click', () => {
  conteneurExperiences.appendChild(creerExperience());
});


function carteWorker(e) {
  let article = document.createElement("article")
  article.setAttribute("class","flex items-center gap-3 p-2 rounded border border-slate-800 bg-slate-900 cursor-pointer")
  article.innerHTML = `
      <img src="${e.photo}" alt="Photo de ${e.prenom} ${e.nom}" class="h-10 w-10 rounded-full object-cover">
      <div class="min-w-0">
        <h3 class="text-sm font-medium truncate">${(e.prenom)} ${(e.nom)}</h3>
        <p class="text-xs text-slate-400 truncate">${e.role}</p>
        <p class="text-xs text-slate-500 truncate">${e.email}</p>
      </div>
  `;
  article.addEventListener('click',()=>{
    ouvrirModelDetails(e)
  })
  return article
}

function loadWorkers() {
  const data = getsWorkers();
  listeEmployes.innerHTML ="";
  if(data.lenght === 0){
    listeEmployes.innerHTML =`<p class="text-sm text-slate-400">Aucun workers.</p>`;
  }else{
    data.forEach(workers => {
       let card = carteWorker(workers);
       listeEmployes.append(card)
    });
  }
  
  
}



form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const photo = document.getElementById('photo').value.trim();
  const role = document.getElementById('role').value.trim();

  // recuperation des experiece
  const experiences = [];
  conteneurExperiences.querySelectorAll('.experience').forEach((experience) => {
    const inputs = experience.querySelectorAll('input');
    const entreprise = inputs[0].value;
    const de = inputs[1].value;
    const a = inputs[2].value;
    let experiece={
      entreprise:entreprise,
      from:de,
      to:a
    }
    experiences.push(experiece);
  });

  const worker = { nom, prenom, email, phone, photo, role, experiences };

  const data = getsWorkers();
  data.push(worker);
  saveWorkers(data);

  loadWorkers(); // refresh
  fermerModal();
});
function ouvrirModelDetails(worker) {
    document.getElementById("modalDetailsEmploye").classList.remove("hidden");

    document.getElementById("detailsPhoto").src = worker.photo;
    document.getElementById("detailsNom").textContent = worker.nom;
    document.getElementById("detailsPrenom").textContent = worker.prenom;
    document.getElementById("detailsRole").textContent = worker.role;
    document.getElementById("detailsEmail").textContent = worker.email;
    document.getElementById("detailsPhone").textContent = worker.phone;

    const expList = document.getElementById("detailsExperiences");
    expList.innerHTML = "";

    if (worker.experiences.length > 0) {
        worker.experiences.forEach(exp => {
            const li = document.createElement("li");
            li.textContent = `${exp.entreprise} — ${exp.periode}`;
            expList.appendChild(li);
        });
    } else {
        expList.innerHTML = "<li>Aucune expérience renseignée.</li>";
    }
}

document.getElementById("btnFermerDetails").onclick =
document.getElementById("btnFermerDetails2").onclick =
() => {
    document.getElementById("modalDetailsEmploye").classList.add("hidden");
};


loadWorkers();
