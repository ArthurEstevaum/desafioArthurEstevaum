import { eachDayOfInterval, getDay, min } from "date-fns";
import { ICarRepository } from "../repositories/ICarRepository";
import { PrismaCarRepository } from "../repositories/PrismaCarRepository";
import { Car } from "@prisma/client";

export class CheapestCar {
    constructor(
        private carRepository: ICarRepository = new PrismaCarRepository()
    ) {}

    async execute(startDate: Date, endDate: Date, isLoyalCustomer: boolean = false) {
        if(startDate >= endDate) {
            throw RangeError("The end date should be at least one day after start date")
        }

        const cars = await this.carRepository.list();
        let cheapestCar: Car = cars[0];

        let daysInterval = eachDayOfInterval({
            start: startDate,
            end: endDate
        });
        daysInterval.pop() //excludes last day from rent accountability

        const daysQuantity = {
            weekdays: 0,
            weekends: 0
        };

        daysInterval.forEach((day) => {
            const dayValue = getDay(day);
            if(dayValue == 0 || dayValue == 6) { //Weekend values (Saturday or sunday)
                daysQuantity.weekends++ 
            } else {
                daysQuantity.weekdays++
            }
        })

        let cheapestCarPrice = cars[0].calculateRent(daysQuantity.weekdays, daysQuantity.weekends, isLoyalCustomer);
        const higherCategory = (rentValue: number, category: number) => {
            return rentValue == cheapestCarPrice && category > cheapestCar.category
        }

        cars.forEach((car) => {
            const carRentValue = car.calculateRent(daysQuantity.weekdays, daysQuantity.weekends, isLoyalCustomer)
            if(carRentValue < cheapestCarPrice || higherCategory(carRentValue, car.category)) {
                cheapestCar = car
                cheapestCarPrice = carRentValue
            }
        })

        return { cheapestCar, cheapestCarPrice }
    }
}