import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'usuarios/novo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'usuarios/:codigo',
    component: UsuarioCadastroComponent,
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
export class UsuariosRoutingModule { }
