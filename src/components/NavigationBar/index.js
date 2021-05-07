import React from "react";
import { logoUrl } from "../../config/myVars";

export default function NavigationBar() {
  return (
    <div>
      <img src={logoUrl} alt="JO logo"></img>
    </div>
  );
}
