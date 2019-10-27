import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerModule } from './customers/customer.module';
import { UserModule } from './users/user.module';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },

  { path: 'customer', loadChildren: () => CustomerModule },
  { path: 'user', loadChildren: () => UserModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
