import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CHECKINS_FOR_USER } from "../../store/checkins/gql_checkins";
import CheckinTable from "../../components/Tables/usercheckins";

export default function Checkins() {
  return (
    <div className="container">
      <CheckinTable />
    </div>
  );
}
