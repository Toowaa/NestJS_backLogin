import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserLoginModule } from './user-login/user-login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './user-login/entities/user-login.entity';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [UserLoginModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'test',
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
