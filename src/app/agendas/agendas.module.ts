import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaPesquisaComponent } from './agenda-pesquisa/agenda-pesquisa.component';
import { AgendaCadastroComponent } from './agenda-cadastro/agenda-cadastro.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { SharedModule } from 'primeng/components/common/shared';
import { AgendasRoutingModule } from './agendas-routing.module';

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
    InputMaskModule,
    DialogModule,

    SharedModule,
    AgendasRoutingModule
  ],
  declarations: [AgendaPesquisaComponent, AgendaCadastroComponent],
  exports: [AgendaPesquisaComponent, AgendaCadastroComponent]
})
export class AgendasModule { }
