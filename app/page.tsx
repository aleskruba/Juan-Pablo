"use client"
import getCurrentUser from '@/app/actions/getCurrentUser';
import { useRef,useEffect } from "react"
import AboutSection from "@/components/AboutSection"
import HeroSection from "@/components/HeroSection"
import GuideSection from "@/components/GuideSection"
import Contact from "@/components/Contact"
import {useScroll,motion, useTransform } from  'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguageContext } from "@/context/language-context"
import Reviews from '@/components/Comments';

export default  function Home() {
  const session = useSession()

    
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  const refGuide = useRef<HTMLDivElement>(null)

  const {currentUser,setCurrentUser} = useLanguageContext()

  const {scrollYProgress} = useScroll({
    target:ref,
    offset:["0 1","0 0.1"]

  })
  const scaleProgress = useTransform(scrollYProgress, [0,0] , [0.5,1])


  const { scrollYProgress: guideScrollYProgress } = useScroll({
    target: refGuide,
    offset:["0 1","0 0.1"],
  });
  const guideScaleProgress = useTransform(guideScrollYProgress, [0, 0], [0.5, 1]);


  useEffect(() => {
    const isFirstTimeLogin = localStorage.getItem('firstTimeLogin');

    if (session?.status === 'authenticated' && isFirstTimeLogin === null) {
      localStorage.setItem('firstTimeLogin', 'true');
     
      if  (!currentUser?.admin) router.push('/#contact');
    }
  }, [session?.status, router]);

  useEffect(() => {
    const fetchCurrentUser = async() => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser)
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
         <HeroSection />
      
   <motion.div 
          ref={ref}
          style={{
            scale:scaleProgress,
            opacity:scrollYProgress
          }}>
      <AboutSection />
      </motion.div> 

      <motion.div 
          ref={refGuide}
          style={{
            scale: guideScaleProgress,
            opacity: guideScrollYProgress,
          }}>
      <GuideSection />
      </motion.div>
      
      <div>
       <Contact />
     </div>

     <div>
       <Reviews />
     </div>
      
    </main>
  )
}
