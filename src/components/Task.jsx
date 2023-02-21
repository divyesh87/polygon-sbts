import React from "react";
import TaskCss from "../styles/Task.module.css";
import { MdDelete, MdCheck } from "react-icons/md";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Task({ task, setTaskList, taskList }) {
  function handleRemove(sign) {
    const newState = taskList.filter((taskDetail) => {
      return taskDetail.id !== task.id;
    });

    if (sign === 1) {
      toast.success("Task Completed!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Unfinished task deleted!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setTaskList(newState);
  }
  return (
    <>
      <div className={TaskCss.taskContainer}>
        <h2 className={TaskCss.header}>{task.taskName}</h2>
        <div className={TaskCss.iconsContainer}>
          <MdCheck onClick={() => handleRemove(1)} className={TaskCss.icon} />
          <MdDelete onClick={() => handleRemove(-1)} className={TaskCss.icon} />
        </div>
      </div>  
    </>
  );
}

export default Task;
