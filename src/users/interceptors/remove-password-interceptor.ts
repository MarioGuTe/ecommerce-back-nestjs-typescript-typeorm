import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/entities/users.entity';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: User[] | User) => {
        // If the response is an array of users, remove password from each user
        if (Array.isArray(data)) {
          return data.map((user) => this.removePassword(user));
        }
        // If the response is a single user, remove password from the user
        return this.removePassword(data);
      }),
    );
  }

  private removePassword(user: User): Partial<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDataWithoutPassword } = user;
    return userDataWithoutPassword;
  }
}
