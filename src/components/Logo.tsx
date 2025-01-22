import logo from '/Snow-Brain-AI.png';
const Logo = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
        <img src={logo} alt="Snow Brain AI" className='w-[8rem] h-[8rem]' />
        <h1 className='font-bold text-3xl text-blackCoal shadow-titleShadow dark:text-snowWhite'><span>S</span>now <span>B</span>rain <span>A</span>i</h1>
    </div>
  )
}

export default Logo