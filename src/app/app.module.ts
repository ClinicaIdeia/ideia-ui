import { EmpresasModule } from './empresas/empresas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { HorariosModule } from './horarios/horarios.module';
import { MessageComponent } from './message/message.component';
import { AgendasModule } from './agendas/agendas.module';


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    FuncionariosModule,
    AgendamentosModule,
    AgendasModule,
    UsuariosModule,
    HorariosModule,
    EmpresasModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
