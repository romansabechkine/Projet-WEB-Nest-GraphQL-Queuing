import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {

    async findAll() {
        return [];
    }

    async findOneById(id: string) {
        return null;
    }

    async create(input: any) {
        return null;
    }

    async update(id: string, input: any) {
        return null;
    }

    async remove(id: string) {
        return null;
    }
}