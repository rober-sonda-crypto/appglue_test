import * as React from "react";
import { User } from "./User";
import { UsersInterface, EditDeleteButtonClicks } from "../types";

const Users = (props: UsersInterface & EditDeleteButtonClicks) => {
  return (
    <table className="table table-hover table-striped table-bordered">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users &&
          props.users.map((user) => (
            <User
              user={user}
              key={user.id}
              editClick={props.editClick}
            />
          ))}
      </tbody>
    </table>
  );
};

export { Users };
