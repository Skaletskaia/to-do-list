import React from "react";

export const LoginForm = () => {
  return (
    <React.Fragment>
      <div className="">
        <form>
          <p></p>
          <label>
            <input type="text" name="name" />
            <input type="text" name="password" />
            <button>войти</button>
          </label>
        </form>
      </div>
    </React.Fragment>
  );
};
