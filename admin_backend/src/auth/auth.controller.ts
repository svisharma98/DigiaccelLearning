// src/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LoginDto } from './login.dto'; // Define your DTO

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: any) {
        const user = { username: loginDto.username, userId: 1 }; // Replace with real user validation
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() loginDto: any) {
        const user = { username: loginDto.username, userId: 1 }; // Replace with real user validation
        return this.authService.login(user);
    }
}
