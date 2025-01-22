import React, { useState, ChangeEvent,useRef, useEffect } from 'react';
import Styles from './Control.module.css';
import TextareaAutosize from 'react-textarea-autosize';
// Définir les props du composant
type ControlsProps = {
  isDisable: boolean;
  onSend: (message: string) => void;
};

const Controls: React.FC<ControlsProps> = ({ isDisable=false, onSend }) => {
  const [content, setContent] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(()=>{
    if(isDisable){
      textAreaRef.current?.focus();
    }
  },[isDisable]);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const handleClick = () => {
    if (content.length > 0) {
      onSend(content);
      setContent('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();//avoid re-execute this event
      handleClick();
    }
  }
  return (
    <div className={Styles.Controls}>
      <div className={Styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textAreaRef}
          placeholder="Message AI Chatbot"
          className={Styles.TextArea}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          minRows={1}
          maxRows={4}
          disabled={isDisable}
        />
      </div>
      <button className={Styles.Button} onClick={handleClick} disabled={isDisable}> 
        <SendIcon />
      </button>
    </div>
  );
};

const SendIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
};

export default Controls;
