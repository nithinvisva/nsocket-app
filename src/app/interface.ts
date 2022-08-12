import { UsersList } from "./tic-tac-toe/tic-tac-toe.interface";

export interface Chat{
    fromUser?: UsersList;
    toUser?: UsersList;
    message?: string;
}