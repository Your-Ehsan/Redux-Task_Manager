import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardSlice from "../services/boardSlice";
import { cross } from "../assets/img";

// eslint-disable-next-line react/prop-types
function CreateModel({
  setBoardModel,
  type,
  device,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [FirstLoad, setFirstLoad] = useState(true);
  const [Valid, setValid] = useState(true);

  const activeBoard = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = activeBoard.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];

  const [Status, setStatus] = useState(columns[prevColIndex].name);

  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: self.crypto.randomUUID() },
    { title: "", isCompleted: false, id: self.crypto.randomUUID() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((oldTask) => {
      const Subtask = [...oldTask].find((subTask) => {
        subTask.id === id;
      });
      Subtask.title = newValue;
      return [...oldTask];
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setValid(false);
    if (!Title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setValid(true);
    return true;
  };

  if (type === "edit" && FirstLoad) {
    setSubtasks(
      task.subTasks.map((subtask) => {
        return { ...subtask, id: self.crypto.randomUUID() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((oldTask) => {
      oldTask.filter((task) => task.id === id);
    });
  };
  const onSubmit = (type) => {
    type === "add"
      ? dispatch(
          boardSlice.actions.addTask({
            Title,
            Description,
            subtasks,
            Status,
            newColIndex,
          })
        )
      : dispatch(
          boardSlice.actions.editTask({
            Title,
            Description,
            subtasks,
            Status,
            taskIndex,
            prevColIndex,
            newColIndex,
          })
        );
  };
  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return null;
        }
        setBoardModel(false);
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add new"}</h3>
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
        </div>
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        {/* Subtasks */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Subtasks
          </label>

          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                placeholder=" e.g Take coffee break"
              />
              <img
                src={cross}
                onClick={() => {
                  onDelete(subtask.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}

          <button
            className=" w-full items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: self.crypto.randomUUID() },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={Status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
            {type === "edit" ? " save edit" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateModel;
