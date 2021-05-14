export type UserFormButtonType = 'edit' | 'add';
import { User } from './models/User';

export interface UsersInterface {
    users: User[];
}

export interface UserInterface {
    user: User;
}

export interface EditDeleteButtonClicks {
    editClick: (user: User) => void;
}