import { LaudoPesquisaComponent } from './laudo-pesquisa/laudo-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaudoCadastroComponent } from './laudo-cadastro/laudo-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  { path: 'laudos',
    component: LaudoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LAUDO', 'ROLE_ADMIN']}
  },
  { path: 'laudos/novo',
    component: LaudoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LAUDO', 'ROLE_ADMIN']}
  },
  { path: 'laudos/:codigo',
    component: LaudoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LAUDO', 'ROLE_ADMIN']}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LaudoRoutingModule { }
