import { AgendaService } from './../../agendas/agenda.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FuncionarioService } from './../../funcionarios/funcionario.service';
import { Agendamento, Horario, Agenda, Empresa } from './../../core/model';
import { AgendamentoService } from './../agendamento.service';
import { AuthService } from 'app/seguranca/auth.service';
import { EmpresaService } from 'app/empresas/empresa.service';


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
  maisDeUmaEmpresa: boolean = false;
  modoEdicao: boolean = false;
  mostrarHorarios: boolean = false;
  empresa = new Empresa();
  empresas = [];
  codEmpresa: number;
  codigoFunc: number;
  filteredFuncionariosSingle: any[];

  constructor(
    private funcionarioService: FuncionarioService,
    private agendamentoService: AgendamentoService,
    private empresaService: EmpresaService,
    private agendaService: AgendaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    this.title.setTitle('Novo agendamento');
    this.carregarMotivos();
    this.carregarHorarios();
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

  selectHorario(event) {
    this.horario.codigo = this.agendamento.codHorario;
  }

  filtraMotivos(form: FormControl) {
    this.agendamento.agenda.codigo = null;
    this.agendamento.codHorario = null;
    this.agendamento.funcionario.codigo = null;
    this.agendamento.trabalhoArmado = false;
    this.maisDeUmaEmpresa = false;
    this.empresas = [];
    this.carregarHorarios();
  }

  onChange(event) {
    const codAgenda = event.value;

    if (codAgenda) {
      this.mostrarHorarios = true;
      this.modoEdicao = false;
      this.agendaService.buscaPorCodigo(this.agendamento.agenda.codigo)
        .then(agenda => {
          this.agenda = agenda;
          this.horarios = this.agenda.horarios
            .map(c => ({ label: c.horaExame + ' Horas - restam: ' + c.restante + ' vagas', value: c.codigo }));
        })
        .catch(erro => this.errorHandler.handle(erro));

    }
  }

  loadEmpresa() {
    this.empresa = this.agendamento.empresa;
    this.empresas.push(this.empresa);
    this.empresas = this.empresas.map(c => {
      return { label: c.nome, value: c.codigo };
    });
    this.codEmpresa = this.empresa.codigo;
    this.maisDeUmaEmpresa = true;
  }

  salvar(form: FormControl) {
    this.adicionarAgendamento(form);
  }

  adicionarAgendamento(form: FormControl) {
    this.agendamento.empresa = this.empresa;
    if (this.agendamento.avulso) {
      this.horario.avulso = true;
      this.horarios.push(this.horario);
      this.agenda.horarios = this.horarios;
      this.agendamento.agenda = this.agenda;
    }
    this.agendamentoService.adicionar(this.agendamento)
      .then(agendamentoAdicionado => {
        this.maisDeUmaEmpresa = false;
        this.empresas = [];
        this.messageService.add({ severity: 'success', detail: 'Agendamento cadastrado com sucesso' });
        this.router.navigate(['/agendamentos']);
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
    const isTrabalhoArmado = this.agendamento.trabalhoArmado ? this.agendamento.trabalhoArmado : false;
    return this.agendaService.pesquisarAgendasParaTrabalhoArmado(isTrabalhoArmado)
      .then(agendas => {
        this.agendasCopy = agendas.content;
        const agendasDropDown = agendas.content;
        this.agendas = agendasDropDown
          .map(c => ({ label: c.diaAgenda, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresas() {
    this.empresaService.pesquisarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      });
  }

  selecionaEmpresa() {
    this.empresa.codigo = this.codEmpresa;
  }

  selecionaFuncionario() {
    this.funcionarioService.buscaPorCodigo(this.agendamento.funcionario.codigo)
      .then(func => {
        if (func.empresas.length > 1) {
          this.maisDeUmaEmpresa = true;
          this.empresas = func.empresas.map(c => {
            return { label: c.nome, value: c.codigo };
          });
        } else if (func.empresas.length === 1) {
          this.empresa = func.empresas[0];
        }
      });
  }

}
