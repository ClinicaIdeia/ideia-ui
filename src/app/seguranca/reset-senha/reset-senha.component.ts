import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { SenhaReiniciar } from 'app/core/model';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {

  reset = new SenhaReiniciar();

  constructor(
        private toasty: ToastyService,
        private errorHandler: ErrorHandlerService,
        private auth: AuthService,
        private router: Router
    ) { }

  ngOnInit() {
  }

  resetSenha() {

    this.auth.recuperaSenha(this.reset)
      .then(func => {
        this.toasty.success('Senha recuperada com sucesso! Verifique seu e-mail.');
        this.router.navigate(['/login']);

      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}
