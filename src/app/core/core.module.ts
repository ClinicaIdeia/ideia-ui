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
import { GrowlModule } from 'primeng/components/growl/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AgendamentoService } from 'app/agendamentos/agendamento.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { HorarioService } from 'app/horarios/horario.service';
import { LaudoService } from 'app/laudos/laudo.service';
import { RelatorioService } from 'app/relatorios/relatorio.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SidebarModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    AgendamentoService,
    FuncionarioService,
    UsuarioService,
    EmpresaService,
    HorarioService,
    AgendaService,
    LaudoService,
    RelatorioService,
    ErrorHandlerService,
    AuthService,
    MessageService,

    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
