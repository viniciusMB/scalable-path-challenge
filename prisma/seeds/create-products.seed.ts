import { PrismaClient } from '@prisma/client';

export async function createProductsSeed(prisma: PrismaClient) {
  await prisma.product.createMany({
    data: [
      {
        externalCode: '103',
        title: 'Mensal START',
        price: 249.99,
        description:
          'Para resolver os seus problemas de atendimento de forma simples',
        isActive: true,
      },
      {
        externalCode: '120',
        title: 'Mensal STAND ALONE Garçom',
        price: 249.99,
        description:
          'Para resolver os seus problemas de atendimento de forma simples',
        isActive: true,
      },
      {
        externalCode: '104',
        title: 'Semestral START',
        price: 1133.99,
        description:
          'Para resolver os seus problemas de atendimento de forma simples',
        isActive: true,
      },
      {
        externalCode: '105',
        title: 'Anual START',
        price: 2639.88,
        description:
          'Para resolver os seus problemas de atendimento de forma simples',
        isActive: true,
      },
      {
        externalCode: '106',
        title: 'Mensal ADVANCED',
        price: 299.99,
        description:
          'Melhor opção para quem quer um atendimento de qualidade e fidelização de cliente',
        isActive: true,
      },
      {
        externalCode: '107',
        title: 'Semestral ADVANCED',
        price: 1619.94,
        description:
          'Melhor opção para quem quer um atendimento de qualidade e fidelização de cliente',
        isActive: true,
      },
      {
        externalCode: '108',
        title: 'Anual ADVANCED',
        price: 3059.88,
        description:
          'Melhor opção para quem quer um atendimento de qualidade e fidelização de cliente',
        isActive: true,
      },
      {
        externalCode: '109',
        title: 'Mensal PREMIUM',
        price: 389.99,
        description: 'Um nível a mais de gestão e atendimento ao cliente',
        isActive: true,
      },
      {
        externalCode: '110',
        title: 'Semestral PREMIUM',
        price: 1889.95,
        description: 'Um nível a mais de gestão e atendimento ao cliente',
        isActive: true,
      },
      {
        externalCode: '111',
        title: 'Anual PREMIUM',
        price: 3959.9,
        description: 'Um nível a mais de gestão e atendimento ao cliente',
        isActive: true,
      },
    ],
  });

  console.log('- Products Seed');
}
