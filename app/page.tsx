"use client"

import { useEffect, useState } from 'react';
import firstAnimation from './components/firstAnimation';
import secondAnimation from './components/secondAnimation';

export default function Home() {
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    if (document.querySelector("#screen-0")) {
      firstAnimation();

      setTimeout(() => {
        setScreenIndex(1);
        setTimeout(() => {
          document.querySelector("#screen-1")?.classList.remove("bg-black");
          secondAnimation();
        }, 1000);
      }, 3000);
    }
  }, []);



  return (
    <>
      {screenIndex === 0 && <section id="screen-0"></section>}
      {screenIndex === 1 &&
        <div className="flex flex-col">
          <section id="screen-1" className="bg-black transition-all bg-[#0D1117] flex flex-col items-center">
            <h1 className="text-4xl text-center font-bold lg:text-6xl text-white mt-6">Olá, meu nome é Ruan Emanuell!</h1>
            <h2 className="text-xl text-center lg:text-3xl text-white my-2">Desenvolvedor Fullstack</h2>
            <div className='h-80 lg:h-96 w-full flex justify-center items-center mb-4'>
              <div className='w-72 h-72 lg:w-80 lg:h-80 bg-neutral-900 rounded-full border-8 border-white my-4 animation'>
                <img src="./image-border.png" className="rounded-full w-full h-full"></img>
              </div>
            </div>
          </section>
          <section id="screen-2" className='mx-auto bg-[#24292E] h-full w-full flex items-center flex-col pb-8'>
           <h1 className="text-3xl text-center font-bold lg:text-5xl text-white my-8">Algumas tecnologias que eu conheço</h1>
          </section>
        </div>}
    </>
  );
}
