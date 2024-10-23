import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "../style/post.css";

const Post = (props) => {
  if(!props.isOpen) return null;
// props가 변경될 때마다 콘솔에 찍히도록 설정
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.handleComplete({ address: fullAddress });
  };

  const style = {
    width: "400px",
    height: "600px",
    border: "1.4px solid #333333",
  };
  return (
    <div>
      <DaumPostcode
        className="postmodal"
        autoClose
        onComplete={complete}
        style={style}
      />
    </div>
  );
};

export default Post;
