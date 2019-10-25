import * as React from "react";

export const ContactItem = ({ name, phone }) => {
  return (
    <li className="item">
      <div className="content">
        <h4 className="header">{name}</h4>
        <div className="description">{phone}</div>
      </div>
    </li>
  );
};
