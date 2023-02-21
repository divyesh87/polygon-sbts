import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import AppCss from "../styles/App.module.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Task from "./Task";

function App() {
  const [taskField, settaskField] = useState("");
  const [Tasks, setTasks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setTasks([...Tasks, { id: Tasks.length + 1, taskName: taskField }]);
    settaskField("");
  }

  return (
    <div className={AppCss.app}>
      <div className={AppCss.addtaskContainer}>
        <h1 className={AppCss.head}>Add New Task</h1>
        <Form>
          <Form.Control
            placeholder="Enter a task"
            required
            value={taskField}
            onChange={(e) => settaskField(e.target.value)}
          />
          <Button
            className={AppCss.submitBtn}
            type="submit"
            variant="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </Button>
        </Form>
      </div>

      <div className={AppCss.tasksList}>
        <h1 style={{ margin: "1rem" }}>
          Currently <span style={{ color: "blue" }}>{Tasks.length} </span>Tasks
          Pending
        </h1>
        <div className={AppCss.tasksContainer}>
          {Tasks.map((taskDetails, key) => {
            return (
              <Task
                taskList={Tasks}
                setTaskList={setTasks}
                task={taskDetails}
                key={key}
              />
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
