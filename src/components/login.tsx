import { Button } from "@/components/button";
import { signIn } from "@junobuild/core-peer";

export const Login = () => {
  return (
    <Button
      className="w-40 px-8 font-bold border-green-main text-green-main hover:bg-green-main hover:text-white transition-all duration-200 ease-in-out"
      onClick={signIn}
    >
      Sign in
    </Button>
  );
};
