import { AuthService } from './../../seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { EmpresaService, EmpresaFiltro } from '../empresa.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-empresa-pesquisa',
  templateUrl: './empresa-pesquisa.component.html',
  styleUrls: ['./empresa-pesquisa.component.css']
})
export class EmpresaPesquisaComponent implements OnInit {

  empresas = [];
  contatos = [];
  display = false;
  filtro = new EmpresaFiltro();

  constructor(
    private auth: AuthService,
    private empresaService: EmpresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Empresas');
    this.pesquisar();
  }

  pesquisar() {
    this.empresaService.pesquisar(this.filtro)
      .then(empresas => {
        this.empresas = empresas
      });
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
