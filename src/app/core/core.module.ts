import { AgendaService } from './../agendas/agenda.service';
import { UsuarioService } from './../usuarios/usuario.service';
import { FuncionarioService } from './../funcionarios/funcionario.service';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AgendamentoService } from 'app/agendamentos/agendamento.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { HorarioService } from 'app/horarios/horario.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SidebarModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    AgendamentoService,
    FuncionarioService,
    UsuarioService,
    EmpresaService,
    HorarioService,
    AgendaService,
    ErrorHandlerService,
    AuthService,

    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
