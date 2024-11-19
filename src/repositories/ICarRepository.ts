import { UUID } from "crypto";
import { Car, Category } from "../entities/Car";

export interface ICarRepository {
    save(car: Car) : Promise<void>;
    list() : Promise<Array<Car>>;
    listByCategory(category: Category) : Promise<Array<Car>>;
    delete(id: UUID) : Promise<void>;
}