

import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { routesInfor } from './router.module';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatProgressSpinnerModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChartsModule} from 'ng2-charts';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';



import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { MyDashboardComponent} from './my-dashboard/my-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { MapComponent } from './map/map.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PromptDialogComponent } from './component/prompt-dialog/prompt-dialog.component';
import { UpdatePromptDialogComponent } from './component/update-prompt-dialog/update-prompt-dialog.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';



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
    PromptDialogComponent,
    UpdatePromptDialogComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,

    MatCardModule,
    ChartsModule,
    // MatDialog,
    MatDialogModule,
    RouterModule.forRoot(routesInfor)
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatTableModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PromptDialogComponent, UpdatePromptDialogComponent]
})
export class AppModule { }
