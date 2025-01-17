"use client";

import { useEffect, useState } from 'react';
import firstAnimation from './components/firstAnimation';
import { secondAnimation, changeTechModel } from './components/secondAnimation';

export default function Home() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);
  const techs = [
    { tech: "Javascript", color: "#F0DB4F", text: "Javascript foi a primeira linguagem de programação em que desenvolvi, ainda em 2022. Desde então, tenho usado-a quase que diariamente, seja em sua forma pura ou com seus frameworks e bibliotecas." },
    { tech: "Java", color: "#EC4134", text: "Java é com certeza uma das minhas linguagens preferidas. Me aprofundei no estudo de Programação Orientada a Objetos em 2024 com essa linguagem, e a ultilizei extensivamente profissionalmente, principalmente na parte do back-end com o framework Spring Boot." },
    { tech: "React.js", color: "#61DBFB", text: "Desenvolvo com React.js desde o final de 2023, quando decidi explorar o ecossistema do desenvolvimento web moderno. Desde então, venho acumulando experiência prática em projetos diversos, incluindo aplicações corporativas, sistemas interativos e projetos acadêmicos." },
    { tech: "Angular", color: "#B3373E", text: "Atualmente, Angular é o framework front-end que mais tenho contato profissionalmente. Ele tem me permitido desenvolver aplicações robustas e escaláveis no ambiente corporativo, entregando soluções de alta qualidade." },
    { tech: "Node.js", color: "#3A8338", text: "Node.js é o framework que uso atualmente no backend profissionalmente, mas também já o utilizei extensivamente em projetos pessoais. Sua eficiência e versatilidade têm sido fundamentais para entregar soluções server-side modernas e escaláveis." },
    { tech: "React Native", color: "#7159FF", text: "Usei React Native principalmente em projetos mobile pessoais e durante minha Iniciação Científica no IFTM. Gosto bastante dele por ser similar ao React, mas também já explorei bastante outras soluções nativas e híbridas, como Kotlin e Flutter, que também considero excelentes." },
    { tech: "SQL", color: "#087CD8FF", text: "Trabalho com SQL profissionalmente desde 2023. Desde lá, tive contato com bancos como PostgreSQL, MySQL, SQLite e Firebird, mas o que mais utilizo atualmente é o Oracle, que admiro bastante por sua robustez. Também já utilizei alguns bancos NoSQL, como Firebase e MongoDB." },
  ];

  useEffect(() => {
    firstAnimation();
    secondAnimation();

    setTimeout(() => {
      setScreenIndex(1);
    }, 3150);
  }, []);

  function increaseTechIndex() {
    if (techIndex + 1 < techs.length) {
      changeTechModel(techIndex + 1);
      setTechIndex(prev => prev + 1);
    } else {
      changeTechModel(0);
      setTechIndex(0);
    }
  }

  return (
    <>
      <section
        id="screen-0"
        className={`${screenIndex === 0 ? 'flex' : 'hidden'} bg-[#0D1117] h-full w-full`}
      >
      </section>

      <div
        className={`${screenIndex === 1 ? 'flex' : 'hidden'} flex-col`}
      >
        <section
          id="screen-1"
          className="bg-black transition-all bg-[#0D1117] flex flex-col items-center"
        >
          <div className='flex justify-center flex-row'>
            <h1 className="text-xl text-center font-bold md:text-4xl text-white mt-8">
              Olá, meu nome é Ruan Emanuell!
            </h1>
            <h1 className="text-xl text-center font-bold md:text-4xl text-white mt-8 ml-2 hand-animate">
              👋
            </h1>
          </div>
          <h2 className="text-md text-center md:text-2xl my-2 italic font-semibold text-gray-300">
            Desenvolvedor Fullstack
          </h2>
          <img src="./image-border.png" className="w-full h-full rounded-full w-64 h-64 md:w-112 md:h-112 my-8"></img>
          <h2 className="text-md text-center md:text-xl text-white mb-8 px-4 max-w-lg">
            Apaixonado por programação desde 2022, atualmente atuo como Desenvolvedor Web em tempo integral.
          </h2>
        </section>
        <section
          id="screen-2"
          className="mx-auto bg-[#24292E] h-full w-full flex items-center flex-col"
        >
          <h1 className="text-xl text-center font-bold lg:text-3xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent my-8">
            Algumas tecnologias que eu conheço
          </h1>
          <div id="language-3dmodel" className='w-80 lg:w-128 h-80 mx-auto rounded-x-lg border-x-2 border-t-2 border-gray-700 bg-[#0D1117] flex justify-center items-center'></div>
          <div className='w-80 lg:w-128 mx-auto border-x-2 border-y-2 rounded-b-lg border-gray-700 bg-[#0D1117] flex flex-col justify-center items-center pb-2'>
            <h2
              style={{ color: techs[techIndex].color }}
              className="text-xl md:text-3xl font-semibold mt-2 transition-all"
            >
              {techs[techIndex]["tech"]}
            </h2>

            <p className='text-gray-400 text-sm md:text-lg my-2 mx-8 text-center'>{techs[techIndex]["text"]}</p>
          </div>
          <button onClick={increaseTechIndex} className='bg-gray-700 px-4 py-2 rounded-full text-white my-4'>
            <h3 className='font-bold text-center text-lg bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent'>Próximo</h3>
          </button>
        </section>
      </div>
    </>
  );
}
