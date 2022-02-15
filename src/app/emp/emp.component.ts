import { Component, OnInit } from '@angular/core';
import { createForm  ,FormEditor } from '@bpmn-io/form-js';
import { CommonModule } from '@angular/common';
import 'dragula';
import{Form} from '@bpmn-io/form-js';
import { MappformService } from '../services/mappform.service';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
import { Observable } from 'rxjs';

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
  activityInstanceHistory=[];
  constructor(public _Router : Router , private _mappform: MappformService ,private _dataService : DataserviceService) {
     this.getTasks()
    this.getProcessInstances();
  }
  getTasks(){ //to display all requests
    this._mappform.getUserTasks(this.username).subscribe(res=>{
      if(res[0]){
      console.log(res[0].id);
      this.userTasks=res;
      }
      else{
      }
    })
  }
   getForm(userTaskId){ // to display the form of the request
    this._mappform.getForm(userTaskId).subscribe(async res=>{
      console.log(userTaskId);
      this.schema=res;
      console.log(res);
      console.log(this.schema.components);
      console.log(this.schema.components.length);
      
      await this.form.importSchema(this.schema);
      this.form.on('submit',500,(event)=>{
       let dataa=
            {
              variables: {
               
              },
              withVariablesInReturn: true
            }
        console.log(event.data);
        for (let i = 0; i < this.schema.components.length; i++) {    
          if(this.schema.components[i].type!="button"){
          let temp = this.schema.components[i].key;
          console.log(event.data[temp] +"temp");
          dataa.variables[`${this.schema.components[i].key}`]={value : event.data[temp]};
               }      
        }
        console.log(dataa);
        this.submitForm(dataa , userTaskId);

    //     if(this.schema.id=="requestForm"){
    //     let dataa=
    //     {
    //       variables: {
    //           employeeName: {
    //               value:event.data.employeeName
    //           },
    //           startDate: {
    //               value: event.data.startDate
    //           },
    //           endDate: {
    //               value: event.data.endDate
    //           },
    //           absenceReason: {
    //               value: event.data.absenceReason
    //           }
    //       },
    //       withVariablesInReturn: true
    //   }
    //   this.submitForm(dataa , userTaskId);
    // }
    // else if(this.schema.id =="approveForm"){
    //   let dataa=
    //     {
    //       variables: {
    //         decision: {
    //               value:event.data.dicision
    //           }
    //       },
    //       withVariablesInReturn: true
    //     }
    //   this.submitForm(dataa , userTaskId);
    // }
    // else if (this.schema.id=="Explaination"){
    //   let dataa=
    //   {
    //     variables: {
    //       explaination : {
    //             value:event.data.explaination
    //         }
    //     },
    //     withVariablesInReturn: true
    //   }
    //   this.submitForm(dataa , userTaskId);
    // }

      })
    })
  }
  submitForm(data,taskId){ //send form data to camunda platform

    
    this._mappform.compeleteTast(data,taskId).subscribe(async res=>{
      console.log(res);
      
      this.getTasks()
    })
  }
  startInstance(){    //start an new Process  
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
  getProcessInstances(){ // list all processes
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
  getActivityInstanceHistory(id){ // list each activity instance Data 
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

  // getActivityInstanceHistory(id){
  //   this._mappform.getActivityInstanceHistory(id).subscribe(res=>{
  //     console.log(res);
  //     this.activityInstanceHistory=res;
  //   })
  // }
  ngOnInit(): void {
    this.form =new  Form({
      container:document.querySelector('#mmmm')  
    });
    //this.getTasks()
    //this.getForm()
    //this.x()
  }

}
