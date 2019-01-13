import { AgendamentoPesquisaComponent } from './agendamento-pesquisa/agendamento-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoCadastroComponent } from './agendamento-cadastro/agendamento-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'agendamentos',
    component: AgendamentoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_AGENDAMENTO', 'ROLE_ADMIN'] }
  },
  {
    path: 'agendamentos/novo',
    component: AgendamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_AGENDAMENTO', 'ROLE_ADMIN'] }
  },
  {
    path: 'agendamentos/:codigo',
    component: AgendamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_AGENDAMENTO', 'ROLE_ADMIN'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
