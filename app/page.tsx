"use client";

import { useEffect, useState } from 'react';
import firstAnimation from './components/firstAnimation';
import { secondAnimation, changeTechModel } from './components/secondAnimation';

export default function Home() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);

  const techs = [
    { tech: "Javascript", color: "#F0DB4F", text: "Javascript foi a primeira linguagem de programação em que desenvolvi, ainda em 2022. Desde então, tenho usado-a quase que diariamente, seja em sua forma pura ou com seus frameworks e bibliotecas." },
    { tech: "Java", color: "#EC4134", text: "Java é com certeza uma das minhas linguagens preferidas. Me aprofundei no estudo de Programação Orientada a Objetos em 2024 com essa linguagem, e a ultilizei extensivamente profissionalmente, principalmente na parte do back-end com o framework Spring Boot." },
    { tech: "React.js", color: "#61DBFB", text: "Desenvolvo com React.js desde o final de 2023, quando decidi explorar o ecossistema do desenvolvimento web moderno. Desde então, venho acumulando experiência prática em projetos diversos, incluindo aplicações corporativas, sistemas interativos e projetos acadêmicos." },
    { tech: "Angular", color: "#B3373E", text: "Atualmente, Angular é o framework front-end que mais tenho contato profissionalmente. Ele tem me permitido desenvolver aplicações robustas e escaláveis no ambiente corporativo, entregando soluções de alta qualidade." },
    { tech: "Node.js", color: "#3A8338", text: "Node.js é o framework que uso atualmente no backend profissionalmente, mas também já o utilizei extensivamente em projetos pessoais. Sua eficiência e versatilidade têm sido fundamentais para entregar soluções server-side modernas e escaláveis." },
    { tech: "React Native", color: "#7159FF", text: "Usei React Native principalmente em projetos mobile pessoais e durante minha Iniciação Científica no IFTM. Gosto bastante dele por ser similar ao React, mas também já explorei bastante outras soluções nativas e híbridas, como Kotlin e Flutter, que também considero excelentes." },
    { tech: "SQL", color: "#087CD8FF", text: "Trabalho com SQL profissionalmente desde 2023. Desde lá, tive contato com bancos como PostgreSQL, MySQL, SQLite e Firebird, mas o que mais utilizo atualmente é o Oracle, que admiro bastante por sua robustez. Também já utilizei alguns bancos NoSQL, como Firebase e MongoDB." },
  ];

  const projects = [
    { name: "ReadMiner", image: "./projects/1.png", text: "Um projeto de IA que analisa contratos. Você insere um contrato de qualquer tipo e a IA gera relatórios com o tipo do contrato, as entidades envolvidas, os valores numéricos presentes, entre outros dados." },
    { name: "HardwareMaster", image: "./projects/2.png", text: "Ferramenta projetada para simplificar o processo de montagem de PCs personalizados, para ajudá-lo a escolher os melhores componentes com base no seu orçamento." },
    { name: "WR Consultoria", image: "./projects/3.png", text: "Uma landing page para uma empresa de consultoria, sendo este um projeto feito como freelance." },
    { name: "HemoWeb", image: "./projects/4.png", text: "Um sistema de cadastro de doação de sangue. O sistema tem como objetivo facilitar o controle das doações, gerenciar os cadastros de doadores e receptores, e auxiliar na organização de campanhas de coleta de sangue. Ainda em desenvolvimento." },
    { name: "WaterReminder", image: "./projects/5.png", text: "Um aplicativo totalmente configurável que te ajuda a lembrar de beber água. Disponível na Google Play para Android." },
    { name: "VisAçougue", image: "./projects/6.png", text: "Aplicativo móvel informativo e simulador de avaliações de açougues baseado nas normas de fiscalização da Vigilância Sanitária, um projeto de iniciação científica financiado por bolsa desenvolvido em parceria com o IFTM." },
  ]

  useEffect(() => {
    firstAnimation();
    secondAnimation();

    setTimeout(() => {
      setScreenIndex(1);
    }, 3150);
  }, []);

  function changeTechIndex() {
    if (techIndex + 1 < techs.length) {
      changeTechModel(techIndex + 1);
      setTechIndex(prev => prev + 1);
    } else {
      changeTechModel(0);
      setTechIndex(0);
    }
  }

  function increaseProjectIndex() {
    if (projectIndex < projects.length - 1) {
      setProjectIndex(prev => prev + 1);
    } else {
      setProjectIndex(0);
    }
  }

  function decreaseProjectIndex() {
    if (projectIndex > 0) {
      setProjectIndex(prev => prev - 1);
    } else {
      setProjectIndex(projects.length - 1);
    }
  }

  return (
    <>
      <section
        id="screen-0"
        className={`${screenIndex === 0 ? 'flex' : 'hidden'} h-full w-full`}
      >
      </section>

      <div
        className={`${screenIndex === 1 ? 'flex' : 'hidden'} flex-col`}
      >
        <section
          id="screen-1"
          className="transition-all bg-[#0D1117] flex flex-col items-center"
        >
          <div className='flex justify-center flex-row'>
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold text-white mt-8">
              Olá, meu nome é Ruan Emanuell!
            </h1>
            <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold text-white mt-8 ml-2 hand-animate">
              👋
            </h1>
          </div>
          <h2 className="text-md text-center md:text-2xl my-2 italic font-semibold text-gray-300">
            Desenvolvedor Fullstack
          </h2>
          <img src="./image-border.png" className="rounded-full w-80 h-80 md:w-128 md:h-128 my-8"></img>
          <h2 className="text-md md:text-xl lg:text-2xl text-center text-white mb-12 px-4 max-w-lg">
            Apaixonado por programação desde 2022, atualmente atuo como Desenvolvedor Web em tempo integral.
          </h2>
        </section>
        <section
          id="screen-2"
          className="mx-auto bg-[#24292E] h-full w-full flex items-center flex-col"
        >
          <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent my-8">
            Algumas tecnologias que eu conheço
          </h1>
          <div id="language-3dmodel" className='w-80 h-80 md:w-128 lg:w-144 md:h-96 mx-auto rounded-x-lg border-x-2 border-t-2 border-gray-700 bg-[#0D1117] flex justify-center items-center'></div>
          <div className='w-80 md:w-128 lg:w-144 h-64 mx-auto border-x-2 border-y-2 rounded-b-lg border-gray-700 bg-gradient-to-b from-[#0D1117] to-gray-800 flex flex-col justify-center items-center pb-2'>
            <h2
              style={{ color: techs[techIndex].color }}
              className="text-lg md:text-2xl lg:text-3xl font-semibold mt-2 transition-all"
            >
              {techs[techIndex].tech}
            </h2>
            <p className='text-gray-400 text-sm md:text-lg my-2 mx-8 text-center'>{techs[techIndex].text}</p>
          </div>
          <button onClick={changeTechIndex} className='bg-gray-700 px-4 py-2 rounded-full text-white my-8'>
            <h3 className='font-bold text-center text-lg bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent'>Próximo</h3>
          </button>
        </section>
        <section
          id="screen-3"
          className="mx-auto bg-[#0D1117] h-full w-full flex items-center flex-col mb-8"
        >
          <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent my-8">
            Alguns dos meus projetos
          </h1>
          <div className='flex flex-row'>
            <button className='bg-white font-bold text-center text-2xl lg:text-4xl h-10 w-10 lg:h-16 lg:w-16 rounded-full my-auto mx-2 flex justify-center items-center' onClick={decreaseProjectIndex}>
              <p>&#8249;</p>
            </button>
            <div className='flex flex-col'>
              <div className='w-72 h-72 lg:w-128 lg:h-96 bg-gray-800 rounded my-4 mx-auto'>
                <div className='border-x-2 border-t-2 border-gray-700 h-6 lg:h-8 flex flex-row items-center'>
                  <p className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-red-500 mx-2'></p>
                  <p className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-yellow-500 mx-2'></p>
                  <p className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-green-500 mx-2'></p>
                </div>
                <img src={projects[projectIndex].image} className='h-full w-full object-cover border-2 border-gray-700'></img>
              </div>
            </div>
            <button className='bg-white font-bold text-center text-2xl lg:text-4xl h-10 w-10 lg:h-16 lg:w-16 rounded-full my-auto mx-2 flex justify-center items-center' onClick={increaseProjectIndex}>
              <p>&#8250;</p>
            </button>
          </div>
          <div className='flex flex-col h-48 lg:h-64 items-center justify-center'>
            <h2 className="text-lg lg:text-2xl text-center font-bold text-white mt-8">
              {projects[projectIndex].name}
            </h2>
            <p className="text-sm lg:text-lg text-center italic text-gray-300 my-2 mx-8 max-w-md">
              {projects[projectIndex].text}
            </p>
          </div>
          <div className='h-8 flex flex-row items-center'>
            {projects.map((project, index) =>
              <p style={{ backgroundColor: index === projectIndex ? 'white' : 'transparent' }} className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-white border-2 mx-2 transition-all'></p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
