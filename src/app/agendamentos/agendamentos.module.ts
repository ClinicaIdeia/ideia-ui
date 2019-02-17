import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoCadastroComponent } from './agendamento-cadastro/agendamento-cadastro.component';
import { AgendamentoPesquisaComponent } from './agendamento-pesquisa/agendamento-pesquisa.component';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../shared/shared.module';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

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
    CheckboxModule,
    InputMaskModule,
    CurrencyMaskModule,
    SharedModule,
    AgendamentosRoutingModule
  ],
  declarations: [AgendamentoCadastroComponent, AgendamentoPesquisaComponent],
  exports: [AgendamentoCadastroComponent, AgendamentoPesquisaComponent]
})
export class AgendamentosModule { }
