import * as React from "react";
import { User } from "./models/User";
import { Users } from "./components/Users";
import { UserForm } from "./components/UserForm";
import { UserFormButtonType, UsersInterface } from "./types";
import { DefaultApi } from "./typescriptFetch/apis/DefaultApi";
import { Configuration } from "./typescriptFetch/runtime";

const api = new DefaultApi(
  new Configuration({basePath: "http://localhost:4000"})
);

interface MainState {
  showUserForm: boolean;
  userFormUser?: User;
  userFormButtonType: UserFormButtonType;
}

export class App extends React.Component<
  {},
  Partial<MainState & UsersInterface>
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [] as User[],
      showUserForm: false,
      userFormButtonType: "add",
    };

    this.editClick = this.editClick.bind(this);
    this.formButtonClick = this.formButtonClick.bind(this);
    this.newUserClick = this.newUserClick.bind(this);
    this.userFormCancelClick = this.userFormCancelClick.bind(this);
  }

  editClick(user: User) {
    this.setState({
      showUserForm: true,
      userFormUser: user,
      userFormButtonType: "edit",
    });
  }

  async formButtonClick(user: User) {
    if (this.state.userFormButtonType === 'edit') {
        await api.userServiceUpdateUser(user.id, user);
    } else {
        await api.userServiceCreateUser(user);
    }
    await this.loadUsers();
    this.setState({ showUserForm: false });
  }

  async componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    let users = await api.userServiceAllUsers();
    this.setState({ users: users });
  }

  newUserClick() {
    this.setState({
      showUserForm: true,
      userFormUser: undefined,
      userFormButtonType: "add",
    });
  }

  userFormCancelClick() {
    this.setState({ showUserForm: false });
  }

  render() {
    return (
      <div className="container">
        <h1>React People with TypeScript</h1>
        <button className="btn btn-primary" onClick={this.newUserClick}>
          New Person
        </button>
        <br />
        {this.state.showUserForm && (
          <UserForm
            user={this.state.userFormUser}
            buttonType={this.state.userFormButtonType!}
            buttonClick={this.formButtonClick}
            cancelClick={this.userFormCancelClick}
          />
        )}
        <Users users={this.state.users!} editClick={this.editClick} />
      </div>
    );
  }
}
