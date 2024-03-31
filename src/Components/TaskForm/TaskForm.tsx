import React, { FC, FormEvent, ChangeEvent } from "react";
import "./TaskForm.css";
import { addTask, updTask } from "../../api";
import { IList } from "../../types";
import { updDate, currentDateCheck } from "../../utils";
import { useAuthContext } from "../../auth/AuthContextProvider";

export interface ITaskForm {
  setTaskForm: (value: React.SetStateAction<boolean>) => void;
  setUpdList: (value: React.SetStateAction<boolean>) => void;
  dataTask: IList;
  taskId: string;
}

export const TaskForm: FC<ITaskForm> = ({
  setTaskForm,
  setUpdList,
  dataTask,
  taskId,
}) => {
  const closeTaskForm = () => {
    setTaskForm(false);
  };
  const [inputValues, setInputValues] = React.useState<{
    task: string;
    date: string;
    userID: string;
  }>({
    task: "",
    date: "",
    userID: "",
  });
  // const [taskError, setTaskError] = React.useState<boolean>(false);
  const { user } = useAuthContext();
  const [errorsInput, setErrorsInput] = React.useState<{
    task: string[];
    date: string[];
  }>({
    task: [],
    date: [],
  });

  React.useEffect(() => {
    if (user) {
      setInputValues({
        task: dataTask.task,
        date: updDate(dataTask.date.seconds, dataTask.date.nanoseconds),
        userID: user.uid,
      });
    }
  }, [dataTask, user]);

  // на каждое изменение инпута, перезаписываем inputValues
  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input = event.target.name;
    const value = event.target.value;

    setInputValues({ ...inputValues, [input]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors: {
      task: string[];
      date: string[];
    } = {
      task: [],
      date: [],
    };

    // поле является обязательным
    if (inputValues.task === "") {
      newErrors.task.push("Это поле является обязательным");
      formIsValid = false;
    }

    // только пробелы
    if (inputValues.task.trim().length === 0) {
      newErrors.task.push("Нельзя отправлять только пробелы");
      formIsValid = false;
    }

    // дата из прошлого
    if (currentDateCheck(inputValues.date)) {
      newErrors.date.push("Нельяза выбирать дату из прошлого");
      formIsValid = false;
    }

    setErrorsInput(newErrors);

    //проверки прошли
    if (formIsValid) {
      // если есть ID, то обновлеям данные
      if (taskId) {
        await updTask(taskId, inputValues);
        setTaskForm(false);
        setUpdList((value) => !value);
        return;
      }

      // иначе создаем новую задачу
      await addTask(inputValues);
      setTaskForm(false);
      setUpdList((value) => !value);
    }
  };

  return (
    <React.Fragment>
      <form className="form-container" onSubmit={onSubmit}>
        <div className="form-container__internal-div">
          <label>
            <textarea
              name="task"
              className="textarea-task input-task-line"
              placeholder="Напиши свою задачу"
              onChange={onChangeInput}
              value={inputValues.task}
            />

            {errorsInput.task ? (
              <React.Fragment>
                <br />
                <span className="error-message">{errorsInput.task[0]}</span>
              </React.Fragment>
            ) : null}
          </label>

          <div className="form-container__footer">
            <label className="label-date-form">
              <input
                type="date"
                name="date"
                className="input-date"
                onChange={onChangeInput}
                value={inputValues.date}
              />

              {errorsInput.date ? (
                <React.Fragment>
                  <br />
                  <span className="error-message">{errorsInput.date[0]}</span>
                </React.Fragment>
              ) : null}
            </label>

            <div className="form-container__btns">
              <button
                type="reset"
                className="btn btn-cancel"
                onClick={closeTaskForm}
              >
                Отменить
              </button>
              <button type="submit" className="btn btn-add">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
