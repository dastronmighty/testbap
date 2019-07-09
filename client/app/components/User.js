import React from "react";

const getAge = createdDate => {
  let now = new Date().getTime();
  let age = now - createdDate;
  age = Math.ceil(age / 86400000);
  return age;
};

const User = props => (
  <tr>
    <td>{props.number}</td>
    <td>Lead: {props.data.leadid.substring(0, 8)}</td>
    <td>{getAge(new Date(props.data.createdon).getTime())}</td>
    <td>{props.data.statuscode === 3 ? "Closed" : "Open"}</td>
  </tr>
);

export default User;
