import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarioCadastroComponent } from './horario-cadastro/horario-cadastro.component';
import { HorarioPesquisaComponent } from './horario-pesquisa/horario-pesquisa.component';
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
import { SharedModule } from 'primeng/components/common/shared';

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
  ],
  declarations: [HorarioCadastroComponent, HorarioPesquisaComponent],
  exports: [HorarioCadastroComponent, HorarioPesquisaComponent]
})
export class HorariosModule { }
