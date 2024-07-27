import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Cookies from 'js-cookie';

export default function AuthButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // Save user's name as a cookie
      if (session.user?.name) {
        Cookies.set('Email', session.user.email);
        Cookies.set('Name', session.user.name);
        Cookies.set('Image', session.user.image);
     
      }
      router.push('/DashBoard');
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="flex justify-center self-center p-3 border-[0.2vh] hover:scale-95 active:scale-95 transition-transform duration-150 bg-white border-black rounded-lg"
        >
          <FcGoogle className="self-center" />
          <p className="self-center ml-2 font-medium text-gray-800">
            Continue with Google
          </p>
        </button>
      ) : null}
    </div>
  );
}
