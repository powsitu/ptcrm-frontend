import React from "react";
import CheckinTable from "../../components/Tables/usercheckins";
import AddCheckin from "../../components/AddCheckin";

export default function Checkins() {
  return (
    <div className="container">
      <CheckinTable />
      <AddCheckin />
    </div>
  );
}
