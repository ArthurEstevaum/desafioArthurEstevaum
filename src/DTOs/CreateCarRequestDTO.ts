import { Category } from "../entities/Car";

export interface CreateCarRequestDTO {
    manufacturer: string;
    model:  string;
    category: Category;
    modelYear: number;
    weekdayPrice: number;
    weekendPrice: number;
    loyaltyWeekdayPrice: number;
    loyaltyWeekendPrice: number;
}