import React from "react"
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai"

import { useLanguageContext } from "@/context/language-context"

const Footer = () => {

  const {isAdmin} = useLanguageContext()
  return (
    <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
      {!isAdmin &&  <>
      <hr className="w-full h-0.5 mx-auto mt-2 bg-neutral-200 border-0"></hr>
      <div className="mx-auto  p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
        <div className="flex flex-row items-center justify-center space-x-1 text-neutral-500 dark:text-neutral-100">
          © 2023 Juan Pablo<a href="/" className="hover:underline"></a>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">
          
          <a href="#" 
             rel="noreferrer" 
             target="_blank"
             >
            <AiOutlineFacebook
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100 "
              size={50}
              color="#1877F2"
            />
          </a>

          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            >
           <div  className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100">
            <AiOutlineInstagram
              size={50}
              color="#E4405F"
            />
          </div> 
          </a>

    
        </div>
      </div> </>}
    </footer>
  )
}

export default Footer
