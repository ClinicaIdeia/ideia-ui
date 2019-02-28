import { AuthService } from './../../seguranca/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AgendaService, AgendaFiltro } from '../agenda.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Agenda } from 'app/core/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import * as moment from 'moment';

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
    private messageService: MessageService,
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
        this.messageService.add({ severity: 'success', detail: 'Agenda copiada com sucesso!' });
        this.display = false;
        this.rangeDates = [];
        this.pesquisar();
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
        this.messageService.add({ severity: 'info', detail: 'Registro excluído com sucesso!' });
      }
    });
  }

  checkDate(envent: Event) {

    const dtaInicio = this.rangeDates[0];
    if (dtaInicio !== null && !this.validaData(dtaInicio)) {
      this.messageService.add({ severity: 'error', detail: 'Data de Início da cópia é inválido!' });
    } else {
      this.validaSeDataEMenorQueHoje(dtaInicio, 'Data de Iníco de Cópia não pode ser menor que hoje!', false);
    }

    const dtaFim = this.rangeDates[1];
    if (dtaFim !== null && !this.validaData(dtaFim)) {
      this.messageService.add({ severity: 'error', detail: 'Data de Fim da cópia é inválido!' });
    } else {
      this.validaSeDataEMenorQueHoje(dtaFim, 'Período de datas de Cópia não podem ser menor que hoje!', true);
    }

  }

  validaSeDataEMenorQueHoje(diaAgenda: Date, msg: string, isDtaFim: boolean) {
    var now = moment().format('YYYY-MM-DD');
    var dia = moment(diaAgenda).format('YYYY-MM-DD');
    if (now > dia) {
      if (isDtaFim) {
        this.rangeDates = [];
      }
      this.messageService.add({ severity: 'error', detail: msg });
    }
  }

  validaData(str) {
    return !!new Date(str).getTime();
  }

}

