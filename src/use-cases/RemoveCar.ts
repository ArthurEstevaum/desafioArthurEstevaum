import { ICarRepository } from "../repositories/ICarRepository";
import { PrismaCarRepository } from "../repositories/PrismaCarRepository";
import { DeleteCarRequestDTO } from "../DTOs/DeleteCarRequestDTO";

export class RemoveCar {
    constructor(
        private carRepository: ICarRepository = new PrismaCarRepository()
    ) {}

    async execute(data: DeleteCarRequestDTO) {
        await this.carRepository.delete(data.id);
    }
}