import { IsEmail, IsEmpty } from "class-validator"

export class passdto{
    @IsEmail()
    email:string
    @IsEmpty()
    password:string
}