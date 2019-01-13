import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaPesquisaComponent } from './agenda-pesquisa/agenda-pesquisa.component';
import { AgendaCadastroComponent } from './agenda-cadastro/agenda-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'agendas',
    component: AgendaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'agendas/novo',
    component: AgendaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'agendas/:codigo',
    component: AgendaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AgendasRoutingModule { }
