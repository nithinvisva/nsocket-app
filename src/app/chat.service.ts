import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Chat } from './interface';
import { UsersList } from './tic-tac-toe/tic-tac-toe.interface';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$ = new BehaviorSubject<{ i?: number, j?: number, userId?: string | null, value?: string, boxId?: number }>({});
  public user$ = new BehaviorSubject<{ userId?: string, name?: string, isActive?: boolean }>({})
  public fromId$ = new BehaviorSubject<{ userId?: string, name?: string, isActive?: boolean }>({})
  public acceptedJoin$ = new BehaviorSubject<{ userId?: string, name?: string, isActive?: boolean, accepted?: boolean }>({})
  public room$ = new BehaviorSubject<{ fromUser?: UsersList, toUser?: UsersList}> ({})
  public chatMessage$ = new BehaviorSubject<Chat>({})
  constructor() { }

  socket = io(environment.url);

  public sendMessage(data: { i: number, j: number, userId: string | null, boxId: number }, to: string) {
    this.socket.emit('message', data, to);
  }

  public getNewMessage = () => {
    this.socket.on('message', (data: { i: number, j: number, userId: string | null, value: string, boxId: number }) => {
      this.message$.next(data);
    });

    return this.message$.asObservable();
  };

  public getUsers = () => {
    this.socket.on('user', (data: { userId?: string, name?: string, isActive?: boolean }) => {
      this.user$.next(data);
    });

    return this.user$.asObservable();
  };

  public registerUser = (data: { userId?: string, name: string, isActive?: boolean }) => {
    this.socket.emit('user', data);
  }

  public askToJoin = (to: { userId?: string, name?: string, isActive?: boolean }) => {
    this.socket.emit('request-join', to);
  }

  public fromId = () => {
    this.socket.on('request-join', (data: { userId?: string, name?: string, isActive?: boolean }) => {
      this.fromId$.next(data);
    });

    return this.fromId$.asObservable();
  };

  public acceptance = (to: { userId?: string, acceptance?: boolean }) => {
    this.socket.emit('accepted-join', to);
  }

  public listenAccepted = () => {
    this.socket.on('accepted-join', (data: { userId?: string, name?: string, isActive?: boolean, accepted?: boolean }) => {
      this.acceptedJoin$.next(data);
    });

    return this.acceptedJoin$.asObservable();
  };

  public getRoomDetails = (user: string) => {
    this.socket.emit('room-deatils', user)
  }
  public listeningRoomDetails = () => {
    this.socket.on('room-deatils', (data: { fromUser?: UsersList, toUser?: UsersList}) => {
      this.room$.next(data);
    });

    return this.room$.asObservable();
  };

  public sendText = (text: Chat) => {
    this.socket.emit('chat', text)
  }
  public gettingText = () => {
    this.socket.on('chat', (data: Chat) => {
      this.chatMessage$.next(data);
    });

    return this.chatMessage$.asObservable();
  };
}