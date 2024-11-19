import { CarCategoryDTO } from "../DTOs/CarCategoryDTO";
import { Category } from "../entities/Car";
import { ICarRepository } from "../repositories/ICarRepository";
import { PrismaCarRepository } from "../repositories/PrismaCarRepository";

export class ListCars {
    constructor(
        private carRepository: ICarRepository = new PrismaCarRepository()
    ) {}

    async execute() {
        return await this.carRepository.list()
    }
}