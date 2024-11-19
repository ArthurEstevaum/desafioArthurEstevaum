import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCar } from "../use-cases/CreateCar";
import { CreateCarRequestDTO } from "../DTOs/CreateCarRequestDTO";
import { ListCars } from "../use-cases/ListCars";
import { ListByCategory } from "../use-cases/ListByCategory";
import { RemoveCar } from "../use-cases/RemoveCar";
import { DeleteCarRequestDTO } from "../DTOs/DeleteCarRequestDTO";
import { CarCategoryDTO } from "../DTOs/CarCategoryDTO";
import { CheapestCarDTO } from "../DTOs/CheapestCarDTO";
import { parse, isValid } from "date-fns";
import { CheapestCar } from "../use-cases/CheapestCar";

type CheapestCarRequest = FastifyRequest<{Querystring: CheapestCarDTO}>

export class CarController {
    async store(request: FastifyRequest<{Body: CreateCarRequestDTO}>, reply: FastifyReply) {
        const carRequest = request.body
        const createCar = new CreateCar()
        try {
            await createCar.execute(carRequest)
            return reply.code(201).send({"message": "Resource created successfully"})
        } catch(error) {
            return reply.code(400).send(error)
        }
    }

    async remove(request: FastifyRequest<{Body: DeleteCarRequestDTO}>, reply: FastifyReply) {
        try {
            await new RemoveCar().execute(request.body)
            reply.code(200).send({"message": "Resource deleted successfully"})
        } catch(error) {
            reply.code(400).send(error)
        }
    }

    async index(request: FastifyRequest, reply: FastifyReply) {
        const cars = await new ListCars().execute()
        
        return reply.code(200).send(cars)
    }

    async indexByCategory(request: FastifyRequest<{Params: CarCategoryDTO}>, reply: FastifyReply) {
        const { carCategory } = request.params
        const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)
       const unslugify = carCategory.split("-").map(capitalizeFirstLetter).join("");

       try {
        const cars = await new ListByCategory().execute(unslugify)
        return reply.code(200).send(cars)
       } catch(error) {
        return reply.code(400).send(error)
       }
    }

    async showCheapest(request: CheapestCarRequest, reply: FastifyReply) {
        const { startDate, endDate, isLoyalCustomer } = request.query
        const formatedStartDate = parse(startDate, "dd-MM-yyyy", new Date())
        const formatedEndDate = parse(endDate, "dd-MM-yyyy", new Date())
        
        if(!isValid(formatedStartDate) || !isValid(formatedStartDate)) {
            return reply.code(400).send({"message": "Dates was sended in wrong format. Send it in dd-MM-yyyy format."})
        }

        const { cheapestCar, cheapestCarPrice } = await new CheapestCar().execute(formatedStartDate, formatedEndDate, isLoyalCustomer)
        
        return reply.code(200).send({
            "cheapestCar": cheapestCar,
            "cheapestRentalPrice": cheapestCarPrice
        })
    }
}