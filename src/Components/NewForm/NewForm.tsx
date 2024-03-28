import React, { FC, FormEvent, ChangeEvent } from "react";
import "./NewForm.css";
import { addTask, updTask } from "../../api";
import { IList } from "../../types";
import { updDate } from "../../utils";

export interface INewForm {
  setTaskForm: (value: React.SetStateAction<boolean>) => void;
  setUpdList: (value: React.SetStateAction<boolean>) => void;
  dataTask: IList;
  taskId: string;
}

export const NewForm: FC<INewForm> = ({
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
  }>({
    task: "",
    date: "",
  });
  const [taskError, setTaskError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setInputValues({
      task: dataTask.task,
      date: updDate(dataTask.date.seconds, dataTask.date.nanoseconds),
    });
  }, [dataTask]);

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

    if (inputValues.task === "") {
      const taskInput = event.currentTarget.elements[
        "task"
      ] as HTMLInputElement;

      taskInput.classList.add("error"); // добавили красную обводку
      setTaskError(true);

      return;
    }

    //проверки прошли

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
  };

  return (
    <React.Fragment>
      <form className="form-container" onSubmit={onSubmit}>
        <div className="form-container__internal-div">
          <label>
            <textarea
              name="task"
              className="textarea-task"
              placeholder="Напиши свою задачу"
              onChange={onChangeInput}
              value={inputValues.task}
            />

            {taskError ? (
              <React.Fragment>
                <br />
                <span className="span-error">
                  Это поле является обязательным
                </span>
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
