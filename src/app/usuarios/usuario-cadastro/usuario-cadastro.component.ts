import { Component, OnInit } from '@angular/core';
import { Usuario, Permissao } from 'app/core/model';
import { UsuarioService } from 'app/usuarios/usuario.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { EmpresaService } from 'app/empresas/empresa.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  permissoes = [];
  empresas = [];
  permissoesSelecionadas = [];
  permissoesAdicionadas = [];
  sideBarPermissoes = false;

  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Usuarios');
    this.buscarPermissoes();
    this.carregarEmpresas();
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarUsuario(codigo);
    }
  }

  loadPermissoes() {
   this.sideBarPermissoes = true;
   this.permissoesAdicionadas = [];
   this.permissoesAdicionadas = this.permissoesSelecionadas;
  }

  addPermissao(permissao: Permissao) {

    let permissoesTemp = [];

    const index: number = this.permissoes.indexOf(permissao);
    this.permissoes.splice(index, 1);
    permissoesTemp = this.permissoes;
    this.permissoes = [];

    this.permissoesSelecionadas.push(permissao);

    setTimeout(function () {
      this.permissoes = permissoesTemp;
    }.bind(this), 1);

    this.toasty.info('Permissão adicionada com sucesso');

  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscaPorCodigo(codigo)
      .then((response) => {
        this.usuario = response;
        this.atualizaTituloEdicao();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }


  get editando() {
    return Boolean(this.usuario.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizaUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: FormControl) {
    this.usuario.permissoes = this.permissoesSelecionadas;
    this.usuarioService.adicionar(this.usuario)
      .then(func => {
        this.toasty.success('Usuario cadastrada com sucesso!');
        this.router.navigate(['/usuarios', func.codigo]);

      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  carregarEmpresas() {
    this.empresaService.pesquisarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      });
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  atualizaUsuario(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
      .then(() => {
        this.toasty.success('Usuario atualizada com sucesso!');
        this.atualizaTituloEdicao();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  buscarPermissoes() {
    this.usuarioService.pesquisarPermissoes()
      .then(response => {
        if (this.permissoes.length === 0) {
          this.permissoes = response;
        }
      })
  }

  atualizaTituloEdicao() {
    this.title.setTitle(`Edição do Usuario, ${this.usuario.nome}.`)
  }
}
