import { Component, OnInit } from '@angular/core';
import { createForm  ,FormEditor } from '@bpmn-io/form-js';
import { CommonModule } from '@angular/common';
import 'dragula';
import{Form} from '@bpmn-io/form-js';
import { MappformService } from '../services/mappform.service';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-mgr',
  templateUrl: './mgr.component.html',
  styleUrls: ['./mgr.component.css'],
  providers:[DataserviceService]

})
export class MgrComponent implements OnInit {
  username ='Mgr'
  form ;
  schema;
  userTasks;
  definitionId;
  processInstanceId;
  ActivityInstanceData;
  allProcessInstances;
  activityInstanceHistory=[];
  constructor(public _Router:Router , private _mappform: MappformService ,private _dataService : DataserviceService) { 
    this.getTasks();
    this.getProcessInstances();
  }

  getTasks(){  //to display all requests
    this._mappform.getUserTasks(this.username).subscribe(res=>{
      if(res[0]){
      console.log(res[0].id);
      this.userTasks=res;
      }
      else{
      }
    })
  }
   getForm(userTaskId){// display the form of the request
    this._mappform.getForm(userTaskId).subscribe(async res=>{
      this.schema=res;
      console.log(res);
      await this.form.importSchema(this.schema);
      this.form.on('submit',500,(event)=>{
        console.log(event.data,event.errors);
        if(this.schema.id=="requestForm"){
          let dataa=
          {
            variables: {
                employeeName: {
                    value:event.data.employeeName
                },
                startDate: {
                    value: event.data.startDate
                },
                endDate: {
                    value: event.data.endDate
                },
                absenceReason: {
                    value: event.data.absenceReason
                }
            },
            withVariablesInReturn: true
        }
        this.submitForm(dataa , userTaskId);
      }
      else if(this.schema.id =="approveForm"){
        let dataa=
          {
            variables: {
              decision: {
                    value:event.data.decision
                }
            },
            withVariablesInReturn: true
          }
        this.submitForm(dataa , userTaskId);
      }
      else if (this.schema.id=="Explaination"){
        let dataa=
        {
          variables: {
            explaination : {
                  value:event.data.explaination
              }
          },
          withVariablesInReturn: true
        }
        this.submitForm(dataa , userTaskId);
      }
      })
    })
  }
  submitForm(data,taskId){ //send form data to camunda
    this._mappform.compeleteTast(data,taskId).subscribe(async res=>{
    })
    this.getTasks()
  }
  startInstance(){ //start a new process
    this._mappform.getProcessDefinitionId().subscribe(async res=>{
      this.definitionId=res[0].id;
      this._mappform.startProcessInstance(this.definitionId,{}).subscribe(async res=>{
        console.log("processInstanceId : "+res.id);
        this.getTasks()
      })
    })
  }
  getProcessInstances(){ //list all processes
    this._mappform.getAllProcessInstances().subscribe(res=>{
      console.log(res);
      this.allProcessInstances=res;
    })
  }
  ActivityInstance(id){ // list all activity instances
    this._mappform.getActivityInstance(id).subscribe(res=>{
     // console.log(res);
      for (let i = 0; i < res.length; i++) {
        if(res[i].endTime&&res[i].activityType!="startEvent"&&res[i]!="serviceTask"){
          this._mappform.getActivityInstanceHistory(res[i].id).subscribe(ress=>{
            for (let j = 0; j < ress.length; j++) {
              if(ress[j].type=="variableUpdate"){
                let temp = {"activityInstanceId":res[i].id,"variableName":ress[j].variableName , "value":ress[j].value};
                 this.activityInstanceHistory.push(temp);
              }
            }
          })
        }
      }
      this.ActivityInstanceData=res;
      console.log(this.ActivityInstanceData);
      console.log(this.activityInstanceHistory);
    })
  }
  getActivityInstanceHistory(id){ //list each activity instance data 
    this._mappform.getActivityInstanceHistory(id).subscribe(res=>{
      //console.log(res);
      
      for (let i = 0; i < res.length; i++) {
        if(res[i].type=="variableUpdate"){
          let temp = {"variableName":res[i].variableName , "value":res[i].value}
          this.activityInstanceHistory.push(temp);
        }
      }
      console.log(this.activityInstanceHistory);
     // return this.activityInstanceHistory
      //this.activityInstanceHistory=res;
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


