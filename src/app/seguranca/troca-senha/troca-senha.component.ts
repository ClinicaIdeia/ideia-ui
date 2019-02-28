import { Component, OnInit } from '@angular/core';
import { SenhaAlterar } from 'app/core/model';
import { UsuarioService } from 'app/usuarios/usuario.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  senhaAlterar = new SenhaAlterar();

  constructor(
    private usuarioService: UsuarioService,
    public auth: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Troca de senha');
  }

  senhasDiferentes() {
    return (this.senhaAlterar.confirmacao !== this.senhaAlterar.senhaNova);
  }

  salvar(form: FormControl) {
    if (!this.senhasDiferentes()) {
      this.usuarioService.trocarSenha(this.senhaAlterar, this.auth.jwtPayload.cod_usuario)
        .then(() => {
          form.reset();
          this.messageService.add({ severity: 'success', detail: 'Senha alterada com sucesso. Faça novo login!' });
          this.router.navigate(['/login']);
        })
        .catch((erro) => {
          this.errorHandler.handle(erro);
        });

    } else {
      this.messageService.add({ severity: 'warn', detail: 'A senha de confirmação esta divergente da nova senha!!' });
    }

  }

  canceled(form: FormControl) {
    this.router.navigate(['/agendamentos']);
  }

}
