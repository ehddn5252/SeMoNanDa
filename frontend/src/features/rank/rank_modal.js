import React from "react";
 
function RankModal(props) {

  return (
    <div className="RankModal">
      <div className="Rank_Modal_body" >
        {props.children}
      </div>
    </div>
  );
}
 
export default RankModal;
