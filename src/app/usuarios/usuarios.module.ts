import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    SidebarModule,
    SharedModule,
    ProgressSpinnerModule,
    UsuariosRoutingModule
  ],
  declarations: [UsuarioCadastroComponent, UsuarioPesquisaComponent],
  exports: [UsuarioCadastroComponent, UsuarioPesquisaComponent]
})
export class UsuariosModule { }
