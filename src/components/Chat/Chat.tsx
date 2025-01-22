import React, { useRef, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import Styles from './Chat.module.css';

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
  content: 'Hello! How can I assist you today?',
};

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const messagesGroups = useMemo(() => 
    messages.reduce<Message[][]>((groups, message) => { //messages.reduce<Message[][]> permet de typer correctement groups comme un tableau de tableaux de messages.
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

  return (
    <div className="p-8">
      <h1 className="text-center text-xl">Hello! How can I assist you today?</h1>
      <div className={Styles.Chat}>
        {[ [WELCOME_MESSAGE_GROUP], ...messagesGroups].map((group, groupIndex) => (
          <div key={groupIndex} className={Styles.Group}>
            {group.map(({ role, content }, index) => (
              <div key={index} data-role={role} className={Styles.Message}>
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default Chat;
