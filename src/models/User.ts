
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

export function isUser(user: User): user is User {
    let arg = (user as User);
    return arg.firstName !== undefined
        && arg.lastName !== undefined
        && arg.age !== undefined;
}