import { Component, OnInit } from '@angular/core';
import { createForm  ,FormEditor } from '@bpmn-io/form-js';
import { CommonModule } from '@angular/common';
import 'dragula';
import{Form} from '@bpmn-io/form-js';
import { MappformService } from '../services/mappform.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mgr',
  templateUrl: './mgr.component.html',
  styleUrls: ['./mgr.component.css']
})
export class MgrComponent implements OnInit {
  username ='Mgr'
  form ;
  schema;
  userTasks;
  definitionId;
  constructor(public _Router:Router , private _mappform: MappformService) { 
    this.getTasks()
  
  }
  getTasks(){
    this._mappform.getUserTasks(this.username).subscribe(res=>{
      if(res[0]){
      console.log(res[0].id);
      this.userTasks=res;
      }
      else{
      }
    })
  }
   getForm(userTaskId){
    this._mappform.getForm(userTaskId).subscribe(async res=>{
      this.schema=res;
      console.log(res);
      await this.form.importSchema(this.schema);
      this.form.on('submit',500,(event)=>{
        console.log(event.data,event.errors);
        this.submitForm(event.data , userTaskId);
      })
    })
  }
  submitForm(data,taskId){
    this._mappform.submitForm(data,taskId).subscribe(async res=>{
    })
    this.getTasks()
  }
  startInstance(){
    this._mappform.getProcessDefinitionId().subscribe(async res=>{
      this.definitionId=res[0].id;
      this._mappform.startProcessInstance(this.definitionId,{}).subscribe(async res=>{
        console.log("processInstanceId : "+res.id);
        this.getTasks()
      })
    })
  }
  ngOnInit(): void {
    this.form =new  Form({
      container:document.querySelector('#mmmm')  
    });
    //this.getTasks()
    //this.getForm()
    //this.x()
  }

}


