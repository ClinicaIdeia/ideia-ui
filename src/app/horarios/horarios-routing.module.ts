import { HorarioPesquisaComponent } from './horario-pesquisa/horario-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorarioCadastroComponent } from './horario-cadastro/horario-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  { path: 'horarios',
    component: HorarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_HORARIO', 'ROLE_ADMIN']}
  },
  { path: 'horarios/novo',
    component: HorarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_HORARIO', 'ROLE_ADMIN']}
  },
  { path: 'horarios/:codigo',
    component: HorarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_HORARIO', 'ROLE_ADMIN']}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
