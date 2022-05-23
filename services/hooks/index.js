import { useSession } from "next-auth/react";

//provides the info about loggedin user
const useUserInfo = () => {
  const temp = useSession();
  return { ...temp.data.user };
};
export { useUserInfo };
