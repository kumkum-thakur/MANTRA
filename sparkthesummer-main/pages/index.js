import Image from "next/image";
import { Inter } from "next/font/google";
import AuthButton from "../Components/Authbutton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   <>
   <AuthButton/>
    
   </>
  );
}
