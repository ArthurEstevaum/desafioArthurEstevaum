import { Category } from "../entities/Car";
import { ICarRepository } from "../repositories/ICarRepository";
import { PrismaCarRepository } from "../repositories/PrismaCarRepository";

export class ListByCategory {
    constructor(
        private carRepository: ICarRepository = new PrismaCarRepository()
    ) {}

    /***
     * @param category Should be PascalCase string like CompactHatch
     */
    async execute(category: string) {
        if(Category[category]) {
            const categoryAsInt = Category[category]
            return this.carRepository.listByCategory(categoryAsInt)
        }
        throw TypeError("Invalid category.")
    }
}