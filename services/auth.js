import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children }) => {
  const { data: session, status } = useSession({ required: true });
  const hasuser = !!session?.user;

  useEffect(() => {
    if (status) return;
    if (!hasuser || session?.error) {
      signIn();
    }
  }, [hasuser]);
  if (hasuser) return children;
};

export default Auth;
