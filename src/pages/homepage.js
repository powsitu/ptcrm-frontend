import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Homepage() {
  const [date, set_date] = useState(new Date());
  const onDateChange = (date) => {
    set_date(date);
  };

  const onDateClick = () => {
    console.log("you clicked on a day", date.toISOString().split("T")[0]);
  };

  return (
    <div>
      <Calendar value={date} onChange={onDateChange} onClickDay={onDateClick} />
    </div>
  );
}
