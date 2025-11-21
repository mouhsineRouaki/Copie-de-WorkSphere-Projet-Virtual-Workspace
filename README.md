# WorkSphere – Virtual Workspace

Une application web innovante dédiée à la **gestion visuelle et interactive du personnel** au sein des espaces de travail de l’entreprise WorkSphere.

---

## 🧩 Contexte

Ce projet est réalisé dans le cadre de la formation **[2023] Développeur web et web mobile**.  
L’objectif est de concevoir une application front-end permettant :

- de **visualiser** les employés sur un **plan d’étage**,
- de **gérer dynamiquement** leurs affectations,
- de **respecter des règles métier** liées aux rôles et aux zones autorisées,
- tout en proposant une **interface moderne, responsive et intuitive** (HTML, CSS, JavaScript).

> **Période du projet :** du 14/11/2025 au 21/11/2025 (5 jours en autonomie).

---

## 🔍 Aperçu du projet

WorkSphere est une application web permettant de :

- **ajouter, déplacer et supprimer** des employés,
- les organiser sur un **plan d’étage interactif**,
- contrôler l’accès à chaque zone en fonction du **rôle**,
- consulter rapidement les **informations détaillées** de chaque employé.

Une version déployée est accessible en ligne (production) :

👉 **Demo en ligne :** https://projet-virtual-workspace.vercel.app

---

## 🎯 Objectifs principaux

1. **Gestion visuelle du personnel**  
   Représenter les employés sur un plan d’étage interactif, avec une vue claire des zones occupées et vides.

2. **Respect des règles métier**  
   Empêcher l’affectation d’un employé dans une zone non autorisée selon son rôle.

3. **Expérience utilisateur moderne (UX/UI)**  
   Interface fluide, responsive, avec animations légères, icônes et code couleur.

4. **Qualité technique**  
   - HTML5 sémantique  
   - CSS3 (Flexbox, Grid, media queries)  
   - JavaScript Vanilla structuré  
   - Bonnes pratiques (accessibilité, performance, SEO de base)

---

## 🧑‍💼 Fonctionnalités – Gestion des employés

- **Liste des employés non assignés** : section latérale “**Unassigned Staff**”.
- **Bouton “Add New Worker”** ouvrant une **modale d’ajout** avec les champs :
  - Nom  
  - Rôle  
  - Photo (URL) avec **prévisualisation**  
  - Email  
  - Téléphone  
  - Expériences professionnelles (formulaire dynamique permettant d’ajouter plusieurs expériences).
- **Validation des données** :
  - Validation via **REGEX** pour les champs (email, téléphone, etc.).
  - Vérification des **dates de début/fin** de chaque expérience (date de début `<` date de fin).
- **Suppression / désassignation** :
  - Bouton ❌ sur chaque carte employé pour le retirer d’une zone et le renvoyer dans “Unassigned”.
- **Profil détaillé** :
  - Clic sur un employé → ouverture d’un **profil détaillé** avec :
    - photo grand format,
    - nom, rôle,
    - email, téléphone,
    - expériences,
    - zone actuelle.

---

## 🗺️ Plan d’étage interactif

Le bâtiment comporte **6 zones** :

1. Salle de conférence  
2. Réception  
3. Salle des serveurs  
4. Salle de sécurité  
5. Salle du staff  
6. Salle d’archives  

Pour chaque zone :

- Affichage du **nom de la zone**.
- **Bouton “+”** pour ajouter un employé éligible.
- Mise en avant des **zones obligatoires vides** en rouge pâle (sauf salle de conférence & salle du personnel).
- **Limite du nombre d’employés** par zone (paramétrable dans le code).

Le plan s’appuie sur une image du bâtiment (`plan.jpg` / `plan.jpeg`) stylisée via CSS.

---

## 🧠 Règles métier (règles d’accès par rôle)

- **Réception →** uniquement les **Réceptionnistes**
- **Salle des serveurs →** uniquement les **Techniciens IT**
- **Salle de sécurité →** uniquement les **Agents de sécurité**
- **Manager →** peut être affecté **partout**
- **Nettoyage →** peut être affecté partout **sauf** à la **Salle d’archives**
- **Autres rôles →** accès libre **sauf** aux zones restreintes ci-dessus

Ces règles sont implémentées côté **JavaScript** :  
l’application filtre automatiquement la liste des employés disponibles pour chaque zone.

---

## 📱 Responsive design & UX/UI

L’interface est conçue pour être **entièrement responsive** :

- **Portrait :**
  - Grand écran d’ordinateur : `> 1280px`
  - Petit écran d’ordinateur : `1024px – 1279px`
  - Tablette : `768px – 1023px`
  - Mobile : `≤ 767px`
- **Paysage :**
  - Mobile : `768px – 1023px`
  - Tablette : `1024px – 1279px`

Techniques utilisées :

- **Flexbox** et **CSS Grid** pour la mise en page
- **Media queries** pour l’adaptation aux différentes tailles d’écran
- Design moderne :
  - formes arrondies,
  - boutons colorés,
  - palette cohérente,

---

## ⭐ Bonus (fonctionnalités optionnelles prévues / possibles)

Les bonus suivants peuvent être implémentés (ou le sont, selon l’avancement du projet) :

- **Recherche / filtrage** d’employés par nom ou rôle.
- **Sauvegarde automatique** de l’état du plan via `localStorage`.
- Mode **reset place ** :
  - reset automatique des employés dans les zones unsigned.

---

## 🧱 Architecture du projet

Organisation des fichiers (simplifiée) :

```text
.
├── index.html
├── assets/
│   └── images, icônes, plan d’étage (plan.jpg / plan.jpeg, etc.)
├── css/
│   └── styles principaux (output.css m, input.csss)
├── js/
│   └── logique métier + manipulation du DOM (zones, employés, modales, etc.)
├── data/
│   └── données statiques (rôles)
├── package.json
└── .gitignore
