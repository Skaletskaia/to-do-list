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
  const [errorsInput, setErrorsInput] = React.useState<{
    email: string[];
    password: string[];
    backErrors: string[];
  }>({
    email: [],
    password: [],
    backErrors: [],
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setLogData({ ...logData, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors: {
      email: string[];
      password: string[];
      backErrors: string[];
    } = {
      email: [],
      password: [],
      backErrors: [],
    };

    // email является обязательным
    if (logData.email === "") {
      newErrors.email.push("Это поле является обязательным");
      formIsValid = false;
    }

    // password является обязательным
    if (logData.password === "") {
      newErrors.password.push("Это поле является обязательным");
      formIsValid = false;
    }

    setErrorsInput((prevState) => ({
      ...prevState,
      ...newErrors,
    }));

    if (formIsValid) {
      try {
        await loginWithEmailAndPassword(logData.email, logData.password);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = (error as any).message as string;

        setErrorsInput((prevState) => ({
          ...prevState,
          backErrors: [message],
        }));
      }
    }
  };

  return (
    <React.Fragment>
      <LoginForm
        onSubmit={onSubmit}
        onChangeInput={onChangeInput}
        errorsInput={errorsInput}
      />
    </React.Fragment>
  );
};
