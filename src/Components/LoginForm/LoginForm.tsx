import React, { FC } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

export interface TLoginForm {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm: FC<TLoginForm> = ({ onSubmit, onChangeInput }) => {
  const navigate = useNavigate();

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
            </label>
            <label>
              <input
                type="text"
                name="password"
                className="log-input  login-form__input-password"
                placeholder="Password"
                onChange={onChangeInput}
              />
            </label>
          </div>
          <div className="login-form__btns">
            <button type="submit" className="btn btn-add btn-log">
              войти
            </button>
            <button
              onClick={() => navigate("/reg")}
              className="btn btn-add btn-log"
            >
              регистрация
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
