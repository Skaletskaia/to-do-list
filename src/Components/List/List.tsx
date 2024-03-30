import React from "react";
import "./List.css";
import { getList, deleteTask, getTask } from "../../api";
import { updDate } from "../../utils";
import { IList } from "../../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { useAuthContext } from "../../auth/AuthContextProvider";

export const List = () => {
  const [dataList, setDataList] = React.useState<IList[]>([]); // список со всеми задачами
  const [taskForm, setTaskForm] = React.useState<boolean>(false); // отображение формы задачи
  const [updList, setUpdList] = React.useState(false);
  const [dataTask, setDataTask] = React.useState<IList>({
    id: "",
    task: "",
    done: false,
    date: {
      nanoseconds: 0,
      seconds: 0,
    },
  });
  const [taskId, setTaskId] = React.useState<string>(""); // ID выбранной задачи
  const { user } = useAuthContext();

  React.useEffect(() => {
    console.log("обновляем список");
    console.log(user);
    if (user) {
      getList(user.uid).then((data: IList[] | undefined) => {
        if (data) {
          setDataList(data);
        }
      });
    }
  }, [updList]);

  const showTaskForm = () => {
    setTaskForm(true);
    // сбрасываю значения полей задачи

    setDataTask({
      id: "",
      task: "",
      done: false,
      date: {
        nanoseconds: 0,
        seconds: 0,
      },
    });
    setTaskId("");
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setUpdList((value) => !value);
  };

  const editTask = async (id: string) => {
    console.log("редактируем элемент");
    setTaskId(id);
    await getTask(id).then((data) => {
      console.log(data);
      if (data) {
        setDataTask(data);
      }
    });

    setTaskForm(true);
  };

  return (
    <React.Fragment>
      <div className="list">
        <div className="list__header">
          <h2>To-do list</h2>
          <button className="btn btn-add" onClick={showTaskForm}>
            Добавить
          </button>
        </div>
        <hr className="line" />
        {dataList.length > 0 ? (
          dataList.map((item: IList) => (
            <div className="list__item" key={item.id}>
              <form className="list__item-container">
                <label>
                  <input type="checkbox" name="done" />
                </label>
                <div className="list__item-info">
                  <label>
                    <input
                      type="text"
                      name="task"
                      className="input-task"
                      value={item.task}
                      disabled
                    />
                  </label>
                  {isNaN(item.date.seconds) ||
                  isNaN(item.date.nanoseconds) ? null : (
                    <label className="label-date">
                      <span className="span-date"> до</span>
                      <input
                        type="date"
                        name="date"
                        className="input-date"
                        value={updDate(
                          item.date.seconds,
                          item.date.nanoseconds,
                        )}
                        disabled
                      />
                    </label>
                  )}
                </div>
                <div className="list__item-btns">
                  <button
                    type="button"
                    className="btn-list"
                    onClick={() => editTask(item.id)}
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    className="btn-list"
                    onClick={() => removeTask(item.id)}
                  >
                    x
                  </button>
                </div>
              </form>
              <hr className="line" />
            </div>
          ))
        ) : (
          <p>Нажми на кнопочку Добавить</p>
        )}
      </div>
      {taskForm ? (
        <TaskForm
          setTaskForm={setTaskForm}
          setUpdList={setUpdList}
          dataTask={dataTask}
          taskId={taskId}
        />
      ) : null}
    </React.Fragment>
  );
};
