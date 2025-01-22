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
