interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export class OpenRouterAssistant {
    // Private properties for the API configuration
    #apiKey: string;
    #baseURL: string = "https://openrouter.ai/api/v1/chat/completions";
    #model: string;
    #conversationHistory: Message[] = [];
    #systemPrompt: string;

    constructor(model: string = "deepseek/deepseek-chat-v3.1:free") {
        this.#apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        this.#model = model;
        this.#systemPrompt = `You are Snow Brain AI, an intelligent and helpful assistant created by SnowDev. 

Key instructions:
- Always respond in English, regardless of the user's language
- Be friendly, professional, and knowledgeable
- Provide clear, concise, and helpful answers
- If asked about your identity, you are Snow Brain AI by SnowDev
- Use proper grammar and maintain a conversational tone
- Focus on being helpful and informative

Important: NEVER respond in Chinese, Japanese, Korean, or any non-English language. Always use English.`;

        if (!this.#apiKey) {
            throw new Error("OpenRouter API key is required");
        }
        
        // Initialize conversation with system prompt
        this.#conversationHistory = [
            {
                role: 'system',
                content: this.#systemPrompt
            }
        ];
    }

    // Method to clear conversation history (keeping system prompt)
    clearHistory(): void {
        this.#conversationHistory = [
            {
                role: 'system',
                content: this.#systemPrompt
            }
        ];
    }

    // Method to get conversation history length
    getHistoryLength(): number {
        return this.#conversationHistory.length - 1; // Exclude system prompt
    }

    // Method to trim history if it gets too long
    #trimHistory(): void {
        const maxMessages = 20; // Keep last 20 messages + system prompt
        if (this.#conversationHistory.length > maxMessages + 1) {
            // Keep system prompt and last maxMessages
            const systemPrompt = this.#conversationHistory[0];
            const recentMessages = this.#conversationHistory.slice(-maxMessages);
            this.#conversationHistory = [systemPrompt, ...recentMessages];
        }
    }

    // Method to send a message and get response
    async chat(content: string): Promise<string> {
        try {
            // Add user message to history
            this.#conversationHistory.push({
                role: 'user',
                content: content
            });

            // Trim history if needed
            this.#trimHistory();

            const response = await fetch(this.#baseURL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.#apiKey}`,
                    "HTTP-Referer": "https://snow-brain-ai.netlify.app",
                    "X-Title": "Snow Brain AI",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": this.#model,
                    "messages": this.#conversationHistory,
                    "temperature": 0.7,
                    "max_tokens": 1024
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`OpenRouter API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const assistantResponse = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
            
            // Add assistant response to history
            this.#conversationHistory.push({
                role: 'assistant',
                content: assistantResponse
            });

            return assistantResponse;
        } catch (error) {
            console.error("OpenRouter API Error:", error);
            throw error;
        }
    }

    // Method for streaming chat responses
    async *chatStream(content: string): AsyncGenerator<string, void, unknown> {
        try {
            // Add user message to history
            this.#conversationHistory.push({
                role: 'user',
                content: content
            });

            // Trim history if needed
            this.#trimHistory();

            const response = await fetch(this.#baseURL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.#apiKey}`,
                    "HTTP-Referer": "https://snow-brain-ai.netlify.app",
                    "X-Title": "Snow Brain AI",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": this.#model,
                    "messages": this.#conversationHistory,
                    "temperature": 0.7,
                    "max_tokens": 1024,
                    "stream": true
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`OpenRouter API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("Failed to get response reader");
            }

            const decoder = new TextDecoder();
            let buffer = '';
            let assistantResponse = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('data: ')) {
                            const data = trimmedLine.slice(6);
                            if (data === '[DONE]') {
                                // Add complete assistant response to history
                                this.#conversationHistory.push({
                                    role: 'assistant',
                                    content: assistantResponse
                                });
                                return;
                            }
                            
                            try {
                                const parsed = JSON.parse(data);
                                const content = parsed.choices[0]?.delta?.content;
                                if (content) {
                                    assistantResponse += content;
                                    yield content;
                                }
                            } catch (e) {
                                // Skip invalid JSON lines
                                continue;
                            }
                        }
                    }
                }
                
                // Fallback: add response to history if not done via [DONE]
                if (assistantResponse) {
                    this.#conversationHistory.push({
                        role: 'assistant',
                        content: assistantResponse
                    });
                }
            } finally {
                reader.releaseLock();
            }
        } catch (error) {
            console.error("OpenRouter Streaming Error:", error);
            throw error;
        }
    }

    // Method to get conversation history (excluding system prompt)
    getConversationHistory(): Omit<Message, 'role'>[] {
        return this.#conversationHistory
            .slice(1) // Skip system prompt
            .map(msg => ({ content: msg.content }));
    }

    // Method to export conversation for debugging
    exportConversation(): Message[] {
        return [...this.#conversationHistory];
    }
}

// For backward compatibility, export as Assistant as well
export { OpenRouterAssistant as Assistant };