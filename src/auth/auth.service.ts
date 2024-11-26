import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'crypto';
import { UserLoginService } from 'src/user-login/user-login.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UserLoginService,
        private jwtService: JwtService


    ) { }



    async signIn(
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
      try{
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException(`Verifique el ${email} ingresado`);
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }
        const payload = { email: user.email, id: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
      }catch(error){
        console.error("Error es:",error)
        throw error;
      }
    }

}
