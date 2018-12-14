import { Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioService } from './../../funcionarios/funcionario.service';
import { Agenda, Horario } from './../../core/model';
import { AgendaService } from './../agenda.service';

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
  agendas = [];
  horarios = [];
  agenda = new Agenda();
  horario = new Horario();

  constructor(
    private funcionarioService: FuncionarioService,
    private agendaService: AgendaService,
    private toasty: ToastyService,
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
    this.carregarAgendas();
    this.carregarMotivos();
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
      .catch(erro => this.errorHandler.handle(erro));
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
        this.toasty.success('Agenda adicionado com sucesso!');

        // form.reset();
        // this.agenda = new Agenda();
        this.router.navigate(['/agendas', agendaAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAgenda(form: FormControl) {
    this.agendaService.atualizar(this.agenda)
      .then(agenda => {
        this.agenda = agenda;

        this.toasty.success('Agenda alterado com sucesso!');
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

  carregarAgendas() {
    this.agendaService.buscarAgendasDisponiveis()
    .then(response => {
      this.agendas = response;
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

}
