import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { BlockUIModule } from 'primeng/components/blockui/blockui';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { AuthService } from './auth.service';
import { IdeiaHttp } from './ideia-http';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { SharedModule } from '../shared/shared.module';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });

  return new IdeiaHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    BlockUIModule,
    ProgressSpinnerModule,
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent, ResetSenhaComponent, TrocaSenhaComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
