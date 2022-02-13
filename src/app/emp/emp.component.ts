import { Component, OnInit } from '@angular/core';
import { createForm  ,FormEditor } from '@bpmn-io/form-js';
import { CommonModule } from '@angular/common';
import 'dragula';
import{Form} from '@bpmn-io/form-js';
import { MappformService } from '../services/mappform.service';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css'],
  providers:[DataserviceService]
})
export class EmpComponent implements OnInit {
  username ='demo'
  form ;
  schema;
  userTasks;
  definitionId;
  requestData;
  processInstanceId;
  ActivityInstanceData;
  allProcessInstances;
  activityInstanceHistory;
  constructor(public _Router : Router , private _mappform: MappformService ,private _dataService : DataserviceService) {
     this.getTasks()
    this.getProcessInstances();
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
        console.log(event.data);
        this.requestData=event.data;
        this._dataService.setData(event.data);
        this._dataService.getData();
        console.log(this.requestData);
        
        this.submitForm(event.data , userTaskId);
      })
    })
  }
  submitForm(data,taskId){
    this._mappform.submitForm(data,taskId).subscribe(async res=>{
      this.getTasks()
    })
  }
  startInstance(){
    this._mappform.getProcessDefinitionId().subscribe(async res=>{
      this.definitionId=res[0].id;
      this._mappform.startProcessInstance(this.definitionId,{}).subscribe(async res=>{
        console.log("processInstanceId : "+res.id);
        this.processInstanceId=res.id;
        this.getTasks();
        this.getProcessInstances();
      })
    })
  }
  getProcessInstances(){
    this._mappform.getAllProcessInstances().subscribe(res=>{
      console.log(res);
      this.allProcessInstances=res;
    })
  }
  ActivityInstance(id){
    this._mappform.getActivityInstance(id).subscribe(res=>{
      console.log(res);
      this.ActivityInstanceData=res;
    })
  }

//     ActivityInstance(id){
//     this._mappform.getActivityInstance(id).subscribe(ress=>{
//       console.log(ress);
// var arr =[]      

//       for (let index = 0; index < ress.length; index++) {
//         const element = ress[index];
//         this._mappform.getActivityInstanceHistory(element.id).subscribe(res=>{
//           console.log(res);
//           res.assignee = element.assignee
//           res.activityName = element.activityName
//           res.startTime = element.startTime
//           res.endTime = element.endTime
         
//           // var obj={
//           //   "assignee":element.assignee,
//           //   "activityName":element.activityName,
//           //   "startTime": element.startTime,
//           //   "endTime":element.endTime,
//           //   "value":res.value

//           // }
         
         
         
         
//           this.activityInstanceHistory=res;
//         })
//       }
     

     // this.ActivityInstanceData=res;
   // })
  //}

  getActivityInstanceHistory(id){
    this._mappform.getActivityInstanceHistory(id).subscribe(res=>{
      console.log(res);
      this.activityInstanceHistory=res;
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
