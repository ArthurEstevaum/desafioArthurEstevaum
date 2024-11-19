import { UUID } from "crypto";
import { Car } from "../entities/Car";
import prisma from "../lib/prismaClient";
import { ICarRepository } from "./ICarRepository";

export class PrismaCarRepository implements ICarRepository {
    async save(car: Car): Promise<void> {
        await prisma.car.create({
            data: {
                id: car.id,
                manufacturer: car.manufacturer,
                model: car.model,
                modelYear: car.modelYear,
                category: car.category,
                weekdayPrice: car.weekdayPrice,
                weekendPrice: car.weekendPrice,
                loyaltyWeekdayPrice: car.loyaltyWeekdayPrice,
                loyaltyWeekendPrice: car.loyaltyWeekendPrice,
            }
        })
    }

    async delete(id: UUID): Promise<void> {
        await prisma.car.delete({
            where: {
                id: id
            }
        })
    }

    async list(): Promise<Array<Car>> {
        const listedCars = await prisma.car.findMany()
        const entities = listedCars.map((car) => {
            return new Car(car, car.id)
        })
        
        return entities
    }

    async listByCategory(category: number): Promise<Array<Car>> {
        const listedCars = await prisma.car.findMany({
            where: {
                category: category
            }
        })

        const entities = listedCars.map((car) => {
            return new Car(car, car.id)
        })
        
        return entities
    }
}