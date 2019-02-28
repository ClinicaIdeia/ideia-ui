import { Contato } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Empresa } from 'app/core/model';
import { EmpresaService } from '../empresa.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

  empresa = new Empresa();
  contato = new Contato();
  contatos = [];

  constructor(
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHander: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Empresas');
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarEmpresa(codigo);
    }
  }

  adicionaContato(contato) {

    if (!contato.nome && !contato.telefone && !contato.email) {
      return;
    }

    contato.codigo = null;
    this.contatos.push(contato);
    this.empresa.contatos = [];

    setTimeout(function () {
      this.empresa.contatos = this.contatos;
      this.contato = new Contato();
    }.bind(this), 1);

  }

  removerContato(contato) {

   const index = this.contatos.indexOf(contato);
   this.empresa.contatos = [];

   if (index !== -1) {
    this.contatos.splice(index, 1);
   }

   setTimeout(function () {
      this.empresa.contatos = this.contatos;
    }.bind(this), 1);

  }

  buscarCep(event: any) {
    const cep = this.empresa.endereco.cep;
    this.empresaService.carregarEndereco(cep)
      .then((ret) => {
        this.empresa.endereco = ret;
      })
      .catch((erro) => {
        this.errorHander.handle(erro);
      });
  }

  carregarEmpresa(codigo: number) {
    this.empresaService.buscaPorCodigo(codigo)
      .then((response) => {
        this.empresa = response;
        this.contatos = this.empresa.contatos;
        this.atualizaTituloEdicao();
      })
      .catch((erro) => {
        this.errorHander.handle(erro);
      });
  }


  get editando() {
    return Boolean(this.empresa.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizaEmpresa(form);
    } else {
      this.adicionarEmpresa(form);
    }
  }

  adicionarEmpresa(form: FormControl) {
    this.empresaService.adicionar(this.empresa)
      .then(func => {
        this.messageService.add({ severity: 'success', detail: 'Empresa cadastrada com sucesso!' });
        this.router.navigate(['/empresas', func.codigo]);

      })
      .catch(erro => {
        this.errorHander.handle(erro);
      });
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.empresa = new Empresa();
    }.bind(this), 1);

    this.router.navigate(['/empresas/novo']);
  }

  atualizaEmpresa(form: FormControl) {
    this.empresaService.atualizar(this.empresa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Empresa atualizada com sucesso!' });
        this.atualizaTituloEdicao();
      })
      .catch((erro) => {
        this.errorHander.handle(erro);
      });
  }

  atualizaTituloEdicao() {
    this.title.setTitle(`Edição do Empresa, ${this.empresa.nome}.`)
  }

}
