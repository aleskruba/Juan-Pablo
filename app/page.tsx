"use client"
import getCurrentUser from '@/app/actions/getCurrentUser';
import { useRef,useEffect, useState } from "react"
import AboutSection from "@/components/AboutSection"
import HeroSection from "@/components/HeroSection"
import GuideSection from "@/components/GuideSection"
import Contact from "@/components/Contact"
import {useScroll,motion, useTransform } from  'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguageContext } from "@/context/language-context"
import Reviews from '@/components/Comments';
import Link from 'next/link';

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

  const [openBar,setOpenBar] = useState(true)

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">

  <div className={`absolute ${openBar ? 'w-[380px]' : 'w-[40px]'} h-[270px] bg-blue-300 left-0 top-32 dark:bg-blue-700`}>
        <div className=''>
          <div className='w-full h-full relative'>
              <div className='absolute  flex justify-center items-center right-2 top-2 w-8 h-8 bg-gray-400 text-2xl cursor-pointer hover:bg-gray-200'
                  onClick={()=>setOpenBar(!openBar)}
              >
                X
              </div> 
            <div className={`flex flex-col px-4 pt-2 ${openBar ? '' : 'hidden'}`}>
            <div>ADMIN</div>
            <div>
          <Link
                href="https://juan-pablo.vercel.app/admin" 
                className="hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer" // Add rel attribute here
              >https://juan-pablo.vercel.app/admin
          </Link>
          </div>   
             <div> email: reactbrno@centrum.cz</div>
            <div> password: 123456 </div>
            <div className='w-full border border-solid border-1px mt-2' />  
            <div>USER</div>
            <div> in <strong> Contact me</strong> section you can register or log in </div>
            <div> or use this user  </div>
            <div> email: pepa@seznam.cz </div>
            <div> password: 123456 </div>
            </div>
          </div>
       </div>
      </div>

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
