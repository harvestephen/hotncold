import $ from "jquery";

function AddtaskModal({ onCancel }) {
  //get form data | returns an array with object elements
  function getFormData() {
    const formData = $("#addTaskForm").serializeArray();
    const resultObject = {};
    resultObject.task = formData[0].value;
    resultObject.dueDate = formData[1].value;
    return resultObject;
  }

  //send form data to backend | returns a fetch promise
  async function fetchData(data) {
    const customHeader = new Headers();
    customHeader.append("Content-Type", "application/json");
    const request = new Request("/api/add-task", {
      headers: customHeader,
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
    console.log(response);
  }

  //hadle submit button | used getFormData() & fetchData()
  function formHandler(event) {
    event.preventDefault();
    const formData = getFormData();
    const response = fetchData(formData);
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center z-10 absolute bottom-12">
        <form
          id="addTaskForm"
          onSubmit={formHandler}
          className="bg-[#D9D9D9] rounded-lg p-4"
        >
          <p className="text-2xl text-center">Add Task</p>
          <label htmlFor="task">Task</label>
          <br />
          <textarea
            name="task"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2 resize-none"
          ></textarea>
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
            <input
              type="submit"
              value="Add"
              className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black cursor-pointer"
            />
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

export default AddtaskModal;
