import { randomUUID } from "crypto";

export enum Category {
    CompactHatch = 1,
    MediumHatch = 2,
    Sedan = 3,
    Van = 4,
    Pickup = 5,
}

export class Car  {
    public readonly id: string;
    public readonly category: Category;
    public readonly manufacturer: string;
    public readonly model: string;
    public readonly modelYear: string;
    public readonly weekdayPrice: number;
    public readonly weekendPrice: number;
    public readonly loyaltyWeekdayPrice: number;
    public readonly loyaltyWeekendPrice: number;

    constructor(props: {
        category: Category,
        manufacturer: string,
        model: string,
        modelYear: string,
        weekdayPrice: number,
        weekendPrice: number,
        loyaltyWeekdayPrice: number,
        loyaltyWeekendPrice: number,
    }, id?: string) {
        Object.assign(this, props)

        if(!id) {
            this.id = randomUUID();
        } else {
            this.id = id
        }
    }

    public calculateRent(weekdayQuantity: number, weekendQuantity: number, isLoyalCustomer: boolean) {
        if(isLoyalCustomer) {
            return (weekdayQuantity * this.loyaltyWeekdayPrice) + (weekendQuantity * this.loyaltyWeekendPrice)
        }

        return (weekdayQuantity * this.weekdayPrice) + (weekendQuantity * this.weekendPrice)
    }
}