// import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const handleSubmit = () => {
    signIn("credentials", {
      username: formValues.username,
      password: formValues.password,
      callbackUrl: `/loginerror`,
    });
  };

  return (
    <div>
      <InputBox
        value={formValues.username}
        label="user name"
        onInputChange={(e) => {
          setFormValues((prev) => ({ ...prev, username: e.target.value }));
        }}
      />
      <InputBox
        value={formValues.password}
        label="password"
        onInputChange={(e) => {
          setFormValues((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      <ButtonComponent label="Submit" onBtnClick={handleSubmit} />
    </div>
  );
};
export default Login;
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}
