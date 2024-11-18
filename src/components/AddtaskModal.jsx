function AddtaskModal() {
  return ( 
    <>
      <form action="">
        <label for="task">Task</label>
        <textarea name="task"></textarea>
        <label for="date">Date</label>
        <input type="date" name="date"/>
        <input type="submit" value="Add"/>
        <button>Cancel</button>
      </form>
    </>
   );
}

export default AddtaskModal;