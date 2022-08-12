import React from "react";
 
function CustomModal(props) {

  return (
    <div className="CustomModal">
      <div className="Custom_Modal_body" >
        {props.children}
      </div>
    </div>
  );
}
 
export default CustomModal;
