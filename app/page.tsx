"use client"

import { useEffect, useState } from 'react';
import firstAnimation from './components/firstAnimation';
import secondAnimation from './components/secondAnimation';

export default function Home() {
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    if (document.querySelector("#animation0")) {
      firstAnimation();

      setTimeout(() => {
        setAnimationIndex(1);
        setTimeout(() => {
          document.querySelector("#animation1")?.classList.remove("bg-black");
          secondAnimation();
        }, 1000)
      }, 3000);
    }
  }, []);
  


  return (
    <>
      {animationIndex === 0 && <div id="animation0"></div>}
      {animationIndex === 1 && <div id="animation1" className="w-screen h-screen bg-black transition-all">
        <h1 className="text-2xl text-center font-bold lg:text-4xl">Olá, meu nome é Ruan Emanuell!</h1>
        <h2 className="text-lg text-center lg:text-2xl">Desenvolvedor Fullstack</h2>
      </div>}
    </>
  );
}
