import React, { FC } from "react";
import "./RegForm.css";

export interface TRegForm {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegForm: FC<TRegForm> = ({ onSubmit, onChangeInput }) => {
  return (
    <React.Fragment>
      <div className="login-form">
        <form className="login-form__form" onSubmit={onSubmit}>
          <div className="login-form__inputs">
            <label>
              <input
                type="text"
                name="email"
                className="log-input login-form__input-name"
                placeholder="Email"
                onChange={onChangeInput}
              />
              {/* <span className="error-message">{getErrorMessage("email")}</span> */}
            </label>
            <label>
              <input
                type="text"
                name="password"
                className="log-input  login-form__input-password"
                placeholder="Придумайте пароль"
                onChange={onChangeInput}
              />
            </label>
            <label>
              <input
                type="text"
                name="passwordRepeat"
                className="log-input  login-form__input-password"
                placeholder="Повторите пароль"
                onChange={onChangeInput}
              />
            </label>
          </div>
          <div className="login-form__btns">
            <button type="submit" className="btn btn-add">
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
