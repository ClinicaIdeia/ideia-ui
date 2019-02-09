import { FuncionarioPesquisaComponent } from './funcionario-pesquisa/funcionario-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioCadastroComponent } from './funcionario-cadastro/funcionario-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'funcionarios',
    component: FuncionarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_FUNCIONARIO', 'ROLE_DEFAULT', 'ROLE_ADMIN'] }
  },
  {
    path: 'funcionarios/novo',
    component: FuncionarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FUNCIONARIO', 'ROLE_DEFAULT', 'ROLE_ADMIN'] }
  },
  {
    path: 'funcionarios/:codigo',
    component: FuncionarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FUNCIONARIO', 'ROLE_DEFAULT', 'ROLE_ADMIN'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
