import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../authentication/auth.service';

@Component({ 
    selector: 'app-login',
    templateUrl: 'login.html',
    styleUrls: ['./login.css'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      RouterModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule
    ]
})
export class LoginComponent implements OnInit {
  // Injeção de dependências moderna sem precisar de Constructor!
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Uso de Signals (Sinais) para reatividade moderna e leve de tela
  hide = signal(true);
  isLoggedIn = signal(false);
  isLoginFailed = signal(false);
  errorMessage = signal('');
  headers = signal<string[]>([]);

  // Criação do formulário mais enxuta usando o FormBuilder
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  ngOnInit(): void {
    if (sessionStorage.getItem('auth-token')) {
      this.isLoggedIn.set(true);
      this.router.navigate(["/cardapio"]);
    }
  }

  // Getters para capturar os controles tipados
  get email() { return this.loginForm.get('email') as FormControl; }
  get senha() { return this.loginForm.get('senha') as FormControl; }

  logar(): void {
    if (this.loginForm.invalid) {
      return; // Bloqueia o envio se o formulário estiver incompleto
    }

    // Envia os dados para a API na Render
    this.authService.login(this.loginForm.value as any).subscribe({
      next: (resp) => {
        // 1. Captura o token de dentro do corpo (body) da resposta HTTP
        const token = resp.body?.Authorization;
        
        if (token) {
          // 2. Salva o token no navegador sob a chave 'auth-token'
          sessionStorage.setItem('auth-token', token);
        }

        // 3. Atualiza os estados de sucesso e limpa falhas anteriores
        this.isLoginFailed.set(false);
        this.isLoggedIn.set(true);
        
        // 4. Redireciona o usuário para a rota protegida do cardápio
        this.router.navigate(["/cardapio"]);
      },
      error: (err) => {
        // Trata erros de credenciais inválidas ou queda do servidor
        this.isLoginFailed.set(true);
        this.isLoggedIn.set(false);
        this.errorMessage.set(err.error?.message || 'Falha ao realizar o login. Verifique seus dados.');
      }
    });
  }

  getErrorMessageEmail(): string {
    if (this.email.hasError('required')) return 'Campo obrigatório!';
    return this.email.hasError('email') ? 'E-mail inválido!' : '';
  }

  getErrorMessageSenha(): string {
    return this.senha.hasError('required') ? 'Campo obrigatório!' : '';
  }
}