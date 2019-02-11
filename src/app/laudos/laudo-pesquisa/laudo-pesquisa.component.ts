import { AuthService } from './../../seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { LaudoService, LaudoFiltro } from '../laudo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { RelatorioService } from 'app/relatorios/relatorio.service';
import { Laudo } from 'app/core/model';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-laudo-pesquisa',
  templateUrl: './laudo-pesquisa.component.html',
  styleUrls: ['./laudo-pesquisa.component.css']
})
export class LaudoPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  laudos = [];
  contatos = [];
  display = false;
  filtro = new LaudoFiltro();
  laudoSelecionado = new Laudo();
  totalRegistros = 0;

  constructor(
    private auth: AuthService,
    private laudoService: LaudoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title,
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Laudos');
    this.pesquisar();
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
        this.toasty.success('Laudo excluído com sucesso!');
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

}
