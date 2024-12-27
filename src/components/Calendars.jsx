import { useEffect, useState  } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendars() {

  const [dateArray, setDateArray] = useState([]);
  const initialSelectedDates = [];
  const finalSelectedDates = [];

  //append new item to array (finalSelectedDates)
  const pushDatesFinal = (newItem) => {
    finalSelectedDates.push(newItem);
  }
  //append new item to array (initialSelectedDates)
  const pushDatesInitial = (newItem) => {
    initialSelectedDates.push(newItem);
  }
  //get current user data from backend
  const getUser = async () => {
    const response = await fetch("/api/get-currentUser");
    if (response.ok) {
      return response.json();
    }
  }
  //extract the due dates from the user tasks and append it to array (initialSelectedDates)
  const getDates = async () => {
    const userData = await getUser();
    const tasks = userData.user.task; // array of objects
    for (let i of tasks) {
      pushDatesInitial(i.due_date);
    }
  }
  //convert the format of appended dates at array (initialSelectedDates) for usability
  const convertDates = async () => {
    getDates()
    .then(() => {
        const init = initialSelectedDates.map(date => new Date(date))
        const formattedDates = init.map(date => new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        //update array (initialSelectedDates)
        for (let i of formattedDates) {
          pushDatesFinal(i);
        }
        setDateArray(formattedDates); //rerender the calendar
      })
      
  }
  
  useEffect(() => {
    convertDates();
  }, []);

  return (
    <>
      <Calendar
          tileClassName={({ date, view }) => { //tileClassName prop iterates
              if (view === 'month' && dateArray.some(d => d.getTime() === date.getTime())) {
                return "red-tile";
              }
              return null;
          }}
        />
    </>
  );
}

export default Calendars;
