import { MessageService } from 'primeng/components/common/messageservice';

import { LaudoService, LaudoFiltro } from '../laudo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { RelatorioService } from 'app/relatorios/relatorio.service';
import { Laudo } from 'app/core/model';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from 'app/seguranca/auth.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { FuncionarioService } from 'app/funcionarios/funcionario.service';

@Component({
  selector: 'app-laudo-pesquisa',
  templateUrl: './laudo-pesquisa.component.html',
  styleUrls: ['./laudo-pesquisa.component.css']
})
export class LaudoPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  laudos = [];
  contatos = [];
  empresas = [];
  display = false;
  filtro = new LaudoFiltro();
  laudoSelecionado = new Laudo();
  totalRegistros = 0;
  pt: any;
  filteredFuncionariosSingle: any[];

  constructor(
    private laudoService: LaudoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private empresaService: EmpresaService,
    private funcionarioService: FuncionarioService,
    private title: Title,
    public auth: AuthService,
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Laudos');
    this.pesquisar();
    this.carregarEmpresas();
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

  selecionaEmpresa() {

  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.laudoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.laudos = resultado.laudos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  cancelNewAptidao() {
    this.display = false;
  }

  showDialog(laudo: Laudo) {
    this.laudoSelecionado = laudo;
    this.display = true;
  }

  confirmarExclusao(laudo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este laudo ?',
      accept: () => {
        this.excluir(laudo);
      }
    });
  }

  excluir(laudo: any) {
    this.laudoService.excluir(laudo.codigo)
      .then(() => {
        this.pesquisar();
        this.messageService.add({ severity: 'info', detail: 'Laudo excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  gerarLaudo(codigo: number) {
    this.relatorioService.relatorioLaudo(codigo)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }

  carregarEmpresas() {
    this.empresaService.pesquisarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      });
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

}
