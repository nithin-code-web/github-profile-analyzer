const prisma = require("../../prisma/prismaClient");

prisma.$connect()
    .then(() => {
        console.log("PostgreSQL connected with Prisma");
    })
    .catch((error) => {
        console.error("PostgreSQL connection failed:");
        console.error(error);
    });

module.exports = prisma;
