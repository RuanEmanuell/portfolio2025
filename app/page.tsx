"use client";

import { useEffect, useRef, useState } from 'react';
import { firstAnimation, changeTechModel } from './animations/firstAnimation';
import Loading from './components/loading';
import { secondAnimation } from './animations/secondAnimation';

export default function Home() {
  const [techIndex, setTechIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [navMenuVisible, setNavMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProject, setLoadingProject] = useState(false);

  const projectImgRef = useRef<HTMLImageElement>(null);

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
    { name: "ReadMiner", image: "./projects/1.webp", text: "Um projeto de IA que analisa contratos. Você insere um contrato de qualquer tipo e a IA gera relatórios com o tipo do contrato, as entidades envolvidas, os valores numéricos presentes, entre outros dados." },
    { name: "HardwareMaster", image: "./projects/2.webp", text: "Ferramenta projetada para simplificar o processo de montagem de PCs personalizados, para ajudá-lo a escolher os melhores componentes com base no seu orçamento." },
    { name: "WR Consultoria", image: "./projects/3.webp", text: "Uma landing page para uma empresa de consultoria, sendo este um projeto feito como freelance." },
    { name: "HemoWeb", image: "./projects/4.webp", text: "Um sistema de cadastro de doação de sangue. O sistema tem como objetivo facilitar o controle das doações, gerenciar os cadastros de doadores e receptores, e auxiliar na organização de campanhas de coleta de sangue. Ainda em desenvolvimento." },
    { name: "WaterReminder", image: "./projects/5.webp", text: "Um aplicativo totalmente configurável que te ajuda a lembrar de beber água. Disponível na Google Play para Android." },
    { name: "VisAçougue", image: "./projects/6.webp", text: "Aplicativo móvel informativo e simulador de avaliações de açougues baseado nas normas de fiscalização da Vigilância Sanitária, um projeto de iniciação científica financiado por bolsa desenvolvido em parceria com o IFTM." },
  ]

  useEffect(() => {
    async function startAnimation() {
      firstAnimation();
      secondAnimation().then(() => {
        setLoading(false);
        if (projectImgRef.current?.complete) {
          handleImageLoad();
        }
      });
    }

    startAnimation();
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

  useEffect(() => {
    if (navMenuVisible) {
      document.body.style.overflow = 'hidden';
      document.querySelector("#hand")?.classList.add("invisible");
    } else {
      document.body.style.overflow = 'visible';
      document.querySelector("#hand")?.classList.remove("invisible");
    }
  }, [navMenuVisible])

  useEffect(() => {
    setLoadingProject(true);
  }, [projectIndex]);


  function handleImageLoad() {
    setLoadingProject(false);
  };


  return (
    <>
      {loading ? <div className='h-screen w-screen flex justify-center items-center'><Loading /></div> : <></>}

      <div
        className={`${!loading ? 'flex' : 'hidden'} flex-col`}
      >
        <nav className='bg-black w-full h-16 flex justify-end lg:justify-center items-center'>
          <div className='max-w-xl w-full flex-row justify-between hidden lg:flex'>
            <a className='text-white text-md pointer font-bold transition hover:scale-105 cursor-pointer' href='#'>Sobre mim</a>
            <a className='text-white text-md pointer font-bold transition hover:scale-105 cursor-pointer' href='#screen-2'>Tecnologias</a>
            <a className='text-white text-md pointer font-bold transition hover:scale-105 cursor-pointer' href='#screen-3'>Experiências</a>
            <a className='text-white text-md pointer font-bold transition hover:scale-105 cursor-pointer' href='#screen-4'>Formação</a>
            <a className='text-white text-md pointer font-bold transition hover:scale-105 cursor-pointer' href='#screen-5'>Projetos</a>
            <a className='text-white text-md pointer font-bold transition hover:scale-105 cursor-pointer' href='#screen-6'>Contato</a>
          </div>
          <div className='border-2 border-gray-300 h-8 w-8 p-1 rounded flex flex-col justify-center content-between lg:hidden mx-2 cursor-pointer hover:bg-gray-800' onClick={() => setNavMenuVisible(prev => !prev)}>
            <div className='w-full h-1 bg-gray-300 rounded mb-1'></div>
            <div className='w-full h-1 bg-gray-300 rounded mb-1'></div>
            <div className='w-full h-1 bg-gray-300 rounded'></div>
          </div>
        </nav>
        <section id="nav-menu" className='w-screen h-screen bg-black absolute bg-opacity-50 justify-end' style={{ display: navMenuVisible ? "flex" : "none" }} onClick={() => setNavMenuVisible(prev => !prev)}>
          <div className='w-60 h-full bg-[#0D1117] flex flex-col items-center py-8'>
            <a className='text-white text-lg pointer font-bold rounded w-44 h-16 text-center' href='#'>Sobre mim</a>
            <a className='text-white text-lg pointer font-bold rounded w-44 h-16 text-center' href='#screen-2'>Tecnologias</a>
            <a className='text-white text-lg pointer font-bold rounded w-44 h-16 text-center' href='#screen-3'>Experiências</a>
            <a className='text-white text-lg pointer font-bold rounded w-44 h-16 text-center' href='#screen-4'>Formação</a>
            <a className='text-white text-lg pointer font-bold rounded w-44 h-16 text-center' href='#screen-5'>Projetos</a>
            <a className='text-white text-lg pointer font-bold rounded w-44 h-16 text-center' href='#screen-6'>Contato</a>
          </div>
        </section>
        <section
          id="screen-1"
          className="transition-all bg-[#0D1117] flex flex-col items-center py-8"
        >
          <div className="flex justify-center flex-col items-center">
            <div className="flex items-center w-80 md:w-128">
              <h1 className="text-3xl md:text-4xl text-center font-bold text-white mt-2 mx-2">
                Olá, meu nome é Ruan Emanuell!
              </h1>
              <span
                className="text-3xl md:text-4xl ml-2 absolute right-[2rem] top-[1.25rem] md:right-[9rem] hand-animate"
                id="hand"
              >
                👋
              </span>
            </div>
          </div>


          <h2 className="text-lg md:text-xl text-center lg:text-2xl my-2 italic font-semibold text-gray-300">
            Desenvolvedor Fullstack
          </h2>
          <img src="./image.webp" className="rounded-full w-80 h-80 md:w-full md:h-full max-w-md border-white border-8 my-4" alt="Minha foto"></img>
          <h2 className="text-md md:text-lg text-center text-white my-2 px-4 max-w-2xl">
            Apaixonado por programação desde 2022, atualmente atuo como Desenvolvedor Web em tempo integral.
          </h2>
        </section>
        <section
          id="screen-2"
          className="mx-auto bg-gradient-to-b from-[#24292E] to-gray-800 h-full w-full flex items-center flex-col py-8 overflow-hidden"
        >
          <h1 className="text-2xl lg:text-3xl text-center font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mx-2">
            Algumas tecnologias que eu conheço
          </h1>
          <div id="language-3dmodel" className='w-80 h-80 md:w-128 lg:w-full max-w-2xl md:h-96 mx-auto rounded-x-lg border-x-2 border-t-2 border-gray-700 bg-[#0D1117] flex justify-center items-center mt-6'></div>
          <div className='w-80 md:w-128 lg:w-full max-w-2xl h-64 mx-auto border-x-2 border-y-2 rounded-b-lg border-gray-700 bg-gradient-to-b from-[#0D1117] to-gray-800 flex flex-col justify-center items-center pb-2'>
            <h2
              style={{ color: techs[techIndex].color }}
              className="text-lg md:text-2xl lg:text-3xl font-semibold mt-2 transition-all"
            >
              {techs[techIndex].tech}
            </h2>
            <p className='text-gray-400 text-sm md:text-lg my-2 mx-8 text-center'>{techs[techIndex].text}</p>
          </div>
          <button onClick={changeTechIndex} className='bg-gray-700 h-20 w-40 rounded-full text-white my-8 transition hover:bg-neutral-900 hover:scale-105' button-name="Passar pra próxima tecnologia">
            <h3 className='font-bold text-center text-lg lg:text-xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent'>Próximo</h3>
          </button>
        </section>
        <section
          id="screen-3"
          className="mx-auto bg-[#0D1117] h-full w-full flex items-center flex-col py-8"
        >
          <h1 className="text-2xl lg:text-3xl text-center font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mx-2">
            Minhas experiências profissionais
          </h1>
          <div className='w-80 md:w-full max-w-2xl border-2 border-gray-700 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex flex-col items-center py-6 my-6 transition hover:bg-gradient-to-l hover:border-gray-300 cursor-pointer'>
            <span className=''>
              <div className='flex flex-row items-center w-full px-6'>
                <img src="./logos/bravo.webp" className='w-10 h-10 mr-4' alt="Logo da Bravo" loading='lazy'></img>
                <div className='flex flex-col'>
                  <h1 className='text-lg lg:text-2xl text-white font-bold'>Analista de Sistemas II - Bravo Serviços Logísticos</h1>
                  <p className='text-md lg:text-lg text-gray-400 font-semibold italic'>(12/2024 - presente)</p>
                </div>
              </div>
              <p className='text-sm lg:text-md text-gray-400 text-left px-6 mt-4'>Desenvolvimento e manutenção de aplicações web escaláveis, com foco em Angular no front-end e Node.js no back-end.</p>
            </span>
          </div>
          <div className='w-80 md:w-full max-w-2xl border-2 border-gray-700 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg flex flex-col items-center py-6 my-6 transition hover:bg-gradient-to-l hover:border-gray-300 cursor-pointer'>
            <div className='flex flex-row items-center w-full px-6'>
              <img src="./logos/codiub.webp" className='w-10 h-8 mr-4' alt="Logo da Codiub" loading='lazy'></img>
              <div className='flex flex-col'>
                <h1 className='text-lg lg:text-2xl text-white font-bold'>Desenvolvedor de Sistemas Web Júnior - Codiub Solução Digital</h1>
                <p className='text-md lg:text-lg text-gray-400 font-semibold italic'>(07/2024 - 12/2024)</p>
              </div>
            </div>
            <p className='text-sm lg:text-md text-gray-400 text-left px-6 mt-4'>Desenvolvimento de aplicações web com linguagens e frameworks como: Angular, Java Spring Boot e Java ServerFaces (JSF).</p>
          </div>
          <div className='w-80 md:w-full max-w-2xl border-2 border-gray-700 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg flex flex-col items-center py-6 my-6 transition hover:bg-gradient-to-l hover:border-gray-300 cursor-pointer'>
            <div className='flex flex-row items-center w-full px-6'>
              <img src="./logos/candido.webp" className='w-10 h-7 mr-4' alt="Logo da Candido" loading='lazy'></img>
              <div className='flex flex-col'>
                <h1 className='text-lg lg:text-2xl text-white font-bold'>Estagiário de Desenvolvimento Desktop - Cândido Empresarial</h1>
                <p className='text-md lg:text-lg text-gray-400 font-semibold italic'>(07/2023 - 01/2024)</p>
              </div>
            </div>
            <p className='text-sm lg:text-md text-gray-400 text-left px-6 mt-4'>Construção de novas telas e recursos, bem como manutenção em sistemas empresariais desktop com banco de dados relacional.</p>
          </div>


        </section>
        <section
          id="screen-4"
          className="mx-auto bg-gradient-to-b from-[#24292E] to-gray-800 h-full w-full flex items-center flex-col py-8"
        >
          <h1 className="text-2xl lg:text-3xl text-center font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mx-2">
            Escolaridade e formações
          </h1>
          <div className='w-80 md:w-full max-w-2xl border-2 border-gray-700 bg-gradient-to-b from-[#0D1117] to-gray-800 rounded-lg flex flex-col items-center py-6 my-6 transition hover:bg-gradient-to-t hover:border-gray-300 cursor-pointer'>
            <div className='flex flex-row items-center w-full px-6'>
              <img src="./logos/iftm.webp" className='w-10 h-10 mr-4' alt="Logo da IFTM" loading='lazy'></img>
              <div className='flex flex-col'>
                <h1 className='text-lg lg:text-2xl text-white font-bold'>Graduação em ADS - IFTM Campus Uberaba Parque Tecnológico</h1>
                <p className='text-md lg:text-lg text-gray-400 font-semibold italic'>(02/2023 - presente)</p>
              </div>
            </div>
            <p className='text-sm lg:text-md text-gray-400 text-left px-6 mt-4'>Atualmente estou no quinto período de Análise e Desenvolvimento de Sistemas pela IFTM.  Durante a graduação, adquiri conhecimentos em linguagens de programação, engenharia de software, banco de dados e metodologias ágeis. Também participei de projetos acadêmicos que fortaleceram minha capacidade de desenvolver aplicações robustas e inovadoras. (Previsão de Conclusão: 12/2025)</p>
          </div>
          <div className='w-80 md:w-full max-w-2xl border-2 border-gray-700 bg-gradient-to-b from-[#0D1117] to-gray-800 rounded-lg flex flex-col items-center py-6 my-6 transition hover:bg-gradient-to-t hover:border-gray-300 cursor-pointer'>
            <div className='flex flex-row items-center w-full px-6'>
              <img src="./logos/senai.webp" className='w-10 h-10 mr-4' alt="Logo da SENAI" loading='lazy'></img>
              <div className='flex flex-col'>
                <h1 className='text-lg lg:text-2xl text-white font-bold'>Aprendizagem em Automação Industrial - SENAI</h1>
                <p className='text-md lg:text-lg text-gray-400 font-semibold italic'>(06/2021 - 06/2022)</p>
              </div>
            </div>
            <p className='text-sm lg:text-md text-gray-400 text-left px-6 mt-4'>Durante o curso, aprendi a criar soluções para automação de processos industriais, desde a interpretação de diagramas elétricos até o desenvolvimento de sistemas de controle eficientes e seguros. Adquiri também habilidades práticas em programação de CLPs, com ênfase na linguagem Ladder.</p>
          </div>
        </section>
        <section
          id="screen-5"
          className="mx-auto bg-[#0D1117] h-full w-full flex items-center flex-col py-8"
        >
          <h1 className="text-2xl lg:text-3xl text-center font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-4 mx-2">
            Alguns dos meus projetos
          </h1>
          <div className='flex flex-row justify-center my-2'>
            <button className='bg-white font-bold text-center text-2xl lg:text-3xl h-10 w-10 lg:h-16 lg:w-16 rounded-full my-auto mx-2 flex justify-center items-center transition hover:bg-gray-300 hover:scale-105' onClick={decreaseProjectIndex} aria-label="Passar pro projeto anterior">
              <div className="w-0 h-0 
              rotate-90
              border-l-[12px] border-l-transparent
              border-t-[15px] border-t-black
              border-r-[12.5px] border-r-transparent">
              </div>
            </button>
            <div className='flex flex-col'>
              <div className='w-72 h-72 md:w-144 md:h-96 bg-gray-800 rounded'>
                <div className='border-x-2 border-t-2 border-gray-700 h-6 lg:h-8 flex flex-row items-center'>
                  <p className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-red-500 mx-2'></p>
                  <p className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-yellow-500 mx-2'></p>
                  <p className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-green-500 mx-2'></p>
                </div>
                <div className='w-full h-full justify-center items-center pb-12' style={{ display: loadingProject ? "flex" : "none" }}>
                  <Loading />
                </div>
                <img
                  alt={projects[projectIndex].name}
                  ref={projectImgRef}
                  src={projects[projectIndex].image}
                  loading="lazy"
                  className="h-full w-full object-cover border-2 border-gray-700"
                  style={{ visibility: loadingProject ? "hidden" : "visible" }}
                  onLoad={handleImageLoad}
                />

              </div>
            </div>
            <button className='bg-white font-bold text-center text-2xl lg:text-3xl h-10 w-10 lg:h-16 lg:w-16 rounded-full my-auto mx-2 flex justify-center items-center hover:bg-gray-300 hover:scale-105' onClick={increaseProjectIndex} aria-label="Passar pro próximo projeto">
              <div className="w-0 h-0 
              rotate-[-90deg]
              border-l-[12px] border-l-transparent
              border-t-[15px] border-t-black
              border-r-[12.5px] border-r-transparent">
              </div>
            </button>
          </div>
          <div className='flex flex-col h-48 lg:h-64 items-center justify-center'>
            <h2 className="text-lg lg:text-2xl text-center font-bold text-white my-2">
              {projects[projectIndex].name}
            </h2>
            <p className="text-sm lg:text-lg text-center italic text-gray-300 mx-8 max-w-md">
              {projects[projectIndex].text}
            </p>
          </div>
          <div className='h-8 flex flex-row items-center my-2'>
            {projects.map((project, index) =>
              <p style={{ backgroundColor: index === projectIndex ? 'white' : 'transparent' }} className='h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-white border-2 mx-2 transition-all cursor-pointer' key={index} onClick={() => setProjectIndex(index)}></p>
            )}
          </div>
          <a className='bg-black flex flex-row w-64 h-20 rounded-full items-center justify-center my-6 transition hover:bg-neutral-900 hover:scale-105 cursor-pointer' href='https://github.com/RuanEmanuell' target='_blank' rel="noreferrer">
            <h3 className='text-white font-bold text-lg'>Veja mais no Github</h3>
            <img src="./logos/github.webp" className='ml-2 w-10 h-10 bg-white rounded-full border-white border-2' alt="Logo do Github" loading='lazy'></img>
          </a>
        </section>
        <section
          id="screen-6"
          className="mx-auto bg-gradient-to-b from-[#24292E] to-gray-800 h-full w-full flex items-center flex-col py-8 overflow-hidden"
        >
          <h1 className="text-2xl lg:text-3xl text-center font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mx-2">
            Entre em contato comigo
          </h1>
          <h2 className="text-md md:text-lg text-center text-white my-2 px-4 max-w-2xl">
            Sou apaixonado por criar soluções inteligentes e trabalhar em projetos desafiadores. Se você deseja colaborar, discutir uma ideia ou apenas trocar experiências sobre desenvolvimento, ficarei feliz em ouvir você! Logo abaixo, no rodapé da página, você pode encontrar minhas redes sociais. Obrigado pela atenção e até mais! 🚀
          </h2>
          <div id="me-3dmodel" className='w-80 h-96 md:w-128 lg:w-full max-w-2xl mx-auto  flex justify-center items-center mt-6'></div>


        </section>
        <footer className='bg-black w-full h-16 flex justify-around items-center'>
          <p className='text-white text-lg'>© 2025 - Ruan Emanuell</p>
          <div className='w-32 h-8 flex flex-row justify-end items-center'>
            <a href='https://github.com/RuanEmanuell' target='_blank' rel="noreferrer"><img src="./logos/github.webp" className='w-10 h-10 bg-white rounded-full border-white border-2' alt="Logo do Github" aria-label="Link do meu Github" loading='lazy'></img></a>
            <a href='https://www.linkedin.com/in/ruan-emanuell-649b97247/' target='_blank' rel="noreferrer" className='ml-2'><img src="./logos/linkedin.webp" className='w-10 h-10 bg-white rounded-full border-white border-2' alt="Logo do Linkedin" aria-label="Link do meu Linkedin" loading='lazy'></img></a>
          </div>
        </footer>
      </div>
    </>
  );
}
