import React, { ChangeEvent, FormEvent } from "react";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import { useAuthContext } from "../../auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const LoginContainer = () => {
  const [logData, setLogData] = React.useState({
    email: "",
    password: "",
  });
  const { loginWithEmailAndPassword, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, redirecting...");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setLogData({ ...logData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // добавить проверки
    //
    //

    console.log(logData);

    loginWithEmailAndPassword(logData.email, logData.password);
  };
  return (
    <React.Fragment>
      <LoginForm onSubmit={onSubmit} onChangeInput={onChangeInput} />
    </React.Fragment>
  );
};
