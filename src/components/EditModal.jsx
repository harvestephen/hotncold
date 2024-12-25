import $ from "jquery";
import { useState } from 'react'

function EditModal({ onCancel, id, task }) {

  async function update(event) {
    event.preventDefault();
    const formData = $("#editModal").serializeArray();
    const newTask = $("#myTextarea").val();
    const myHeaders = new Headers();
    console.log(newTask + " " + id + " " + formData[1].value);
    myHeaders.append("Content-Type", "application/json");
  
    const request = new Request("/api/update", {
      headers: myHeaders,
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ task: newTask, id: id, date: formData[1].value }),
    });
  
    const response = await fetch(request);
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center z-10 absolute bottom-12 ">
        <form
          className="bg-[#D9D9D9] rounded-lg p-4 border-[#2af3e6] shadow-2xl"
          id="editModal"
          onSubmit={update}
        >
          <p className="text-2xl text-center">Edit Task</p>
          <label htmlFor="task">Task</label>
          <br />
          <textarea
            name="task"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2 resize-none"
            id="myTextarea"
          >{task}</textarea>
          <br />
          <label htmlFor="date">Due Date</label>
          <br />
          <input
            type="date"
            name="date"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2 resize-none"
          />
          <br />
          <div className="flex justify-around mt-4">
            <button
              type="submit"
              className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black cursor-pointer"
            >
              Edit
            </button>
            <button
              className="bg-[#D55B3E] px-2 rounded-full border-[1px] border-black"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditModal;
