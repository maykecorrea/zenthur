import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    console.log('🔍 JWT Strategy - Payload:', payload);
    
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
        }
      });

      if (!user) {
        console.log('❌ Usuário não encontrado para ID:', payload.sub);
        throw new UnauthorizedException('Usuário não encontrado');
      }

      console.log('✅ Usuário validado:', user.email);
      
      return {
        userId: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role || 'user'
      };
    } catch (error) {
      console.log('❌ Erro na validação JWT:', error.message);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
