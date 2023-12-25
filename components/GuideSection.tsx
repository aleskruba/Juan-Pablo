"use client" 

import React,{useEffect, useRef} from 'react'
import Image from "next/image"
import { useLanguageContext } from "@/context/language-context"
import {motion, useAnimation, useInView } from  'framer-motion'

const GuideSection = () => {

  const {selected} = useLanguageContext()

  const ref = useRef(null)
  const isInView = useInView(ref, {once:true})
  const mainControls =  useAnimation()


  const refImage = useRef(null)
  const isInViewImage= useInView(ref, {once:true})
  const imageControls =  useAnimation()

  useEffect(()=>{
    if (isInView) {
    mainControls.start("visible")
    }
    },[isInView])

    const formVariants = {
      hidden: { x: '-100%' },
      visible: { x: '0%' },
    };

    useEffect(() => {
      if (isInViewImage && refImage.current) {
        imageControls.start({ scale: 1 }); // Start at scale 1
      } else {
        imageControls.start({ scale: 0.9 }); // Start at scale 0.9
      }
    }, [isInViewImage, imageControls]);

  return (
    <section id="projects">
    <div className="my-12 pb-12 md:pt-16 md:pb-48">
        <h1 className="text-center font-bold text-4xl">
        {selected  === 'Us' &&   'Tourist guide in Medellin' }
        {selected  === 'Es' &&   'Guía turístico en Medellín' }
        {selected  === 'Cz' &&   'Průvodce v Medellinu' }

          <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
        </h1>

        <div className="flex flex-col space-y-10 items-stretch justify-center align-top md:space-x-10 md:space-y-0 md:p-4 md:flex-row md:text-left">
          <div className="md:w-1/2 ">
          
          
          <motion.div animate={imageControls} transition={{ type: 'spring', duration: 2 }}>
            <Image
              ref={refImage}
              src="/medellin.jpg"
              alt=""
              width={425}
              height={425}
              className="md:block md:relative md:bottom-4 md:mt-6 md:z-0"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </motion.div>
       <motion.div
                   ref={ref}
                   variants={formVariants}
                   initial="hidden"
                   animate={mainControls}
                   transition={{ type: 'spring', duration: 1.5 }}
                   className="min-w-[100%] mt-4"
              >

          <div className="hidden md:block " >
          <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">

            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#FF0000' }}/> 
                <stop offset="33%" style={{ stopColor: '#FFFF00' }}/>
                <stop offset="67%" style={{ stopColor: '#0000FF' }}/> 
              </linearGradient>
            </defs>

       
                <text x="10" y="70" fontFamily="Arial, sans-serif" fontSize="42" fill="url(#gradient)">
                  Welcome to Medellin
                </text>
      
          </svg>

          </div>
          </motion.div>

          </div>
          <div className="text-center md:w-1/2 md:text-left">
<div className="flex flex-wrap flex-row justify-center z-10 md:justify-start">

{selected  === 'Cz' && 
       <>
            <p><b>
            Nazdárek! Jste připraveni ponořit se do Medellínu? 🌟 Dovolte mi být vaším průvodcem po nejlepších místech města:
      
        </b>
          </p>
        <br />
            <p>
           <b>🎨 Comuna 13:</b> Pouliční umění, živá kultura a inspirativní příběhy o odolnosti. Připravte se na dobrodružství plné barevných ulic a povznášejících vibrací.        </p>
            <br />
            <p>
              <b>
              🚡 Teleferico & El Peñol Rock:</b> Očekávají vás úžasné výhledy! Vzneseme se vysoko na Teleferico a vyšplháme na El Peñol Rock pro úchvatná panoramata, na která nezapomenete.          
            </p>
            <p>
              <b>
              🍴 Místní restaurace:
             </b> Pojďme si dopřát Medellínská lahodná sousta! Ochutnejte autentické chutě Kolumbie, od útulných rodinných restaurací až po rušné trhy.          </p>
            <p>  <b>
            🔒 Bezpečný průzkum:</b> Vaše bezpečnost je mou prioritou! Vezmu vás na bezpečná a přívětivá místa, která zajistí bezstarostnou a příjemnou cestu.
        </p>
        
            <p>  <b>
            🌟 Dobrodružství na míru:</b> Vaše bezpečnost je mou prioritou! Vezmu vás na bezpečná a přívětivá místa, která zajistí bezstarostnou a příjemnou cestu.              </p>
          </>
      }
             {selected  === 'Us' && 
          <>
          <p><b>
          Hey there! Ready to dive into Medellin's wonders? 🌟 Let me be your guide to the city's coolest spots:

    
      </b>
        </p>
      <br />
          <p>
         <b>🎨 Comuna 13:</b> Street art, vibrant culture, and inspiring stories of resilience. Get ready for an adventure filled with colorful streets and uplifting vibes.            </p>
          <br />
          <p>
            <b>
            🚡 Teleferico & El Peñol Rock:</b>Stunning views await! We'll soar high on the Teleferico and climb El Peñol Rock for jaw-dropping panoramas you won't forget.            
        
          </p>
          <p>
            <b>
            🍴 Local Eateries:
          </b> Let's indulge in Medellin's delicious bites! From cozy family-run restaurants to bustling markets, taste the authentic flavors of Colombia.            </p>
          <p>  <b>
          🔒  Safe Exploration:</b> Your safety is my priority! I'll take you to secure and welcoming places, ensuring a worry-free and enjoyable journey.         
      </p>
      
          <p>  <b>
          🌟 Tailored Adventures:</b>  Your safety is my priority! I'll take you to secure and welcoming places, ensuring a worry-free and enjoyable journey.         
            </p>
        </>}
        {selected  === 'Es' && 
          <>
          <p><b>
          ¡Hola! ¿Listo para sumergirte en las maravillas de Medellín? 🌟 Déjame ser tu guía de los lugares más interesantes de la ciudad:
    
      </b>
        </p>
      <br />
          <p>
         <b>🎨 Comuna 13:</b> Arte callejero, cultura vibrante e historias inspiradoras de resiliencia. Prepárate para una aventura llena de calles coloridas y vibraciones estimulantes..            </p>
          <br />
          <p>
            <b>
            🚡 Teleférico y El Peñol Rock:</b>¡Te esperan vistas impresionantes! Nos elevaremos en el Teleférico y escalaremos la Roca El Peñol para disfrutar de panoramas asombrosos que no olvidará.            
        
          </p>
          <p>
            <b>
            🍴 Restaurantes locales:
           </b> ¡Disfrutemos de los deliciosos bocados de Medellín! Desde acogedores restaurantes familiares hasta bulliciosos mercados, pruebe los auténticos sabores de Colombia.      </p>
          <p>  <b>
          🔒 Exploración segura:</b> ¡Tu seguridad es mi prioridad! Te llevaré a lugares seguros y acogedores, garantizándote un viaje agradable y sin preocupaciones.         
      </p>
      
          <p>  <b>
          🌟 Aventuras a medida:</b> ¡Tu seguridad es mi prioridad! Te llevaré a lugares seguros y acogedores, garantizándote un viaje agradable y sin preocupaciones.            </p>
        </>}


</div>  

</div>

        </div>

        

      </div>
    </section>
  )
}

export default GuideSection


{/* <div className="text-center md:w-1/2 md:text-left">
<div className="flex flex-wrap flex-row justify-center z-10 md:justify-start">

</div>
<Image
 src="/medellin.jpg"
 alt=""
 width={325}
 height={325}
 className="md:block md:relative md:bottom-4 md:left-32 md:z-0"
/>
</div> */}