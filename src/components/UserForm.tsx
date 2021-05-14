import * as React from "react";
import { User as UserEntity } from "../models/User";
import { UserFormButtonType, UserInterface } from "../types";

interface UserFormProps {
  user?: UserEntity;
  buttonClick: (user: UserEntity) => void;
  buttonType: UserFormButtonType;
  cancelClick: () => void;
}

export class UserForm extends React.Component<
  UserFormProps,
  Partial<UserInterface>
> {
  constructor(props: UserFormProps) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.state = {
      user: props.user
        ? { ...props.user }
        : { id: 0, firstName: "", lastName: "", age: 0 },
    };
  }

  buttonClick(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();
    this.props.buttonClick(this.state.user!);
  }

  componentWillReceiveProps(props: UserFormProps) {
    this.setState({
      user: props.user
        ? { ...props.user }
        : { id: 0, firstName: "", lastName: "", age: 0 },
    });
  }

  onTextChange(e: any) {
    let user: any = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <input
          className="form-control"
          name="firstName"
          onChange={this.onTextChange}
          type="text"
          value={this.state.user!.firstName}
        ></input>
        <input
          name="lastName"
          onChange={this.onTextChange}
          className="form-control"
          type="text"
          value={this.state.user!.lastName}
        />
        <input
          name="age"
          onChange={this.onTextChange}
          className="form-control"
          type="text"
          value={this.state.user!.age}
        />
        <button
          className={
            this.props.buttonType == "edit"
              ? "btn btn-success"
              : "btn btn-primary"
          }
          onClick={this.buttonClick}
        >
          {this.props.buttonType == "edit" ? "Update" : "Add"}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.cancelClick}
        >
          Cancel
        </button>
      </div>
    );
  }
}
