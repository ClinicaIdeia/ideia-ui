import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginFormComponent } from './login-form/login-form.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'reset-senha', component: ResetSenhaComponent },
  { path: 'troca-senha', component: TrocaSenhaComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }
