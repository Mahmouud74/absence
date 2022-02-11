import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MappformService {
  userName="demo";
  cmaundaUrl = 'http://localhost:8080/engine-rest'
  userTasksUrl=`http://localhost:8080/engine-rest/task/?assignee=${this.userName}`;
  //processDefinitionId='Process_1meec99:1:be649d13-8a59-11ec-a71f-0242ac110002'
  definitionKey='Process_1meec99';
  constructor( private _HttpClient :HttpClient) { }
  getForm(taskId):Observable<any>{
    return this._HttpClient.get(`${this.cmaundaUrl}/task/${taskId}/deployed-form`);
  }
  getUserTasks(userName):Observable<any>{
    return this._HttpClient.get(`http://localhost:8080/engine-rest/task/?assignee=${userName}`);
  }
  getProcessDefinitionId():Observable<any>{
    return this._HttpClient.get(`${this.cmaundaUrl}/process-definition?key=${this.definitionKey}`)
  }
  startProcessInstance(processDefinitionId,data):Observable<any>{
    return this._HttpClient.post(`${this.cmaundaUrl}/process-definition/${processDefinitionId}/start`,data)
  }
  submitForm(data , taskId):Observable<any>{
    return this._HttpClient.post(`${this.cmaundaUrl}/task/${taskId}/submit-form`,data);
  }
}
