import Chat from './components/Chat/Chat';
import { useState } from 'react';
import { OpenRouterAssistant } from './assistants/openrouter';
import Loader from './components/Loader/Loader';
import DarkModeToggle from './components/DarkModeToggle';
import { PureMultimodalInput } from './components/ui/multimodal-ai-chat-input';

// Define types for messages that work with both Chat and MultimodalInput
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Types for the multimodal input
interface Attachment {
  url: string;
  name: string;
  contentType: string;
  size: number;
}

interface UIMessage {
  id: string;
  content: string;
  role: string;
  attachments?: Attachment[];
}

const App: React.FC = () => {
  console.log('App component is rendering...');
  console.log('Environment OPENROUTER API KEY:', import.meta.env.VITE_OPENROUTER_API_KEY ? 'Present' : 'Missing');
  
  const assistant = new OpenRouterAssistant();
  console.log('OpenRouterAssistant initialized successfully');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Convert messages to UIMessage format for multimodal input
  const uiMessages: UIMessage[] = messages.map((msg, index) => ({
    id: `msg-${index}`,
    content: msg.content,
    role: msg.role,
    attachments: []
  }));

  // Add a message to state
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateMessageContent = (content: string) => {
    setMessages((prevMessages) => 
      prevMessages.map((message, index) => 
        index === prevMessages.length - 1 
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  };

  // Enhanced message handler for multimodal input
  const handleSendMessage = async ({ input, attachments }: { input: string; attachments: Attachment[] }) => {
    if (!input.trim() && attachments.length === 0) return;

    // Add user message
    addMessage({ content: input, role: 'user' });
    setIsLoading(true);

    try {
      console.log('Sending message to AI:', input);
      console.log('Attachments:', attachments);
      
      const result = await assistant.chatStream(input);
      
      let isFirstChunk = true;
      for await (const chunk of result) {
        console.log('Received chunk:', chunk);
        if (isFirstChunk) {
          addMessage({ content: "", role: 'assistant' });
          isFirstChunk = false;
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      console.error('Error in chat:', error);
      addMessage({
        content: "Sorry, I couldn't process your request. Please check your API key and try again.",
        role: 'system',
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleStopGenerating = () => {
    setIsStreaming(false);
    setIsLoading(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 dark:bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Loader />
        </div>
      )}
      
      {/* Header - Floating */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-white/20 dark:bg-white/5 backdrop-blur-md border-b border-gray-200/30 dark:border-white/10">
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center p-1 border-2 border-blue-400/50 shadow-lg">
              <img src="/ai-avatar.png" alt="Snow Brain AI" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Snow Brain AI
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced AI Assistant</p>
            </div>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Chat Interface - Full Screen */}
      <main className="h-full pt-20 pb-4 px-4 flex flex-col">
        {/* Chat Container - Full Height */}
        <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 mb-6 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-gray-200/30 dark:border-white/10 shadow-2xl overflow-hidden">
            <div className="h-full overflow-y-auto p-8">
              <Chat messages={messages} />
            </div>
          </div>

          {/* Input Area - Enhanced */}
          <div className="bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/20 shadow-2xl p-6">
            <PureMultimodalInput
              chatId="snow-brain-chat"
              messages={uiMessages}
              attachments={attachments}
              setAttachments={setAttachments}
              onSendMessage={handleSendMessage}
              onStopGenerating={handleStopGenerating}
              isGenerating={isStreaming}
              canSend={!isLoading && !isStreaming}
              selectedVisibilityType="private"
              className="bg-transparent"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
