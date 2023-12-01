import { DataSource } from 'typeorm';
import { IContext } from './auth.interface';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    private dataSource;
    constructor(authService: AuthService, dataSource: DataSource);
    getUserId(context: IContext): Promise<any>;
}
