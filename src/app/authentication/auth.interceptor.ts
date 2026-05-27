import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Busca o token salvo no navegador
  const token = sessionStorage.getItem('auth-token');

  // 2. Se o token existir, clona a requisição e adiciona o cabeçalho Authorization
  if (token) {
    const reqClonada = req.clone({
      setHeaders: {
        Authorization: token // O token já possui o prefixo 'Bearer ' gravado do login
      }
    });
    return next(reqClonada); // Envia a requisição modificada
  }

  // 3. Se não houver token (ex: rota de login ou registro), envia a requisição normal
  return next(req);
};