import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import * as _ from 'lodash';
import { UsersList } from './tic-tac-toe.interface';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  @Input()toUser! :string;
  @Input()fromUser! :string;
  fromUserData!:UsersList;
  toUserData!: UsersList
  xCount:number= 0;
  yCount:number =0;
  ticktak = [0, 1, 2];
  _=_;
  isGameOver :Array<any>=[]
  messageList:Array<{i:number,j:number,userId:string| null,value?:string, boxId:number}>=[]
  tictactoeList: string[][] = [['', '', ''], ['', '', ''], ['', '', '']]
  winningCombination=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[3,4,5],[2,5,8],[6,7,8]]
  constructor(private chatService: ChatService) {
  }
  ngOnInit() {
    this.generateMessageList();
    const user= this.fromUser ? this.fromUser : this.toUser
    this.chatService.getRoomDetails(user)
    this.chatService.getNewMessage().subscribe((message: {i?:number,j?:number,userId?:string| null,value?:string, boxId?:number}) => {
      if(message?.i != undefined && message?.j != undefined && message?.value !=undefined ){
      this.messageList.map((data)=>{
        if(data.boxId == message.boxId){
          data.value = message.value
        }
      })
      message.value == 'X'? this.xCount++: this.yCount++;
      this.tictactoeList[message.i][message.j] = message.value
      }
      this.isGameOver= this.checkWinner()
    })
    this.chatService.listeningRoomDetails().subscribe((room:{fromUser?: UsersList, toUser?:UsersList})=>{
      console.log(room)
      if(room?.fromUser != undefined && room?.toUser != undefined ){
        this.fromUserData = room.fromUser;
        this.toUserData = room.toUser
      }
    })
  }

  sendData(data: { i: number, j: number, userId: string | null, value: string, boxId: number }) {
    this.chatService.sendMessage(data, this.toUser);
  }
  handleSquareClick(i: number, j: number) {
    const data = {
      i: i,
      j: j,
      boxId: this.getBoxId(i, j),
      userId: '',
      value: ''
    }
    this.sendData(data);
  }
  generateMessageList(){
    this.tictactoeList.map((row,i)=>{
      row.map((col,j)=>{
        const data = {
          i: i,
          j: j,
          boxId: this.getBoxId(i, j),
          userId: '',
          value: ''
        }
        this.messageList.push(data)
      })
    })
  }
  getBoxId(i: number, j: number): number {
    switch (i) {
      case 0:
        if (j == 0) {
          return 0
        } else if (j == 1) {
          return 1;
        } else {
          return 2
        }
        break;
      case 1:
        if (j == 0) {
          return 3
        } else if (j == 1) {
          return 4;
        } else {
          return 5
        }
        break
      case 2:
        if (j == 0) {
          return 6
        } else if (j == 1) {
          return 7;
        } else {
          return 8
        }
        break;
      default:
        return 10;
    }
  }
  checkWinner(): Array<any>{
    if(this.xCount+this.yCount != 9){
    const data = _.orderBy(this.messageList,'boxId').map((data)=>{
      return data.value
    })
    for(let i=0;i<this.winningCombination.length;i++){
      const [a,b,c]= this.winningCombination[i];
      if(data[a] && data[a]==data[b] && data[a]==data[c]){
        return [true,(data[a] =='X' && this.toUser)?`YOU WON !!`: (data[a] =='O' && this.fromUser)?`YOU WON !!`:`YOU LOST!!`]
      }
    }
    return [false,'']
  }else{
    return [true,`It's a Draw`]
  }
  }
}
