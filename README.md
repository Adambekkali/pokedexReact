🧪 Pokédex React – Application Web
Une application web développée avec React et TypeScript affichant des Pokémons issus d’une API publique. Elle propose un moteur de recherche avancé et une interface utilisateur intuitive.

🚀 Fonctionnalités
✅ Affichage dynamique des Pokémons depuis l’API publique :
https://pokebuildapi.fr/api/v1/pokemon

✅ Moteur de recherche avancé avec une syntaxe personnalisée :

name contain "Pika"

type include "Feu"

id > 100

✅ Navigation fluide avec React Router :
Accès aux détails de chaque Pokémon via une page dédiée.

📦 Stack technique
⚛️ React 18

🟦 TypeScript

🧭 React Router DOM

🎨 CSS inline / composants stylisés

🌐 API publique PokéBuild

🧰 Installation & Lancement
bash
Copier
Modifier
git clone https://github.com/adam-bekkali/test-cyberdian-pokemon.git
cd pokedex
npm install
npm run dev
➡️ Accède ensuite à l'application sur :
http://localhost:5173

🗂 Structure du projet
src/
├── components/      # Composants réutilisables (ex: StyledBox)
├── pages/           # Pages principales (ex: PokemonDetails)
├── types/           # Déclarations des types TypeScript
├── utils/           # Fonctions utilitaires (parsing du moteur de recherche)
├── App.tsx          # Routing principal de l'application
└── main.tsx         # Point d’entrée de l’application React
💬 Remarques
Le projet est conçu pour être modulaire et facilement extensible.

Le moteur de recherche est pensé pour permettre l’ajout de nouvelles règles avec simplicité.

👨‍💻 Auteur
Adam Bekkali
GitHub – @adam-bekkali
