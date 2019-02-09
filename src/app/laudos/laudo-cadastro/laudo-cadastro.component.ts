import { AgendaService } from './../../agendas/agenda.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioService } from './../../funcionarios/funcionario.service';
import { Laudo, Horario, Agenda, Agendamento, Aptidao } from './../../core/model';
import { LaudoService } from './../laudo.service';
import { AuthService } from 'app/seguranca/auth.service';
import { AgendamentoService } from 'app/agendamentos/agendamento.service';
import { RelatorioService } from 'app/relatorios/relatorio.service';

@Component({
  selector: 'app-laudo-cadastro',
  templateUrl: './laudo-cadastro.component.html',
  styleUrls: ['./laudo-cadastro.component.css']
})
export class LaudoCadastroComponent implements OnInit {


  tipos = [
    { label: 'Admissão', value: 'ADMISSAO' },
    { label: 'Porte', value: 'PORTE_ARMA' },
  ];

  funcionarios = [];
  agendamentos = [];
  laudo = new Laudo();
  agendamento = new Agendamento();
  aptidao = new Aptidao();
  newAptidao = new Aptidao();
  aptidoes = [];
  display: boolean = false;
  isAtestado: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private agendamentoService: AgendamentoService,
    private laudoService: LaudoService,
    private agendaService: AgendaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private title: Title,
    private relatorioService: RelatorioService
  ) { }

  ngOnInit() {
    const codigoAgendamento = this.route.snapshot.params['codigo'];
    this.title.setTitle('Geração de Laudo');

    this.aptidao.apto = false;
    this.aptidao.descricao = 'APTO ao manuseio de arma de fogo';

    this.aptidoes.push(this.aptidao);

    this.aptidao = new Aptidao();

    this.aptidao.apto = false;
    this.aptidao.descricao = 'APTO ao manuseio de arma de fogo e ao exercício da profissão de Vigilante';

    this.aptidoes.push(this.aptidao);

    this.aptidao = new Aptidao();

    this.aptidao.apto = false;
    this.aptidao.descricao = 'INAPTO';

    this.aptidoes.push(this.aptidao);
    this.laudo.aptidoes = this.aptidoes;

    if (codigoAgendamento) {
      this.carregarAgendamento(codigoAgendamento);
    }

  }

  addNewAptidao() {

    this.newAptidao.apto = false;
    this.aptidoes.push(this.newAptidao);
    let aptTemp = [];
    aptTemp = this.aptidoes;
    this.aptidoes = [];
    this.laudo.aptidoes = [];
    setTimeout(function () {
      this.newAptidao = new Aptidao();
      this.display = false;
      this.laudo.aptidoes = aptTemp;
    }.bind(this), 1);

  }

  cancelNewAptidao() {
    this.newAptidao = new Aptidao();
    this.display = false;
  }

  showDialog() {
    this.display = true;
  }

  carregarAgendamento(codigo: number) {
    this.agendamentoService.buscarPorCodigo(codigo)
      .then(agendamento => {
        this.agendamento = agendamento;
        if (!this.agendamento.trabalhoArmado) {
          this.isAtestado = true;
        }
        this.deparaAgendamentoLaudo(this.agendamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  deparaAgendamentoLaudo(agendamento: Agendamento, ) {
    this.laudo.funcionario = agendamento.funcionario;
    this.laudo.dataExame = agendamento.agenda.diaAgenda;
    this.laudo.observacao = agendamento.observacao;
    this.laudo.motivo = agendamento.motivo;
  }

  onChange(event) {
    const codAgenda = event.value;

  }

  get editando() {
    return Boolean(this.laudo.codigo)
  }

  carregarLaudo(codigo: number) {
    this.laudoService.buscarPorCodigo(codigo)
      .then(laudo => {
        this.laudo = laudo;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLaudo(form);
    } else {
      this.adicionarLaudo(form);
    }
  }

  adicionarLaudo(form: FormControl) {
    this.laudo.agendamento = this.agendamento;
    this.laudoService.adicionar(this.laudo)
      .then(laudoAdicionado => {
        this.gerarLaudo(laudoAdicionado.codigo);
        this.toasty.success('Laudo adicionado com sucesso!');
        this.router.navigate(['/laudos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLaudo(form: FormControl) {
    this.laudoService.atualizar(this.laudo)
      .then(laudo => {
        this.laudo = laudo;

        this.toasty.success('Laudo alterado com sucesso!');
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
      this.laudo = new Laudo();
    }.bind(this), 1);

    this.router.navigate(['/laudos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de laudo`);
  }

  carregarAgendamentosParaLaudo() {
    return this.agendamentoService.pesquisarAgendamentosParaLaudo()
      .then(agendamentos => {
        this.agendamentos = agendamentos
          .map(c => ({ label: c.descricao, value: c.codigo }));
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
