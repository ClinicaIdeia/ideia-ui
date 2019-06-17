import { AuthService } from './../../seguranca/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AgendamentoService, AgendamentoFiltro } from '../agendamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { FuncionarioService } from 'app/funcionarios/funcionario.service';

@Component({
  selector: 'app-agendamento-pesquisa',
  templateUrl: './agendamento-pesquisa.component.html',
  styleUrls: ['./agendamento-pesquisa.component.css']
})
export class AgendamentoPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  totalRegistros = 0;
  agendamentos = [];
  filteredFuncionariosSingle: any[];
  filteredEmpresasSingle: any[];
  observacao: string;
  dataExameDe: Date;
  dataExameAte: Date;
  filtro = new AgendamentoFiltro();
  pt: any;

  constructor(
    private auth: AuthService,
    private agendamentoService: AgendamentoService,
    private errorHandler: ErrorHandlerService,
    private empresaService: EmpresaService,
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Agendamentos');
    this.pesquisar();
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Sg", "Te", "Qa", "Qu", "Sx", "Sb"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  pesquisar(pagina = 0) {
    
    this.filtro.pagina = pagina;
    
    this.agendamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.agendamentos = resultado.agendamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


  confirmarExclusao(usario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usario);
      }
    });
  }

  excluir(usario: any) {
    this.agendamentoService.excluir(usario.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Agendamento excluído com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  filteredFuncionarioSingle(event) {
    let query = event.query;
    this.funcionarioService.listarTodosAutoComplete(event.query)
      .then(funcionarios => {
        this.filteredFuncionariosSingle = this.filterFuncionarioName(query, funcionarios);
      });
  }

  filterFuncionarioName(query, funcionarios: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < funcionarios.length; i++) {
      let funcionario = funcionarios[i];
      if (funcionario.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(funcionario);
      }
    }
    return filtered;
  }

  filteredEmpresaSingle(event) {
    let query = event.query;
    this.empresaService.listarTodosAutoComplete(event.query)
      .then(empresas => {
        this.filteredEmpresasSingle = this.filterEmpresaName(query, empresas);
      });
  }

  filterEmpresaName(query, empresas: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < empresas.length; i++) {
      let empresa = empresas[i];
      if (empresa.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(empresa);
      }
    }
    return filtered;
  }

}

