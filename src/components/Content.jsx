import { useState, useEffect } from "react";
import Calendars from "./Calendars";
import { AddtaskModal, EditModal } from "./Components";
import $ from "jquery";

export default function Content() {
  const [Addmodal, setAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [islogged, setIsLogged] = useState();
  const [render, rerender] = useState(false);
  const [allTask, setTask] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState();
  const [editTask, setEditTask] = useState();

  const addHandler = () => {
    if (Addmodal === false) {
      $("#addModal").fadeIn(300);
      setAddModal(true);
    }
  };
  const cancelAddHandler = () => {
    $("#addModal").fadeOut(300);
    setAddModal(false);
  };

  async function deleteButton(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const request = new Request("/api/delete-task", {
      headers: myHeaders,
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({id: id}),
    });
  
    const response = await fetch(request);
    if (response.ok) {
      window.location.reload();
    }
  }

  //edit button handler
  const editHandler = (item, id) => {
    setEditMode(true);
    setEditId(id);
    setEditTask(item);
  };

  const editHandlerFalse = () => {
    setEditMode(false);
  };

  //function to set user
  function setUser(arg) {
    setCurrentUser(arg);
  }

  //function to update tasks
  async function updateTask() {
    const response = await fetch("/api/get-currentUser");
    if (response.ok) {
      return response.json();
    }
  }

  //function to check if logged in
  async function checkLog() {
    const response = await fetch("/api/is-log");
    if (response.ok) {
      return response.json();
    }
  }

  //function to get task
  async function getTasks() {
    const response = await fetch("/api/get-currentUser");
    if (response.ok) {
      return response.json();
    }
  }

  //function to set new tasks
  function setTasks(arg) {
    currentUser.task = arg;
  }

  //function to convert task to html
  function mapTasks(array) {
    console.log(array);
    let date = new Date();
    const oneWeekLater = new Date(date);
    oneWeekLater.setDate(date.getDate() + 7);
    let htmlTask = array.map((item) => (
      <div className="flex flex-row justify-between max-w-[100rem] w-full bg-[#D9D9D9] rounded-sm px-2 py-2 mb-1">
        <div>
          <input type="checkbox" />
          <span className="text-sm pl-4">{item.task}</span>
        </div>
        <div className="flex flex-row gap-3 mr-2">
          
          { 
            (new Date(item.due_date)) > date && (new Date(item.due_date)) <= oneWeekLater ? <p className="text-sm bg-[#D55B3ECC] rounded-full px-2">Hot</p> : <p className="text-sm bg-[#00AAA0] rounded-full px-2">Cold</p>
          }
          
          <button
            className="p-1 bg-[#B6CFCF80] rounded-md h-6"
            onClick={() => {
              editHandler(item.task, item.task_id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
            </svg>
          </button>
          <button
            className="p-1 bg-[#D55B3ECC] rounded-md h-6"
            onClick={() => {
              deleteButton(item.slice(-5).trim());
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
            </svg>
          </button>
        </div>
      </div>
    ));
    setTasks(htmlTask);
    setTask(htmlTask);
    rerender(!render);
  }

  //if logged in get task
  useEffect(() => {
    checkLog()
      .then((result) => {
        if (result.logStatus === true) {
          getTasks()
            .then((resultTask) => {
              setUser(resultTask.user);
              mapTasks(resultTask.user.task);
              setIsLogged(true);
            })
            .catch((err) => {
              console.log(err);
            });

          updateTask()
            .then((resultTasks) => {})
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [editMode]);

  return (
    <>
      {editMode ? (
        <EditModal onCancel={editHandlerFalse} id={editId} task={editTask} />
      ) : (
        ""
      )}

      <div className="hidden" id="addModal">
        <AddtaskModal onCancel={cancelAddHandler} />
      </div>
      <div className="max-w-full flex items-center flex-col mx-8">
        {/**Button */}
        <div className="flex gap-3 max-w-[100rem] w-full mx-8 my-8">
          <button className="text-[#00AAA0] font-bold bg-[#D9D9D9] py-1 px-4 rounded-full drop-shadow-lg">
            Task
          </button>
        </div>
        <div className="flex flex-row justify-between max-w-[100rem] w-full">
          <div className="flex-1">
            {/**Toolbar */}
            <div className="flex max-w-[100rem] w-full">
              <div className="flex justify-between max-w-[100rem] w-full">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="ml-2" /> All
                  <button
                    className="bg-[#D9D9D9] mx-4 py-1 px-3 rounded-sm drop-shadow-lg font-bold"
                    onClick={addHandler}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-row gap-3 mr-4">
                  <div className="p-1 bg-[#B6CFCF80] rounded-md h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
                    </svg>
                  </div>
                  <div className="p-1 bg-[#D55B3ECC] rounded-md h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <hr className="max-w-[100rem] w-full my-2" />

            {/**Tasks */}
            {allTask}
          </div>
          <div className="w-1/4 rounded-lg ml-8 h-96 ">
            <Calendars />
          </div>
        </div>
      </div>
    </>
  );
}
