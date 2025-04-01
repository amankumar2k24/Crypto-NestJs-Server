import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create-user-request';
import { UserRepository } from './user.repository';
import { UserResponse } from './dto/response/user-response';
import { hash } from 'bcrypt';
import { User } from './models/User';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(createUserRequest: CreateUserRequest): Promise<UserResponse> {
        await this.validateCreateUserRequest(createUserRequest)
        const user = await this.userRepository.insertOne({
            ...createUserRequest,
            password: await hash(createUserRequest.password, 10),
        })
        return this.buildResponse(user);
    }

    private async validateCreateUserRequest(createUserRequest: CreateUserRequest): Promise<void> {
        const user = await this.userRepository.findOneByEmail(createUserRequest.email);
        if (user) {
            throw new BadRequestException(`User with email already exists`);
        }
    }

    private buildResponse(user: User): UserResponse {
        return {
            _id: user._id as string,
            email: user.email
        }
    }

}
