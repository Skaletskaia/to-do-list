import React, { ChangeEvent, FormEvent } from "react";
import { RegForm } from "../../Components/RegForm/RegForm";
import { useAuthContext } from "../../auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export interface TError {
  nameInput: string;
  error: string;
}

export const RegContainer = () => {
  const [regData, setRegData] = React.useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errorList, setErrorList] = React.useState<TError[]>([]);
  const { isAuthenticated, createUser } = useAuthContext(); // нужно функцию передать
  const navigate = useNavigate();

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setRegData({ ...regData, [name]: value });
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, redirecting...");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // проверка - пароль дважды написан верно
    if (regData.password !== regData.passwordRepeat) {
      console.log("разные парли");
      setErrorList((prevErList) => [
        ...prevErList,
        {
          nameInput: "passwordRepeat",
          error: "Вы ввели разные пароли",
        },
      ]);

      return;
    }

    console.log(regData);

    // если все ок - создаем пользователя и получаем его -- дальше надо будет по его данным авторизоваться и данные отобразить
    try {
      await createUser(regData.email, regData.password);

      console.log("создали нового пользователя");
    } catch (error) {
      // выводить ошибку пользователю!!

      console.log(error);
    }
  };

  console.log(errorList);
  return (
    <React.Fragment>
      <RegForm onSubmit={onSubmit} onChangeInput={onChangeInput} />
    </React.Fragment>
  );
};
