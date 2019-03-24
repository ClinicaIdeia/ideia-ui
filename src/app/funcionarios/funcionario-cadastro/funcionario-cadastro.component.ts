import { AuthService } from 'app/seguranca/auth.service';
import { Empresa, Endereco } from 'app/core/model';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from './../../core/model';
import { FuncionarioService } from '../funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { EmpresaService } from 'app/empresas/empresa.service';
import * as moment from 'moment';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.css']
})
export class FuncionarioCadastroComponent implements OnInit {

  formulario: FormGroup;

  conselhos = [
    { label: 'CRP', value: 'CRP' },
    { label: 'CRM', value: 'CRM' },
  ];

  generos = [
    { label: 'Feminino', value: 'FEMININO' },
    { label: 'Masculino', value: 'MASCULINO' },
  ];

  estadosCivis = [
    { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
    { label: 'Casado(a)', value: 'CASADO(A)' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
    { label: 'União estável', value: 'UNIAO ESTÁVEL' },
    { label: 'Viúvo(a)', value: 'VIUVO(A)' },
  ];

  escolaridades = [
    { label: 'Ensino Básico', value: 'BÁSICO' },
    { label: 'Ensino Fundamental', value: 'FUNDAMENTAL' },
    { label: 'Ensino Médio', value: 'MÉDIO' },
    { label: 'Superior', value: 'SUPERIOR' },
    { label: 'Pós Graduação', value: 'PÓS GRADUAÇÃO' },
    { label: 'Mestrado', value: 'MESTRADO' },
    { label: 'Doutorado', value: 'DOUTORADO' },
    { label: 'Pós Doutrorado', value: 'PÓS DOUTORADO' },
    { label: 'Analfabeto', value: 'ANALFABETO(A)' },
  ];

  funcionario = new Funcionario();
  empresa = new Empresa();
  company = new Empresa();
  empresas = [];
  codEmpresa: number;
  codigoFunc: number;

  constructor(
    private funcionarioService: FuncionarioService,
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHander: ErrorHandlerService,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {

    this.title.setTitle('Cadastro de Funcionários');
    const codigo = this.route.snapshot.params['codigo'];
    this.codigoFunc = codigo;
    if (codigo) {
      this.carregarFuncionario(codigo);
    }

    this.carregarEmpresas();

  }

  get editando() {
    return Boolean(this.funcionario.codigo);
  }

  get urlUploadAnexo() {
    return this.funcionarioService.urlUploadAnexo();
  }

  loadFuncionario() {
    this.funcionarioService.buscaPorCPF(this.funcionario.cpf)
      .then((response) => {
        this.funcionario = response;
        this.atualizaTituloEdicao();
        this.router.navigate(['/funcionarios', this.funcionario.codigo]);
      })
      .catch((erro) => {
      });
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.xhr.response);
    if (anexo) {
      const urlAnexo = anexo.url;
      const anexoName = anexo.nome;
      this.funcionario.anexo = anexoName;
      this.funcionario.urlAnexo = urlAnexo;
      this.atualizaFuncionario(null);
    }

  }

  carregarFuncionario(codigo: number) {
    this.funcionarioService.buscaPorCodigo(codigo)
      .then((response) => {
        this.funcionario = response;
        if (!this.funcionario.endereco) {
          this.funcionario.endereco = new Endereco();
        }
        if (this.funcionario.empresas) {
          const tmg = this.funcionario.empresas.length;
          const emp = this.funcionario.empresas[tmg - 1];
          this.codEmpresa = emp.codigo;
        }
        this.atualizaTituloEdicao();
      })
      .catch((erro) => {
        this.errorHander.handle(erro);
      });
  }

  salvar(form: FormControl) {

    if (this.codEmpresa) {
      this.empresa.codigo = this.codEmpresa;
    } else {
      const cod_empresa = this.auth.jwtPayload.cod_empresa;
      this.empresa.codigo = cod_empresa;
    }

    if (this.funcionario.empresas.length > 0) {
      this.funcionario.empresas.forEach(empresa => {
        if (empresa.codigo !== this.empresa.codigo) {
          this.funcionario.empresas.push(this.empresa);
        }
      });
    } else {
      this.funcionario.empresas.push(this.empresa);
    }
    if (this.editando) {
      this.atualizaFuncionario(form);
    } else {
      this.adicionarFuncionario(form);
    }
  }

  selecionaEmpresa() {
    this.empresa.codigo = this.codEmpresa;
  }

  adicionarFuncionario(form: FormControl) {

    this.funcionarioService.adicionar(this.funcionario)
      .then(func => {
        const msg = 'Funcionário cadastrado com sucesso!';
        this.messageService.add({ severity: 'success', detail: msg })
        this.router.navigate(['/funcionarios', func.codigo]);

      })
      .catch(erro => {

        const index = this.funcionario.empresas.indexOf(this.empresa);
        this.funcionario.empresas.splice(index, 1);
        this.errorHander.handle(erro);
      });
  }

  checkDate(envent: Event) {
    if (!this.validaData(this.funcionario.dataNascimento)) {
      this.messageService.add({ severity: 'error', detail: 'Data com formato inválido!!!' });
    }
    this.validaSeDataEMaiorQueHoje(this.funcionario.dataNascimento);
  }

  validaSeDataEMaiorQueHoje(dataNascimento: string) {
    moment.locale('pt-BR')
    if (moment(dataNascimento, ['DD/MM/YYYY']).isAfter(moment())) {
      this.funcionario.dataNascimento = null;
      this.messageService.add({ severity: 'error', detail: 'Data de nascimento maior que hoje!' });
    }
  }

  validaData(str) {
    moment.locale('pt-BR')
    return moment(str, ['DD/MM/YYYY']).isValid();
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.funcionario = new Funcionario();
    }.bind(this), 1);

    this.router.navigate(['/funcionarios/novo']);
  }

  atualizaFuncionario(form: FormControl) {

    this.funcionarioService.atualizar(this.funcionario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Funcionário atualizado com sucesso!' })
        this.atualizaTituloEdicao();
      })
      .catch((erro) => {
        this.codEmpresa = null;
        this.errorHander.handle(erro);
      });
  }

  atualizaTituloEdicao() {
    this.title.setTitle(`Edição do Funcionário, ${this.funcionario.nome}.`)
  }

  carregarEmpresas() {
    this.empresaService.pesquisarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      });
  }

  buscarCep(event: any) {
    const cep = this.funcionario.endereco.cep;
    this.funcionarioService.carregarEndereco(cep)
      .then((ret) => {
        this.funcionario.endereco = ret;
      })
      .catch((erro) => {
        this.errorHander.handle(erro);
      });
  }
}
