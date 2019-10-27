import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const userRoutes: Routes = [
  { path: 'view-user', component: ViewUserComponent },
  { path: 'add-user', component: EditUserComponent },
  { path: 'edit-user/:userId', component: EditUserComponent },
];

export const UserRouting = RouterModule.forChild(userRoutes);