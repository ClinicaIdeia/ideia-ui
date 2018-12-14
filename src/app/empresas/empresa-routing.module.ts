import { EmpresaPesquisaComponent } from './empresa-pesquisa/empresa-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  { path: 'empresas',
    component: EmpresaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EMPRESA', 'ROLE_ADMIN']}
  },
  { path: 'empresas/novo',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EMPRESA', 'ROLE_ADMIN']}
  },
  { path: 'empresas/:codigo',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EMPRESA', 'ROLE_ADMIN']}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
