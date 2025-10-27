import React, { useEffect } from 'react'

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = React.useState(()=> localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }else{
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    },[darkMode]);

    const handleToggle = ()=>{
        setDarkMode(!darkMode);
    }
  return (
    <button 
      onClick={handleToggle}
      className="relative p-3 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="20px" 
          viewBox="0 -960 960 960" 
          width="20px" 
          fill="currentColor"
          className="text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300"
        >
          <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
        </svg>
      ) : ( 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="20px" 
          viewBox="0 -960 960 960" 
          width="20px" 
          fill="currentColor"
          className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300"
        >
          <path d="M380-880q83 0 156 31.5T663-763q54 54 85.5 127T780-480q0 83-31.5 156T663-197q-54 54-127 85.5T380-80q-53 0-103.5-13.5T180-134q93-54 146.5-146T380-480q0-108-53.5-200T180-826q46-27 96.5-40.5T380-880Z"/>
        </svg>
      )}
    </button>
  )
}

export default DarkModeToggle