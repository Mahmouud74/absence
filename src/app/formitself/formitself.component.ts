import { Component, OnInit } from '@angular/core';
import { createForm  ,FormEditor } from '@bpmn-io/form-js';
import { CommonModule } from '@angular/common';
import 'dragula';
import{Form} from '@bpmn-io/form-js';
import { MappformService } from '../services/mappform.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formitself',
  templateUrl: './formitself.component.html',
  styleUrls: ['./formitself.component.css']
})
export class FormitselfComponent implements OnInit {
  username ='demo'
  form ;
  schema;
  userTasks;
  definitionId;
  /*schema =   {
    components: [
        {
            label: "Employee Name",
            type: "textfield",
            id: "Field_10bxrop",
            key: "employeeName",
            description: "Enter Your Name",
            validate: {
                required: true
            }
        },
        {
            label: "Start Date",
            type: "textfield",
            id: "Field_0e6z2ok",
            key: "startDate",
            validate: {
                required: true
            },
            description: "enter the start of Absece"
        },
        {
            label: "End Date",
            type: "textfield",
            id: "Field_0yvy7l0",
            key: "endDate",
            description: "enter End of Absence",
            validate: {
                required: true
            }
        },
        {
            values: [
                {
                    value: "Sick",
                    label: "Sick"
                },
                {
                    value: "ChildBirth",
                    label: "Child Birth"
                },
                {
                    value: "Travel",
                    label: "Travel"
                }
            ],
            label: "Reason",
            type: "select",
            id: "Field_1k5ahzx",
            key: "absenceReason",
            description: "choose your reason",
            validate: {
                required: true
            }
        },
         {
          action: "submit",
          label: "Submit",
          type: "button",
          id: "Field_1kkxl4t",
          keys: "field_18vdec6"
        }
    ],
    type: "default",
    id: "requestForm",
    executionPlatform: "Camunda Platform",
    executionPlatformVersion: "7.16"
 
  }*/

   data = {
    employeeName: 'John Doe Company',
    startDate:"MMM",
    endDate:"15",
    absenceReason:"Travel"
  };
  constructor(public _Router : Router,private _mappform:MappformService) { 
  //  console.log(this.form);
  //this.getTasks()
  
  }
  /*getTasks(){
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
  }*/
  ngOnInit(): void {
    this.form =new  Form({
      container:document.querySelector('#mmmm')  
    });
    //this.getTasks()
    //this.getForm()
    //this.x()
  }

}
