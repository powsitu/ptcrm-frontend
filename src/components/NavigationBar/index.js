import React from "react";
import "./index.css";
import { logoUrl } from "../../config/myVars";

export default function NavigationBar() {
  return (
    <div>
      <img src={logoUrl} alt="JO logo" className="logo-img"></img>
    </div>
  );
}
