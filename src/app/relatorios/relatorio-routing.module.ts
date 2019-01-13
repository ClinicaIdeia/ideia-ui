import { RelatorioPesquisaComponent } from './relatorio-pesquisa/relatorio-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'relatorios',
    component: RelatorioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_RELATORIOS', 'ROLE_ADMIN'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
