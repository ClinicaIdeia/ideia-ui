import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioFiltro, UsuarioService } from 'app/usuarios/usuario.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from 'app/seguranca/auth.service';

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
  totalRegistros = 0;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
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

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
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

        this.messageService.add({ severity: 'info', detail: 'Usuário excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
