import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$= new BehaviorSubject<{i?:number,j?:number,userId?:string| null, value?:string, boxId?:number}>({});
  constructor() {}

  socket = io(environment.url);

  public sendMessage(data: {i:number,j:number,userId:string| null, boxId:number}) {
    this.socket.emit('message', data);
  }

  public getNewMessage = () => {
    this.socket.on('message', (data: {i:number,j:number,userId:string| null, value:string, boxId:number}) =>{
      this.message$.next(data);
    });
    
    return this.message$.asObservable();
  };
}