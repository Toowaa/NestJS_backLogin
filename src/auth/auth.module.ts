import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserLoginModule } from 'src/user-login/user-login.module';
import { UserLoginService } from 'src/user-login/user-login.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constantes';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';




@Module({
  imports: [UserLoginModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3d' },
  }),
  ],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  controllers: [AuthController],
})
export class AuthModule { }
