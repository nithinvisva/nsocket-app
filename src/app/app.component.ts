import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Chat } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nsocket-app';
  showInput: boolean = true;
  chatList: Array<{userId:string,name: string,isActive: boolean}>= [{userId:'0',name:'All',isActive:true}]
  userList: Array<{userId:string,name: string,isActive: boolean}> =[]
  name!: string;
  users = {} as { userId: string, name: string, isActive: boolean };
  // columns to display
  displayedColumns = ['name', 'select' ];
  dataSource!: MatTableDataSource<{userId:string, name: string, isActive: boolean}>
  selection = new SelectionModel<{userId:string, name: string, isActive: boolean}>(true, []);
  toUser!: string;
  fromUser!: string;
  showBoard:boolean= false;
  isClicked:boolean = false

  //chat
  selectedField:{userId:string,name: string,isActive: boolean}
  selectedId: string ='0'
  text:string=''
  chatMessage: Chat[] =[]
  displayList: Chat[] = []
  showChat:boolean = false

  constructor(private chatService: ChatService,
    public matDialog: MatDialog,) {
      this.selectedField = {userId:'0',name:'All',isActive:true}
  }
  ngOnInit() {
    this.dataSource= new MatTableDataSource(this.userList);
    this.chatService.getUsers().subscribe(async (user: { userId?: string, name?: string, isActive?: boolean }) => {
      if(user?.userId != undefined && user?.name != undefined && user?.isActive !=undefined ){
        if(this.ifUserExist(user)){
          this.userList.map((data)=>{
            if(data.userId == user.userId && user?.isActive !=undefined){
              data.isActive = user.isActive;
            }
          })
        }else{
          const newUser ={
            name: user.name,
            userId: user.userId,
            isActive: user.isActive
          }
          this.userList.push(newUser)
          this.chatList.push(newUser)
        }
        this.dataSource= new MatTableDataSource(this.userList);
      }
    })
    this.chatService.fromId().subscribe((user: { userId?: string, name?: string })=>{
        if(user?.userId != undefined && user?.name != undefined){
          this.openDialog(user.name,user.userId)
        }
    })
    this.chatService.listenAccepted().subscribe((user: { userId?: string, name?: string, isActive?: boolean, accepted?: boolean})=>{
      if(user?.accepted){
        if(user?.userId != undefined && user?.name != undefined && user?.isActive !=undefined ){
          this.toUser = user.name
          this.sendToChangeStatus(user.name, user.userId)
        }
      }else{
        this.selection.clear();
      }
    })
    this.chatService.gettingText().subscribe((text: Chat)=>{
      this.displayList =[]
      if(text?.fromUser != undefined && text?.toUser != undefined && text?.message !=undefined ){
      const newChatMessage = {
        fromUser: text.fromUser,
        toUser: text.toUser,
        message: text.message
      }
      this.chatMessage.push(newChatMessage)
      this.setDisplayList(this.selectedField.userId)
    }
    })
  }

  onSubmit() {
    this.showInput = false;
    const registerData = {
      name: this.name
    }
    this.chatService.registerUser(registerData)
  }

  toggleSelection(row:{userId:string,name: string,isActive: boolean} ){
    this.selection.clear();
    this.selection.toggle(row);
  }
  joinRoom(){
    this.chatService.askToJoin(this.selection.selected[0]);
  }
  openDialog(name:string,id:string){
    const dialogRef = this.matDialog.open(DialogComponent,{
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {name: name}
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.chatService.acceptance({userId:id, acceptance: true})
        this.fromUser = name;
        this.sendToChangeStatus(name,id);
      }
    })
  }

  ifUserExist(user: {name?: string, userId?: string, isActive?: boolean}):boolean{
    return _.includes(this.userList.map((data)=>(data.userId == user.userId)), true)
  }

  sendToChangeStatus(name: string, id: string){
    const registerData = {
      name: name,
      userId: id,
      isActive: false
    }
    this.chatService.registerUser(registerData)
    this.showBoard = true;
  }

  onSend(){
    const data={
      fromUser: undefined,
      toUser: this.selectedField,
      message: this.text.trim()
    }
    console.log(data)
    this.chatService.sendText(data)
    this.text=''
  }

  setDisplayList(id:string){
    this.displayList=[]
    for(let i=0;i<this.chatMessage.length;i++){
      if(id == '0' && this.chatMessage[i].toUser?.userId == id){
        this.displayList.push(this.chatMessage[i])
      }
      else if(this.chatMessage[i].toUser?.userId == id || this.chatMessage[i].fromUser?.userId == id){
        this.displayList.push(this.chatMessage[i])
      }
    }
  }
  selectedOption(user:{userId:string, name: string, isActive: boolean}){
    this.selectedField = user
  }
}
