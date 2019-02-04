

import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { routesInfor } from './router.module';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { MyDashboardComponent} from './my-dashboard/my-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    MyDashboardComponent,
    ProfileComponent,
    TableComponent,
    ChartsComponent,
    MapComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    RouterModule.forRoot(routesInfor)
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatTableModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
