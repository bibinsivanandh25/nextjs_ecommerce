import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children }) => {
  const { data: session, status } = useSession({ required: true });
  const hasuser = !!session?.user;

  useEffect(() => {
    if (!hasuser || session?.error) {
      signIn();
    }
  }, [status, hasuser]);
  if (hasuser) return children;
};

export default Auth;
