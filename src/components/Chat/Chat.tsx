import React, { useRef, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import { ChatBubbleAvatar, ChatBubbleAction, ChatBubbleActionWrapper } from '@/components/ui/chat-bubble';
import { Copy, RefreshCcw } from 'lucide-react';

// Définir un type pour les messages
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Définir les props du composant
type ChatProps = {
  messages: Message[];
};

const WELCOME_MESSAGE_GROUP: Message = {
  role: 'assistant',
  content: 'Hello! How can I assist you today? I\'m Snow Brain AI, powered by advanced AI technology.',
};

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const messagesGroups = useMemo(() => 
    messages.reduce<Message[][]>((groups, message) => {
      if (message.role === 'user') groups.push([]);
      groups[groups.length - 1]?.push(message);
      return groups;
    }, []),
  [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });      
    }
  }, [messages]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleRegenerate = (content: string) => {
    console.log('Regenerating response for:', content);
    // You can implement regeneration logic here
  };

  return (
    <div className="space-y-8 min-h-full">
      {/* Welcome message */}
      <div className="flex gap-4 group">
        <div className="relative">
          <ChatBubbleAvatar 
            src="/ai-avatar.png"
            fallback="AI"
            className="w-12 h-12 border-2 border-blue-400/50 shadow-xl ring-4 ring-blue-400/20 bg-white dark:bg-gray-800 p-1"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="flex-1 space-y-3 max-w-4xl">
          <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-gray-200/50 dark:border-white/20">
            <Markdown className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-white/90">
              {WELCOME_MESSAGE_GROUP.content}
            </Markdown>
          </div>
          <ChatBubbleActionWrapper className="opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ChatBubbleAction
              icon={<Copy className="h-4 w-4" />}
              onClick={() => handleCopy(WELCOME_MESSAGE_GROUP.content)}
              className="text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 rounded-lg p-2"
            />
          </ChatBubbleActionWrapper>
        </div>
      </div>

      {/* Message groups */}
      {messagesGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-6">
          {group.map(({ role, content }, index) => {
            const isUser = role === 'user';
            const isAssistant = role === 'assistant';
            const isLoading = isAssistant && index === group.length - 1 && content === '';
            
            return (
              <div key={index} className={`flex gap-4 group ${isUser ? 'flex-row-reverse' : ''}`}>
                <div className="relative">
                  <ChatBubbleAvatar 
                    src={isUser 
                      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&q=80&crop=faces&fit=crop"
                      : "/ai-avatar.png"
                    }
                    fallback={isUser ? "U" : "AI"}
                    className={`w-12 h-12 border-2 shadow-xl ring-4 ${
                      isUser 
                        ? 'border-blue-400/50 ring-blue-400/20 bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'border-purple-400/50 ring-purple-400/20 bg-white dark:bg-gray-800 p-1'
                    }`}
                  />
                  {!isUser && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>
                <div className={`flex-1 space-y-3 max-w-4xl ${isUser ? 'flex flex-col items-end' : ''}`}>
                  <div className={`${
                    isUser 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-6 py-4 shadow-2xl max-w-[80%] border border-blue-400/30' 
                      : 'bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-gray-200/50 dark:border-white/20'
                  }`}>
                    {isLoading ? (
                      <div className="flex items-center space-x-3 py-3">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-gray-600 dark:text-white/70 text-base">Snow Brain AI is thinking...</span>
                      </div>
                    ) : (
                      <Markdown className={`prose prose-lg max-w-none ${
                        isUser 
                          ? 'prose-invert text-white' 
                          : 'text-gray-900 dark:text-white/90 dark:prose-invert'
                      }`}>
                        {content}
                      </Markdown>
                    )}
                  </div>
                  {isAssistant && content && !isLoading && (
                    <ChatBubbleActionWrapper className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ChatBubbleAction
                        icon={<Copy className="h-4 w-4" />}
                        onClick={() => handleCopy(content)}
                        className="text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 rounded-lg p-2 mr-2"
                      />
                      <ChatBubbleAction
                        icon={<RefreshCcw className="h-4 w-4" />}
                        onClick={() => handleRegenerate(content)}
                        className="text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 rounded-lg p-2"
                      />
                    </ChatBubbleActionWrapper>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
      <div ref={messageEndRef} />
    </div>
  );
};

export default Chat;
