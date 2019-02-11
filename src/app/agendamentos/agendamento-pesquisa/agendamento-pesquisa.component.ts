import { AuthService } from './../../seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { AgendamentoService, AgendamentoFiltro } from '../agendamento.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-agendamento-pesquisa',
  templateUrl: './agendamento-pesquisa.component.html',
  styleUrls: ['./agendamento-pesquisa.component.css']
})
export class AgendamentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  agendamentos = [];
  observacao: string;
  dataExameDe: Date;
  dataExameAte: Date;
  filtro = new AgendamentoFiltro();

  constructor(
    private auth: AuthService,
    private agendamentoService: AgendamentoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Agendamentos');
    this.pesquisar();
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

  excluir() {
    this.confirmation.confirm({
      message: 'Deseja excluir este registro ?',
      accept: () => {
        this.toasty.info('Resgistro excluido com sucesso!');
      }
    });
  }

}

