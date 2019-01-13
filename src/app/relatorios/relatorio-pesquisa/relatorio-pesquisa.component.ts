import { Component, OnInit } from '@angular/core';

import { RelatorioService } from './../relatorio.service';

@Component({
  selector: 'app-relatorio-pesquisa',
  templateUrl: './relatorio-pesquisa.component.html',
  styleUrls: ['./relatorio-pesquisa.component.css']
})
export class RelatorioPesquisaComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatorioService.relatorioAgendamentosPorEmpresa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }

}
