import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export const GET = async () => {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
}

export const POST = async (request: Request) => {
    const req = await request.json()

    const product = await prisma.product.create({
        data: {
            name: req.name,
            description: req.description,
            price: req.price,
            amount: req.amount
        }
    })

    return new Response(JSON.stringify(product), { status: 200 });
}

export const PUT = async (request: Request) => {
    const req = await request.json()
    const product = await prisma.product.update({
        where: {
            id: req.id
        },
        data: {
            name: req.name,
            description: req.description,
            price: req.price,
            amount: req.amount
        }
    })

    return new Response(JSON.stringify(product), { status: 200 });
}

export const DELETE = async (request: Request) => {
    const req = await request.json()
    await prisma.product.delete({
        where: {
            id: req.id
        }
    })
    return new Response('success delete', { status: 200 });
}