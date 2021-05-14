import React from "react";
import { useParams } from "react-router-dom";
import CheckinTable from "../../components/Tables/usercheckins";

export default function UserProfile() {
  const { id } = useParams();
  return (
    <div className="container">
      <CheckinTable userId={id} />
    </div>
  );
}
