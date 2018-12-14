import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { EmpresaPesquisaComponent } from './empresa-pesquisa/empresa-pesquisa.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { SharedModule } from '../shared/shared.module';
import { TabViewModule } from 'primeng/components/tabview/tabview';

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
    TabViewModule,
    SharedModule,

    EmpresaRoutingModule
  ],
  declarations: [EmpresaCadastroComponent, EmpresaPesquisaComponent],
  exports: [EmpresaCadastroComponent, EmpresaPesquisaComponent]
})
export class EmpresasModule { }
