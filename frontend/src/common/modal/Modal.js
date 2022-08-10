import React from "react";
 
function Modal(props) {
 
  return (
    <div className="Modal">
      <div className="modalBody" >
        {props.children}
      </div>
    </div>
  );
}
 
export default Modal;
