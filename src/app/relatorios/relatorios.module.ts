import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioPesquisaComponent } from './relatorio-pesquisa/relatorio-pesquisa.component';

import { SharedModule } from '../shared/shared.module';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { CalendarModule } from 'primeng/components/calendar/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RelatorioRoutingModule,
    DropdownModule,
    AutoCompleteModule,
    SharedModule
  ],
  declarations: [RelatorioPesquisaComponent],
  exports: [RelatorioPesquisaComponent]
})
export class RelatoriosModule { }
