
"use client"


 import { IconType } from "react-icons"



interface AuthSocialButtonProps {
    icon:IconType;
    onClick:()=>void;
}

const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({
    icon:Icon,
    onClick
}) => {
  return (
    <button
     type="button"
     onClick={onClick}
     className="
        inline-flex
        w-full 
        justify-center
        text-neutral-100 font-semibold bg-teal-600 rounded shadow hover:bg-teal-700
        px-4 
        py-2 
        ring-1 
        ring-inset 
        ring-gray-300 
        focus:outline-offset-0
        font-xs
        gap-2
     ">login with  <Icon/>
    </button>
  )
}

export default AuthSocialButton 