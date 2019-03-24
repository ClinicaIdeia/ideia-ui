import { MessageService } from 'primeng/components/common/messageservice';
import { FuncionarioFiltro } from '../funcionario.service';
import { FuncionarioService } from '../funcionario.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { RelatorioService } from 'app/relatorios/relatorio.service';

@Component({
  selector: 'app-funcionario-pesquisa',
  templateUrl: './funcionario-pesquisa.component.html',
  styleUrls: ['./funcionario-pesquisa.component.css']
})
export class FuncionarioPesquisaComponent implements OnInit {

  funcionarios = [];
  totalRegistros = 0;
  loadCompleto: boolean = true;
  painel: string;
  filtro = new FuncionarioFiltro();

  constructor(
    private funcionarioService: FuncionarioService,
    private relatorioService: RelatorioService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Funcionários');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.funcionarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.funcionarios = resultado.funcionarios;
        this.loadCompleto = false;
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadCompleto = false;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.loadCompleto = true;
    this.pesquisar(pagina);
  }

  excluir() {
    this.confirmation.confirm({
      message: 'Deseja excluir este registro ?',
      accept: () => {
        this.messageService.add({ severity: 'info', detail: 'Registro excluído com sucesso!' });
      }
    });
  }

  imprimirCadastro(codigo: number) {
    this.relatorioService.impressaoCadastro(codigo)
      .then(cadastro => {
        const url = window.URL.createObjectURL(cadastro);

        window.open(url);
      });
  }

}
