function AddtaskModal({onCancel}) {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center z-10 absolute bottom-12">
        <form action="" className="bg-[#D9D9D9] rounded-lg p-4">
          <p className="text-2xl text-center">Add Task</p>
          <label htmlFor="task">Task</label>
          <br />
          <textarea name="task" className="border-[#00AAA0] border-[1px] rounded-lg px-2 resize-none"></textarea>
          <br />
          <label htmlFor="date">Due Date</label>
          <br />
          <input type="date" name="date" className="border-[#00AAA0] border-[1px] rounded-lg px-2 resize-none"/>
          <br />
          <div className="flex justify-around mt-4">
            <input type="submit" value="Add" className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black"/>
            <button className="bg-[#D55B3E] px-2 rounded-full border-[1px] border-black" type="button" onClick={onCancel}>Cancel</button>
          </div>
          
        </form>
      </div>
    </>
  );
}

export default AddtaskModal;
