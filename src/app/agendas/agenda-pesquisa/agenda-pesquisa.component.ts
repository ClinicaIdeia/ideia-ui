import { AuthService } from './../../seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { AgendaService, AgendaFiltro } from '../agenda.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-agenda-pesquisa',
  templateUrl: './agenda-pesquisa.component.html',
  styleUrls: ['./agenda-pesquisa.component.css']
})
export class AgendaPesquisaComponent implements OnInit {

  agendas = [];
  observacao: string;
  dataExameDe: Date;
  dataExameAte: Date;
  filtro = new AgendaFiltro();
  pt: any;

  constructor(
    private auth: AuthService,
    private agendaService: AgendaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Agendas');
    this.pesquisar();

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do","Sg","Te","Qa","Qu","Sx","Sb"],
      monthNames: [ "Janiero","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Today',
      clear: 'Clear'
  };
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.agendaService.pesquisar(this.filtro)
      .then(agendas => {
        this.agendas = agendas
      });
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

