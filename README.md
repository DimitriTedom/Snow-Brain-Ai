# Snow Brain AI

Snow Brain AI est un chatbot avancé qui propose des réponses en temps réel en utilisant une technologie similaire à celle de Gemini. Ce projet a été conçu pour fournir une expérience utilisateur fluide et interactive grâce à un système de streaming de chat adaptatif.

## Fonctionnalités principales

- **Streaming en temps réel** : Les messages sont reçus et affichés en continu, offrant une expérience de chat plus naturelle.
- **Interface conviviale** : Une interface utilisateur intuitive pour une navigation facile.
- **Gestion des états** : Indicateurs de chargement et de streaming pour améliorer la compréhension de l'utilisateur.
- **Personnalisation** : Intégration de modèles IA avancés, notamment Google Gemini.

## Technologies utilisées

- **Frontend** : React avec TypeScript
- **Backend** : Intégration avec l'API Google Generative AI
- **CSS** : Module CSS pour le style
- **Gestion des états** : Hooks React comme `useState`

## Prérequis

Avant de lancer ce projet, assurez-vous d'avoir les éléments suivants :

- Node.js installé (à partir de la version 14.x ou supérieure)
- Un compte Google Cloud avec accès à l'API Google Generative AI
- Une clé API valide pour l'authentification

## Installation

1. Clonez le répertoire :
   ```bash
   git clone https://github.com/DimitriTedom/Snow-Brain-Ai.git
   ```

2. Naviguez dans le dossier du projet :
   ```bash
   cd Snow-Brain-Ai
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Configurez les variables d'environnement :
   Renommer le fichier `.env.example` à la racine du projet en `.env.local` et ajoutez votre clé API :
   ```env
   VITE_GOOGLE_AI_API_KEY=your_api_key_here
   ```

## Lancer le projet

1. Pour démarrer l'application en mode développement :
   ```bash
   npm run dev
   ```

2. Ouvrez votre navigateur à l'adresse suivante :
   [http://localhost:5173](http://localhost:5173)

## Utilisation

- Entrez un message dans le champ de texte.
- Cliquez sur "Envoyer" pour interagir avec Snow Brain AI.
- Le chatbot répondra en temps réel avec des messages streaming.

## Auteur

Ce projet a été créé par **Tedom Tafotsi Dimitri Wilfried**, alias **SnowDev**.

- **LinkedIn** : [Tedom Tafotsi Dimitri Wilfried](https://www.linkedin.com/in/tedom-tafotsi-dimitri-wilfried-b70502298/)
- **X (anciennement Twitter)** : [@DimitriTedom](https://x.com/DimitriTedom)
- **Email** : [dimitritedom@gmail.com](mailto:dimitritedom@gmail.com)

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b new-feature
   ```
3. Faites vos modifications et commitez-les :
   ```bash
   git commit -m "Add new feature"
   ```
4. Poussez vos modifications :
   ```bash
   git push origin new-feature
   ```
5. Ouvrez une pull request sur le répertoire principal.

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

Merci d'utiliser Snow Brain AI !

