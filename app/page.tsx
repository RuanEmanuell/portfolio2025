"use client"

import { useEffect, useState } from 'react';
import firstAnimation from './components/firstAnimation';

export default function Home() {
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    if (document.querySelector("#screen-0")) {
      firstAnimation();

      setTimeout(() => {
        setScreenIndex(1);
        setTimeout(() => {
          document.querySelector("#screen-1")?.classList.remove("bg-black");
        }, 1000)
      }, 3000);
    }
  }, []);
  


  return (
    <>
      {screenIndex === 0 && <section id="screen-0"></section>}
      {screenIndex === 1 && 
      <section id="screen-1" className="bg-black transition-all bg-[#0D1117] flex flex-col items-center">
        <h1 className="text-3xl text-center font-bold lg:text-5xl text-white mt-6">Olá, meu nome é Ruan Emanuell!</h1>
        <h2 className="text-xl text-center lg:text-3xl text-white mb-4">Desenvolvedor Fullstack</h2>
        <div className='w-96 h-96 bg-[#24292E] rounded-full border-8 border-white my-4 animation'>
         <img src="./image-border.png" className="rounded-full w-full h-full"></img>
        </div>
      </section>}
    </>
  );
}
