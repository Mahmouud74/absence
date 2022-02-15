import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpComponent } from './emp/emp.component';
import { FormitselfComponent } from './formitself/formitself.component';
import { MgrComponent } from './mgr/mgr.component';
const routes:Routes = [
  {path:"demo",component:EmpComponent},
  {path:"mgr",component:MgrComponent},
  {path:"" , redirectTo:"/demo",pathMatch:"full"}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
