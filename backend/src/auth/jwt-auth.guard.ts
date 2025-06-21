import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Log para debug
    const request = context.switchToHttp().getRequest();
    console.log('🔐 JWT Guard - Token presente:', !!request.headers.authorization);
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // Log para debug
    console.log('🔐 JWT Guard - User:', user ? 'Válido' : 'Inválido');
    console.log('🔐 JWT Guard - Error:', err);
    console.log('🔐 JWT Guard - Info:', info);

    if (err || !user) {
      console.log('❌ Autenticação falhou:', info?.message || err?.message);
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
