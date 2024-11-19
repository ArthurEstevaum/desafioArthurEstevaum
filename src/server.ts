// Import the framework and instantiate it
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { CreateCarRequestDTO } from './DTOs/CreateCarRequestDTO'
import { CarController } from './controllers/CarController'
import { UUID } from 'crypto'
import { DeleteCarRequestDTO } from './DTOs/DeleteCarRequestDTO'
import { Category } from './entities/Car'
import { CarCategoryDTO } from './DTOs/CarCategoryDTO'
import { CheapestCarDTO } from './DTOs/CheapestCarDTO'
const fastify: FastifyInstance = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.get('/cars', (request, reply) => {
  new CarController().index(request, reply)
})

fastify.get<{Params: CarCategoryDTO}>('/cars/:carCategory', (request, reply) => {
  new CarController().indexByCategory(request, reply)
})

fastify.get<{Querystring: CheapestCarDTO}>('/cheapest-car', (request, reply) => {
  new CarController().showCheapest(request, reply)
})

fastify.post<{Body: CreateCarRequestDTO}>('/create-car', (request, reply) => {
  new CarController().store(request, reply)
})

fastify.delete<{Body: DeleteCarRequestDTO}>('/delete-car', (request, reply) => {
  new CarController().remove(request, reply)
})

// Run the server!
try {
 fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

