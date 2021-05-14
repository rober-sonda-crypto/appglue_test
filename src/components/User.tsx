import * as React from "react";
import { UserInterface, EditDeleteButtonClicks } from "../types";

const User = (props: UserInterface & EditDeleteButtonClicks) => {
  return (
    <tr>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.age}</td>
      <td>
        <div className="row">
          <div className="col-md-3">
            <button
              className="btn btn-warning"
              onClick={() => props.editClick(props.user)}
            >
              Edit
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export { User };
