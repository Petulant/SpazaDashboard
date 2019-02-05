
import { Routes } from '@angular/router';


import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { MyDashboardComponent} from './my-dashboard/my-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { MapComponent } from './map/map.component';
import { AnalysisComponent } from './analysis/analysis.component';




const mypaths: Routes = [
    {path: '', component: LoginComponent },
    {path: 'sidebar', component: SidebarComponent, children: [
        {path: 'my-dashboard', component: MyDashboardComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'table', component: TableComponent},
        {path: 'charts', component: ChartsComponent},
        {path: 'map', component: MapComponent}
    ]},
];

export const routesInfor = mypaths ;
