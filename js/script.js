const STORAGE_KEY = 'workers';
const LIMIT_ROOM = 5;
let ROLE = "tous";
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
const InputPhoto = document.getElementById('photo');
const PhotoUser = document.getElementById('imageUser');
champRecherche.addEventListener('input' , ()=>{
  loadUnsinedWorkers(champRecherche.value)
})

InputPhoto.addEventListener("input", () => {
  const url = InputPhoto.value.trim();

  if (url.lenght === 0) {
    PhotoUser.src = "./assets/userIcon.webp";
    return;
  }

  PhotoUser.src = url;

  PhotoUser.onerror = () => {
    PhotoUser.src = "./assets/userIcon.webp";
  };
});


let model = document.getElementById("modalIntegrerWorker")
let btnFermer = document.getElementById("btnFermerAllWorkers")
  btnFermer.addEventListener("click",()=>{
    model.classList.add("hidden")
  })


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
  experience.querySelector('.btn-supprimer-exp').addEventListener('click', () => experience.remove());

  return experience;
}

btnAjouterExperience.addEventListener('click', () => {
  conteneurExperiences.appendChild(creerExperience());
});


function carteWorkerInfo(e) {
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
function carteChangerRoom(e,nouvelleRoom) {
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
    if(document.getElementById(nouvelleRoom).children.length <= LIMIT_ROOM){
      let data = getsWorkers();
      data.find(w=>w.id == e.id).currentRoom = nouvelleRoom
      saveWorkers(data)
      RemplirRoom(["conference","staffRoom","reception","serveurs","securite","archives"])
      loadUnsinedWorkers()
      article.remove()
    }else{
      alert("roomest bien remplir")
      model.classList.add("hidden")
    }
    
  })
  return article
}

function carteRounded(e) {
  const article = document.createElement("article");
  const btnDelete = document.createElement("button");

  article.className = `relative flex items-center bg-white shadow-md rounded-xl lg:px-2 lg:py-1 cursor-pointer transition hover:shadow-lg w-fit min-w-[7px] sm:min-w-[7px] lg:min-w-[120px]`;

  btnDelete.className = ` absolute -top-1.5 -right-1.5 bg-red-500 text-white  w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex items-center justify-center  rounded-full  text-[6px] sm:text-[8px] lg:text-[10px] font-bold  hover:bg-red-600 transition`;
  btnDelete.textContent = "X";

  article.innerHTML = `
    <img src="${e.photo}" alt="Photo de ${e.prenom} ${e.nom}" class="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover shadow">
    <div class="hidden lg:flex flex-col leading-tight">
      <h2 class="font-semibold text-[12px] truncate max-w-[10ch] text-gray-900">${e.nom}</h2>
      <p class="text-[10px]  text-gray-500">${e.role}</p>
    </div>
  `;
  article.appendChild(btnDelete);
  btnDelete.addEventListener("click",(event)=>{
    event.stopPropagation()
    let data = getsWorkers()
    data.find(w=>w.id ===e.id ).currentRoom = "unsigned"
    saveWorkers(data)
    RemplirRoom(["conference","staffRoom","reception","serveurs","securite","archives"])
    loadUnsinedWorkers()
    article.remove()
  })
  article.addEventListener('click',()=>{
    ouvrirModelDetails(e)
  })
  return article
}


function loadUnsinedWorkers(search = "") {
  const data = getsWorkers();
  listeEmployes.innerHTML ="";
  if(data.lenght === 0){
    listeEmployes.innerHTML =`<p class="text-sm text-slate-400">Aucun workers.</p>`;
  }else{
    if(ROLE === "tous"){
      data.filter(w=>w.currentRoom === "unsigned").forEach(workers => {
        let card = carteWorkerInfo(workers);
        listeEmployes.append(card)
      });
    }else{
      if(search.length === 0){
          data.filter(w=>w.currentRoom === "unsigned" && w.role.toLowerCase() === ROLE.toLowerCase()).forEach(workers => {
            let card = carteWorkerInfo(workers);
            listeEmployes.append(card)
          })
      }else{
          data.filter(w=>w.currentRoom === "unsigned" && w.role.toLowerCase() === ROLE.toLowerCase()).forEach(workers => {
            if(workers.nom.toLowerCase().includes(search.toLowerCase())){
              let card = carteWorkerInfo(workers);
              listeEmployes.append(card)
            }
            
          })
      }
      
    }
  }
  
  
}



