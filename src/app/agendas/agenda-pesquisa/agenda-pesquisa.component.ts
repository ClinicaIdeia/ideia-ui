import { AuthService } from './../../seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { AgendaService, AgendaFiltro } from '../agenda.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Agenda } from 'app/core/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-agenda-pesquisa',
  templateUrl: './agenda-pesquisa.component.html',
  styleUrls: ['./agenda-pesquisa.component.css']
})
export class AgendaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  agendas = [];
  horarios = [];
  observacao: string;
  dataExameDe: Date;
  rangeDates: Date[];
  dataExameAte: Date;
  display = false;
  filtro = new AgendaFiltro();
  agendaSelecionada = new Agenda();
  pt: any;

  constructor(
    private auth: AuthService,
    private agendaService: AgendaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Agendas');
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

  copiaAgenda() {
    this.display = false;
  }

  showDialog(agenda) {
    this.agendaSelecionada = agenda;
    this.display = true;
  }

  clonaAgenda() {

    this.agendaService.copiaAgenda(this.agendaSelecionada, this.rangeDates)
      .then(resultado => {
        this.toasty.success('Agenda copiada com sucesso!');
        this.display = false;
        this.rangeDates = [];
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.agendaService.filtrar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.agendas = resultado.agendas;
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

