import prisma from "../src/lib/prismaClient";

async function seed() {
    const mainManufacturers = [
        {code: "23", name: "GM - Chevrolet"},
        {code: "26", name: "Hyundai"},
        {code: "43", name: "Nissan"},
        {code: "44", name: "Peugeot"},
        {code: "59", name: "VW - VolksWagen"},
    ]
    let models: any[] = [];

    mainManufacturers.forEach(async (manufacturer) => {
        const modelsResponse = await fetch(`https://fipe.parallelum.com.br/api/v2/cars/brands/${manufacturer.code}/models`)
        const modelData = await modelsResponse.json()
        models.push(modelData)
        console.log(modelData);
        
    })
    console.log(models);
    
        
    //const models = await fetch("https://fipe.parallelum.com.br/api/v2/cars/brands/")
    //await prisma.car.createMany()
}

seed()