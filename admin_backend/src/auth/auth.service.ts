import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// import { User } from './user.interface'; // Define your user interface or model

@Injectable()
export class AuthService {
    private readonly jwtSecret: string;
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    }

    async login(user: any) {
        const payload = { username: "user.username" };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.jwtSecret }),
        };
    }

    async validateUser(payload: any): Promise<any> {
        // Add logic to validate user from the payload
        // For example, check if the user exists in your database
        return { userId: payload.sub, username: payload.username }; // Adjust according to your user model
    }
}
