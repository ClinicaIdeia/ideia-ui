import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { SenhaReiniciar } from 'app/core/model';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {

  reset = new SenhaReiniciar();
  salvando: boolean = false;
  painel: string;

  constructor(
        private messageService: MessageService,
        private errorHandler: ErrorHandlerService,
        private auth: AuthService,
        private router: Router
    ) { }

  ngOnInit() {
  }

  resetSenha() {
    this.salvando = true;
    this.auth.recuperaSenha(this.reset)
      .then(func => {
        this.salvando = false;
        this.messageService.add({ severity: 'success', detail: 'Senha recuperada com sucesso! Verifique seu e-mail!' });
        this.router.navigate(['/login']);

      })
      .catch(erro => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

}
