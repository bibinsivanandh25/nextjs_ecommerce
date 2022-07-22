import { useSession } from "next-auth/react";

// provides the info about loggedin user
const useUserInfo = () => {
  const temp = useSession();
  if (temp && temp?.data?.user) return { ...temp?.data?.user };
  return undefined;
};
export { useUserInfo };
