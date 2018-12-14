import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioFiltro, UsuarioService } from 'app/usuarios/usuario.service';
import { AuthService } from 'app/seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  usuarios = [];
  permissoes = [];
  sideBarPermissoes = false;
  filtro = new UsuarioFiltro();

  constructor(
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Usuários');
    this.pesquisar();
  }

  verPermissoes(codigo: number) {
    this.sideBarPermissoes = true;
    this.usuarios.forEach(element => {
      if (element.codigo === codigo) {
        this.permissoes = element.permissoes;
        return;
      }
    });

  }

  pesquisar() {
    this.usuarioService.pesquisar(this.filtro)
      .then(usuarios => {
        this.usuarios = usuarios
      });
  }

  confirmarExclusao(usario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usario);
      }
    });
  }

  excluir(usario: any) {
    this.usuarioService.excluir(usario.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Usuário excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
