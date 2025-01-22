import { GoogleGenerativeAI } from '@google/generative-ai';

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
    // Propriété privée pour la session de chat
    #chat: any;

    constructor(model: string = 'gemini-1.5-flash') {
        const gemini = googleai.getGenerativeModel({ model });
        this.#chat = gemini.startChat({ history: [] });
    }

    // Méthode pour envoyer un message et récupérer la réponse
    async chat(content: string): Promise<string> {
        try {
            // Typage du résultat (adapter selon l'API réelle)
            const result: any = await this.#chat.sendMessage(content);
            return result.response.text();
        } catch (error) {
            throw error;
        }
    }

    async *chatStream (content: string):Promise<void> {
        try {
            const result = await this.#chat.sendMessageStream(content);
            for await (const chunk of result.stream){
                if (chunk && chunk.text) {
                    yield chunk.text();
                  } else {
                    console.error('Invalid chunk format:', chunk);
                  }
            }
        } catch (error) {
        throw error;
     }
    }
} 

// Illustration d'une interaction utilisateur :
// Étape 1 : L'utilisateur envoie une question via le champ de texte.
// Étape 2 : Un message de type user est ajouté à l'état des messages.
// Étape 3 : L'application envoie la question au serveur (via assistant.chat ou chatStream).
// Étape 4 : Une fois le streaming commencé :
// Un message vide de type assistant est ajouté.
// Les chunks reçus sont ajoutés progressivement au message.
// Étape 5 : Le message est mis à jour en temps réel dans l'interface utilisateur.
// Étape 6 : Quand le serveur a fini de transmettre les données, le streaming se termine