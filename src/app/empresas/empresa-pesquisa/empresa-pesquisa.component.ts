import { AuthService } from './../../seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { EmpresaService, EmpresaFiltro } from '../empresa.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-empresa-pesquisa',
  templateUrl: './empresa-pesquisa.component.html',
  styleUrls: ['./empresa-pesquisa.component.css']
})
export class EmpresaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  empresas = [];
  contatos = [];
  display = false;
  filtro = new EmpresaFiltro();

  constructor(
    private auth: AuthService,
    private empresaService: EmpresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Empresas');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.empresaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.empresas = resultado.empresas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  showDialog(empresa) {
    this.contatos = [];
    this.contatos = empresa.contatos;
    this.display = true;
  }

  excluir() {
    this.confirmation.confirm({
      message: 'Deseja excluir este registro ?',
      accept: () => {
        this.toasty.info('Resgistro excluido com sucesso!');
      }
    });
  }

}
