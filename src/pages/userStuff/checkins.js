import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CHECKINS_FOR_USER } from "../../store/checkins/gql_checkins";

export default function checkins() {
  return (
    <div>
      This is gonna be the page for the users to add their checkin data for
      their coach
    </div>
  );
}
