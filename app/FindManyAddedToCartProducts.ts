import { prisma } from "@/prisma/client";

const addedToCartProducts  = await prisma.addedToCartProduct.findMany()

export default addedToCartProducts