import React from "react";
import reader from "../assets/img/reader.png"
import {Media} from "reactstrap";

const Header = () => {
  return (
    <div className="d-flex mb-4">
      <div className="align-self-center me-2">
        <Media width={50} src={reader} alt="Logo"/>
      </div>
      <h1 className="m-0">myBookVentory</h1>
    </div>
  )
}

export default Header;
