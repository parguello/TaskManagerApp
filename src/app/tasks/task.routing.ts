import { RouterModule, Routes } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';



const taskRoutes: Routes = [
  { path: '', component: ViewTaskComponent },
  { path: 'view-task', component: ViewTaskComponent },
  { path: 'add-task', component: EditTaskComponent },
  { path: 'edit-task/:taskId', component: EditTaskComponent },
];

export const TaskRouting = RouterModule.forChild(taskRoutes);