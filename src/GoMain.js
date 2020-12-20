import React from "react";
import { useHistory } from "react-router-dom";
import { LinkButton } from "./Style";

export function GoMain({ClickCheck}) {
    const history = useHistory();
    const GoMain = () => {
      if(ClickCheck != null)
        ClickCheck(true);
      history.push("/pihMain");
    };
  
    return (
      <div>
          <LinkButton onClick={GoMain}>Home</LinkButton>
      </div>
    );
}