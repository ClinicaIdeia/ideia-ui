import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaudoRoutingModule } from './laudo-routing.module';
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
import { PanelModule } from 'primeng/components/panel/panel';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { LaudoPesquisaComponent } from './laudo-pesquisa/laudo-pesquisa.component';
import { LaudoCadastroComponent } from './laudo-cadastro/laudo-cadastro.component';

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
    DialogModule,
    TabViewModule,
    SharedModule,
    PanelModule,

    LaudoRoutingModule
  ],
  declarations: [LaudoPesquisaComponent, LaudoCadastroComponent],
  exports: [LaudoPesquisaComponent, LaudoCadastroComponent]
})
export class LaudosModule { }
