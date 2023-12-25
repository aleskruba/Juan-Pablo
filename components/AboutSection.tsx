"use client" // this is a client component

import React,{useEffect, useRef,useState} from 'react'
import Image from "next/image"
import { useLanguageContext } from "@/context/language-context"
import {motion, useAnimation, useInView } from  'framer-motion'

const AboutSection = () => {

  const {selected} = useLanguageContext()
  
  const ref = useRef(null)
  const isInView = useInView(ref, {once:true})
  const imageControls = useAnimation();

  useEffect(() => {
    if (isInView && imageControls) {
      setTimeout(() => {
        imageControls.start({
          opacity: 1,
          x: [0, 50, -50, 30, -30, 15, -15, 0], // Movement path in x-axis
          transition: {
            duration: 1.5,
            ease: "easeInOut", // Use the easing method of your choice
          },
        });
      }, 1000); // Delay the animation start by one second
    }
  }, [isInView, imageControls]);


 

  return (
    <section id="about">
      <div className="my-12 pb-12 md:pt-10 md:pb-48">
        <h1 className="text-center font-bold text-4xl">
        {selected  === 'Us' &&   'Spanish Teacher' }
        {selected  === 'Es' &&   'Profesor de español' }
        {selected  === 'Cz' &&   'Učitel španělštiny' }

          <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
        </h1>

        <div className="flex flex-col space-y-10 items-stretch justify-center align-top md:space-x-10 md:space-y-0 md:p-4 md:flex-row md:text-left">
          <div className="md:w-1/2  text-lg">
       
       {selected  === 'Us' && 
       <>
            <p>
            I have been teaching Spanish for some time now, and I learned that each student is different. Therefore, I have had students of different ages and levels: beginners, intermediate and advanced. If you choose to study with me you will find a fun, dynamic, calm class tailored to your needs.
            </p>
            <br />
            <p>
            If you start learning Spanish with me you will quickly notice a significant increase in your linguistic skills. I am very patient and empathetic with my students because I perfectly understand what it is like to learn another language. Start classes with me and we can talk about your goals and make a learning plan that will help you achieve the results you want!
            </p>
            <br />
            <p>
            I love talking, knowing about general culture and I am passionate about sports.
            </p>
            <p>
            I have been learning Spanish vocabulary for more than 10 years and through my previous job as an Uber driver I was able to teach and improve the Spanish of different tourists, through conversations about the tourist places in my hometown (Medellín).
            </p>
  
          </>
      }
             {selected  === 'Es' && 
       <>
            <p>
            Desde hace un tiempo atrás me dedico a enseñar español, y aprendí que cada alumno es distinto. Por eso, he tenido alumnos con distintas edades y niveles: principiantes, intermedios y avanzados. Si eliges estudiar conmigo te encontraras con una clase divertida, dinámica, tranquila y ajustada según tus necesidades.            </p>
            <br />
            <p>
            Si empiezas a aprender español conmigo notarás rápidamente un aumento significativo de tus habilidades lingüísticas. Soy muy paciente y empático con mis estudiantes porque entiendo perfectamente cómo es aprender otro idioma. ¡Empieza las clases conmigo y podemos hablar sobre tus objetivos y hacer un plan de aprendizaje que te ayudará a lograr los resultados que deseas!            </p>
            <br />
            <p>
            Me encanta hablar, saber de cultura general y me apasionan los deportes.            </p>
            <p>
            Tengo más de 10 años aprendiendo vocabulario del español y por medio de mi anterior trabajo como conductor de Uber pude enseñar y mejorar el español de diferentes turistas, por medio de conversaciones sobre los lugares turísticos de mi ciudad natal (Medellín)            </p>

          </>
      }
             {selected  === 'Cz' && 
       <>
            <p>
            Španělštinu učím už nějakou dobu a zjistil jsem, že každý student je jiný. Proto jsem měl studenty různého věku a úrovně: začátečníky, středně pokročilé a pokročilé. Pokud se rozhodnete studovat se mnou, najdete zábavnou, dynamickou a klidnou hodinu přizpůsobenou vašim potřebám.            </p>
            <br />
            <p>
            Pokud se se mnou začnete učit španělsky, rychle zaznamenáte výrazný nárůst svých jazykových dovedností. Jsem velmi trpělivý a empatický se svými studenty, protože dokonale rozumím tomu, jaké to je učit se jiný jazyk. Začněte se mnou lekce a můžeme si promluvit o vašich cílech a vytvořit učební plán, který vám pomůže dosáhnout požadovaných výsledků!            </p>
            <br />
            <p>
            Rád mluvím, znám obecnou kulturu a mám rád sport.
            </p>
            <p>
            Učím se španělskou slovní zásobu více než 10 let a díky své předchozí práci řidiče Uberu jsem mohl učit a zlepšovat španělštinu různých turistů prostřednictvím konverzací o turistických místech v mém rodném městě (Medellín).            </p>
   
       </>}
          </div>
          <div className="text-center md:w-1/2 md:text-left">
           {/*  <h1 className="text-2xl font-bold mb-6">Introduction video</h1> */}
            <div className="flex flex-wrap flex-row justify-center z-10 md:justify-start">
     
            <div style={{display:'flex',justifyContent:'center',minWidth:'550px'}}>

        
              <iframe
                 style={{width: '410px',height:"260px"}}
                src="https://www.youtube.com/embed/pjjsb-kI-N8"
                title="Profesor de Español | Juan Pablo R. 🇨🇴📝"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
        
          </div>


            </div>

            <motion.div animate={imageControls}>
            <Image
               ref={ref}
              src="/colombia.png"
              alt=""
              width={325}
              height={325}
              className="hidden md:block md:relative md:bottom-4 md:left-32 md:z-0"
            />
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
