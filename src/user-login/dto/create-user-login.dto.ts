import { IsEmail, IsNotEmpty, IsString, isString, MinLength, minLength } from "class-validator";

export class CreateUserLoginDto {
    firstname: string
    lastname: string
    @IsEmail()
    email: string
    password: string
    createdAt: Date
    auth: string

}   
