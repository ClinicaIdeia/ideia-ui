import { AgendaService } from './../../agendas/agenda.service';
import { environment } from './../../../environments/environment.prod';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioService } from './../../funcionarios/funcionario.service';
import { Agendamento, Horario, Agenda } from './../../core/model';
import { AgendamentoService } from './../agendamento.service';


@Component({
  selector: 'app-agendamento-cadastro',
  templateUrl: './agendamento-cadastro.component.html',
  styleUrls: ['./agendamento-cadastro.component.css']
})
export class AgendamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Admissão', value: 'ADMISSAO' },
    { label: 'Porte', value: 'PORTE_ARMA' },
  ];

  funcionarios = [];
  motivos = [];
  agendas = [];
  codHorario: number;
  agendasCopy = [];
  horarios = [];
  codAgenda: number;
  agendamento = new Agendamento();
  agenda = new Agenda();
  horario = new Horario();

  constructor(
    private funcionarioService: FuncionarioService,
    private agendamentoService: AgendamentoService,
    private agendaService: AgendaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoAgendamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo agendamento');

    if (codigoAgendamento) {
      this.carregarAgendamento(codigoAgendamento);
    }

    this.carregarFuncionarios();
    this.carregarMotivos();
    this.carregarHorarios();
  }

  selectHorario(event) {
    this.horario.codigo = this.agendamento.codHorario;
  }

  filtraMotivos(event) {
    this.carregarHorarios();
  }

  onChange(event) {
    const codAgenda = event.value;

    if (codAgenda) {

      this.agendaService.buscaPorCodigo(this.agendamento.agenda.codigo)
      .then(agenda => {
        this.agenda = agenda;
        this.horarios = this.agenda.horarios
        .map(c => ({ label: c.horaExame + ' Horas - restam: ' + c.restante + ' vagas', value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));

    }
  }

  get editando() {
    return Boolean(this.agendamento.codigo)
  }

  carregarAgendamento(codigo: number) {
    this.agendamentoService.buscarPorCodigo(codigo)
      .then(agendamento => {
        this.agendamento = agendamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAgendamento(form);
    } else {
      this.adicionarAgendamento(form);
    }
  }

  adicionarAgendamento(form: FormControl) {
    // this.agendamento.agenda = this.agenda;
    this.agendamentoService.adicionar(this.agendamento)
      .then(agendamentoAdicionado => {
        this.toasty.success('Agendamento adicionado com sucesso!');

        // form.reset();
        // this.agendamento = new Agendamento();
        this.router.navigate(['/agendamentos', agendamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAgendamento(form: FormControl) {
    this.agendamentoService.atualizar(this.agendamento)
      .then(agendamento => {
        this.agendamento = agendamento;

        this.toasty.success('Agendamento alterado com sucesso!');
        this.atualizarTituloEdicao();
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
      this.agendamento = new Agendamento();
    }.bind(this), 1);

    this.router.navigate(['/agendamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de agendamento`);
  }

  carregarMotivos() {
    return this.agendamentoService.pesquisarMotivos()
      .then(motivos => {
        this.motivos = motivos
          .map(c => ({ label: c.descricao, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarHorarios() {
    const codMotivo = this.agendamento.motivo.codigo;
    return this.agendamentoService.pesquisarAgendas(codMotivo)
      .then(agendas => {
        this.agendasCopy = agendas.content;
        const agendasDropDown = agendas.content;
        this.agendas = agendasDropDown
          .map(c => ({ label: c.diaAgenda, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
