import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskModule } from './tasks/task.module';
import { UserModule } from './users/user.module';

const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },

  { path: 'task', loadChildren: () => TaskModule },
  { path: 'user', loadChildren: () => UserModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
