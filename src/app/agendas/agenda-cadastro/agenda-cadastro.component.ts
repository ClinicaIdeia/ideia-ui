import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioService } from './../../funcionarios/funcionario.service';
import { Agenda, Horario } from './../../core/model';
import { AgendaService } from './../agenda.service';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda-cadastro',
  templateUrl: './agenda-cadastro.component.html',
  styleUrls: ['./agenda-cadastro.component.css']
})
export class AgendaCadastroComponent implements OnInit {

  tipos = [
    { label: 'Admissão', value: 'ADMISSAO' },
    { label: 'Porte', value: 'PORTE_ARMA' },
  ];

  funcionarios = [];
  motivos = [];
  rangeDates: Date[];
  agendas = [];
  horarios = [];
  agenda = new Agenda();
  horario = new Horario();
  pt: any;

  constructor(
    private funcionarioService: FuncionarioService,
    private agendaService: AgendaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoAgenda = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo agenda');

    if (codigoAgenda) {
      this.carregarAgenda(codigoAgenda);
    }

    this.carregarFuncionarios();
    this.carregarMotivos();

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

  get editando() {
    return Boolean(this.agenda.codigo)
  }

  adicionaHorario(horario) {

    this.horarios.push(horario);
    this.agenda.horarios = [];

    setTimeout(function () {
      this.agenda.horarios = this.horarios;
      this.horario = new Horario();
    }.bind(this), 1);

  }

  removerHorario(horario) {

    const index = this.horarios.indexOf(horario);
    this.agenda.horarios = [];

    if (index !== -1) {
      this.horarios.splice(index, 1);
    }

    setTimeout(function () {
      this.agenda.horarios = this.horarios;
    }.bind(this), 1);

  }

  carregarAgenda(codigo: number) {
    this.agendaService.buscaPorCodigo(codigo)
      .then(agenda => {
        this.agenda = agenda;
        this.horarios = this.agenda.horarios;
        this.atualizarTituloEdicao();
      })
      .catch(erro => {
        this.errorHandler.handle(erro)
      });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAgenda(form);
    } else {
      this.adicionarAgenda(form);
    }
  }

  adicionarAgenda(form: FormControl) {
    this.agendaService.adicionar(this.agenda)
      .then(agendaAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Agenda cadastrada com sucesso!' });
        this.router.navigate(['/agendas', agendaAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAgenda(form: FormControl) {
    this.agendaService.atualizar(this.agenda)
      .then(agenda => {
        this.agenda = agenda;
        this.messageService.add({ severity: 'success', detail: 'Agenda alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMotivos() {
    this.agendaService.buscarMotivos()
      .then(motivos => {
        this.motivos = motivos
          .map(p => ({ label: p.descricao, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarFuncionarios() {
    this.funcionarioService.pesquisarTodos()
      .then(funcionarios => {
        this.funcionarios = funcionarios
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.agenda = new Agenda();
    }.bind(this), 1);

    this.router.navigate(['/agendas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de agenda`);
  }

  checkDate(envent: Event) {
    if (!this.validaData(this.agenda.diaAgenda)) {
      this.messageService.add({ severity: 'error', detail: 'Data com formato inválido!!!' });
    }
    this.validaSeDataEMaiorQueHoje(this.agenda.diaAgenda);
  }

  validaSeDataEMaiorQueHoje(diaAgenda: Date) {
    var now = moment().format('YYYY-MM-DD');
    var dia = moment(diaAgenda).format('YYYY-MM-DD');
    if (now > dia) {
      this.agenda.diaAgenda = null;
      this.messageService.add({ severity: 'error', detail: 'Data da agenda menor que hoje!' });
    }
  }

  validaData(str) {
    return !!new Date(str).getTime();
  }

}