form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const photo = PhotoUser.src
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
  let currentRoom = "unsigned"
  let id = Date.now()
  const worker = { id,nom, prenom, email, phone, photo, role, experiences , currentRoom };

  const data = getsWorkers();
  data.push(worker);
  saveWorkers(data);

  loadUnsinedWorkers(); // refresh
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
    document.getElementById("detailsSallonActuel").textContent = worker.currentRoom;
    const expList = document.getElementById("detailsExperiences");
    expList.innerHTML = "";

    if (worker.experiences.length > 0) {
        worker.experiences.forEach(exp => {
            const div = document.createElement("div");
            div.setAttribute("class","border border-black flex flex-col items-center")
            const pEntreprise = document.createElement("p");
            pEntreprise.textContent = `entreprise:${exp.entreprise}`
            const pDateFrom = document.createElement("p");
            pDateFrom.textContent = `From:${exp.from}`
            const pDateTo = document.createElement("p");
            pDateTo.textContent = `To:${exp.to}`
            div.appendChild(pEntreprise)
            div.appendChild(pDateFrom)
            div.appendChild(pDateTo)
            expList.appendChild(div);
        });
    } else {
        expList.innerHTML = "<li>Aucune expérience renseignée.</li>";
    }
}

document.getElementById("btnFermerDetails").onclick =() => {
    document.getElementById("modalDetailsEmploye").classList.add("hidden");
};
document.getElementById("btnFermerDetails2").onclick =() => {
    document.getElementById("modalDetailsEmploye").classList.add("hidden");
};

function filterWorkers(button ,ListRole, nouvelleRoom){
  let model = document.getElementById("modalIntegrerWorker")
  let container = document.getElementById("contenairWorker")
  
  button.addEventListener("click", ()=>{
    if(document.getElementById(nouvelleRoom).children.length <= LIMIT_ROOM){
        let data = getsWorkers();
        container.innerHTML = "";
        model.classList.remove("hidden")
        ListRole.forEach(role=>{
          data.filter(w=>w.role === role && w.currentRoom === "unsigned").forEach(w=>{
            container.appendChild(carteChangerRoom(w,nouvelleRoom))
          })
        })
    }else{
      alert("room et complete")
    }
      
  })
}




function RemplirRoom(listContainer){
  let data  =  getsWorkers();
  listContainer.forEach((container,index)=>{
    let containere = document.getElementById(container)
    containere.innerHTML = ""
    let listFiltrer = data.filter(w=>w.currentRoom.toLowerCase().trim() === container.toLowerCase().trim())
    listFiltrer.forEach(w=>{
      containere.append(carteRounded(w))
    })
    if(index > 1){
      if(containere.children.length === 0){
          containere.parentElement.classList.add("bg-red-500/20")
          containere.parentElement.classList.add("hover:bg-red-500/20")
      }else{
          containere.parentElement.classList.remove("bg-red-500/20")
          containere.parentElement.classList.remove("hover:bg-red-500/20")
      }
    }
  })
}

function Filtre(){
  let listbtn = document.querySelectorAll(".btn-filter")
  listbtn.forEach(btn=>{
    btn.addEventListener("click",(event)=>{
      listbtn.forEach(bttn=>{
        bttn.classList.remove("bg-amber-600")
        bttn.classList.remove("bg-slate-800")
    })
      btn.classList.add("bg-amber-600")
      ROLE = btn.dataset.id
      loadUnsinedWorkers()
    })
  })
}
Filtre()

filterWorkers(document.getElementById("btn-zone-conference"),["receptionniste","it","securite","Manager","Nettoyage","autre"],"conference")
filterWorkers(document.getElementById("btn-zone-reception"),["receptionniste","Manager","Nettoyage"],"reception")
filterWorkers(document.getElementById("btn-zone-serveurs"),["it","Manager","Nettoyage"],"serveurs",)
filterWorkers(document.getElementById("btn-zone-securite"),["Manager","securite","Nettoyage"],"securite")
filterWorkers(document.getElementById("btn-zone-archives"),["Manager"],"archives")
filterWorkers(document.getElementById("btn-zone-staff-room"),["receptionniste","it","securite","Manager","Nettoyage","autre"],"staffRoom")



RemplirRoom(["conference","staffRoom","reception","serveurs","securite","archives"])



loadUnsinedWorkers();
