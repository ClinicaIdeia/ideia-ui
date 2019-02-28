import { MessageService } from 'primeng/components/common/messageservice';
import { FuncionarioFiltro } from '../funcionario.service';
import { FuncionarioService } from '../funcionario.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-funcionario-pesquisa',
  templateUrl: './funcionario-pesquisa.component.html',
  styleUrls: ['./funcionario-pesquisa.component.css']
})
export class FuncionarioPesquisaComponent implements OnInit {

  funcionarios = [];
  nome: string;
  telefone: string;
  cpf: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Funcionários');
    this.pesquisar();
  }

  pesquisar() {
    const filtro: FuncionarioFiltro = {
      nome: this.nome,
      telefone: this.telefone,
      cpf: this.cpf,
    }
    this.funcionarioService.pesquisar(filtro)
      .then(funcionarios => this.funcionarios = funcionarios);
  }

  excluir() {
    this.confirmation.confirm({
      message: 'Deseja excluir este registro ?',
      accept: () => {
        this.messageService.add({ severity: 'info', detail: 'Registro excluído com sucesso!' });
      }
    });
  }

}
