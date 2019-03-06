import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { SharedModule } from '../shared/shared.module';
import { BlockUIModule } from 'primeng/components/blockui/blockui';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { FuncionarioPesquisaComponent } from './funcionario-pesquisa/funcionario-pesquisa.component';
import { FuncionarioCadastroComponent } from './funcionario-cadastro/funcionario-cadastro.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';

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
    BlockUIModule,
    ProgressSpinnerModule,
    FileUploadModule,
    
    SharedModule,
    FuncionariosRoutingModule
  ],
  declarations: [
    FuncionarioCadastroComponent,
    FuncionarioPesquisaComponent
  ],
  exports: [
    FuncionarioCadastroComponent,
    FuncionarioPesquisaComponent
  ]
})
export class FuncionariosModule { }
