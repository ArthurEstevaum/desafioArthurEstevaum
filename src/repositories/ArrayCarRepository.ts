import { UUID } from "crypto";
import { Car, Category } from "../entities/Car";
import { ICarRepository } from "./ICarRepository";

export class ArrayCarRepository implements ICarRepository {
    private cars: Array<Car> = [];

    async save(car: Car): Promise<void> {
        this.cars.push(car);
    }

    async list(): Promise<Array<Car>> {
        return this.cars
    }

    async delete(id: UUID): Promise<void> {
        this.cars = this.cars.filter((car) => {
            car.id !== id
        })
    }
}