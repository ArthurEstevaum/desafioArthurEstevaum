import { Car, Category } from "../entities/Car";
import { ICarRepository } from "../repositories/ICarRepository";
import { CreateCarRequestDTO } from "../DTOs/CreateCarRequestDTO";
import { PrismaCarRepository } from "../repositories/PrismaCarRepository";

export class CreateCar {
    constructor(
        private carRepository: ICarRepository = new PrismaCarRepository()
    ) {}

    async execute(data: CreateCarRequestDTO) {
        if(data.category in Category) {
            const car = new Car(data);
            await this.carRepository.save(car)
            return
        }

        throw new Error("Invalid category for Car.")
    }
}