import React, { ChangeEvent, FormEvent } from "react";
import { RegForm } from "../../Components/RegForm/RegForm";
import { useAuthContext } from "../../auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const RegContainer = () => {
  const [regData, setRegData] = React.useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const { isAuthenticated, createUser } = useAuthContext(); // нужно функцию передать
  const navigate = useNavigate();
  const [errorsInput, setErrorsInput] = React.useState<{
    email: string[];
    password: string[];
    passwordRepeat: string[];
    backErrors: string[];
  }>({
    email: [],
    password: [],
    passwordRepeat: [],
    backErrors: [],
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setRegData({ ...regData, [name]: value });
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors: {
      email: string[];
      password: string[];
      backErrors: string[];
      passwordRepeat: string[];
    } = {
      email: [],
      password: [],
      backErrors: [],
      passwordRepeat: [],
    };

    // email является обязательным
    if (regData.email === "") {
      newErrors.email.push("Это поле является обязательным");
      formIsValid = false;
    }

    // password является обязательным
    if (regData.password === "") {
      newErrors.password.push("Это поле является обязательным");
      formIsValid = false;
    }

    // password является обязательным
    if (regData.passwordRepeat === "") {
      newErrors.passwordRepeat.push("Это поле является обязательным");
      formIsValid = false;
    }

    // проверка - пароль дважды написан верно
    if (regData.password !== regData.passwordRepeat) {
      newErrors.passwordRepeat.push("Вы ввели разные пароли");
      formIsValid = false;
    }

    setErrorsInput(newErrors);

    // если все ок - создаем пользователя
    if (formIsValid) {
      try {
        await createUser(regData.email, regData.password);
      } catch (error) {
        // выводить ошибку пользователю!!

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = (error as any).message as string;

        setErrorsInput((prevState) => ({
          ...prevState,
          backErrors: [...prevState.backErrors, message],
        }));
      }
    }
  };

  return (
    <React.Fragment>
      <RegForm
        onSubmit={onSubmit}
        onChangeInput={onChangeInput}
        errorsInput={errorsInput}
      />
    </React.Fragment>
  );
};
