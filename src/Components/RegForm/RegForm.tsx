import React, { FC } from "react";
import "./RegForm.css";
import { useNavigate } from "react-router-dom";

export interface TRegForm {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorsInput: {
    email: string[];
    password: string[];
    passwordRepeat: string[];
    backErrors: string[];
  };
}

export const RegForm: FC<TRegForm> = ({
  onSubmit,
  onChangeInput,
  errorsInput,
}) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="login-form">
        <form className="login-form__form" onSubmit={onSubmit}>
          <div className="login-form__inputs">
            <label>
              <input
                type="email"
                name="email"
                className="log-input login-form__input-name"
                placeholder="Email"
                onChange={onChangeInput}
              />
              {errorsInput.email ? (
                <React.Fragment>
                  <br />
                  <span className="error-message">{errorsInput.email[0]}</span>
                </React.Fragment>
              ) : null}
            </label>
            <label>
              <input
                type="password"
                name="password"
                className="log-input  login-form__input-password"
                placeholder="Придумайте пароль"
                onChange={onChangeInput}
              />
              {errorsInput.password ? (
                <React.Fragment>
                  <br />
                  <span className="error-message">
                    {errorsInput.password[0]}
                  </span>
                </React.Fragment>
              ) : null}
            </label>
            <label>
              <input
                type="password"
                name="passwordRepeat"
                className="log-input  login-form__input-password"
                placeholder="Повторите пароль"
                onChange={onChangeInput}
              />
              {errorsInput.passwordRepeat ? (
                <React.Fragment>
                  <br />
                  <span className="error-message">
                    {errorsInput.passwordRepeat[0]}
                  </span>
                </React.Fragment>
              ) : null}
            </label>

            {errorsInput.backErrors ? (
              <React.Fragment>
                <span className="error-message">
                  {errorsInput.backErrors[0]}
                </span>
              </React.Fragment>
            ) : null}
          </div>
          <div className="login-form__btns">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="btn btn-add"
            >
              Уже есть аккаунт
            </button>
            <button type="submit" className="btn btn-add">
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
