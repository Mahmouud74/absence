import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormitselfComponent } from './formitself/formitself.component';
import { FormviewerComponent } from './formviewer/formviewer.component';
import { FormeditorComponent } from './formeditor/formeditor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MgrComponent } from './mgr/mgr.component';
import { EmpComponent } from './emp/emp.component';
@NgModule({
  declarations: [
    AppComponent,
    FormitselfComponent,
    FormviewerComponent,
    FormeditorComponent,
    MgrComponent,
    EmpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
