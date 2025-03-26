import { PrismaClient, Proprietario, Veiculo } from '@prisma/client'

const prisma = new PrismaClient()

const cadastrar = async (proprietario: Proprietario & { veiculos: Veiculo[] }) => {

    let resultado = await prisma.proprietario.create({
        data: {
            nome: proprietario.nome,
            documentoIdentificacao: proprietario.documentoIdentificacao,
            veiculos: {
                create: proprietario.veiculos.map(veiculo => ({
                    fabricante: veiculo.fabricante,
                    numeroChassi: veiculo.numeroChassi
                }))
            }
        }
    })

    console.log(`Proprietário cadastrado:`)
    console.log(`Nome: ${proprietario}, documento: ${proprietario.documentoIdentificacao}`)
    proprietario.veiculos.forEach(veiculo => {
        console.log(`Veiculo cadastrado:`)
        console.log(`   Fabricante: ${veiculo.fabricante}`)
        console.log(`   Chassi: ${veiculo.numeroChassi}`)
    })
}

const proprietario: Proprietario & { veiculos: Veiculo[] } = {
    id: 0,
    nome: "Maria Oliveira",
    documentoIdentificacao: "9876543210",
    veiculos: [
        {
            fabricante: "GM", numeroChassi: "123456ABC",
            id: 0,
            proprietarioId: null
        },
        {
            fabricante: "FIAT", numeroChassi: "847566HJY",
            id: 0,
            proprietarioId: null
        },
        {
            fabricante: "FORD", numeroChassi: "163546RTV",
            id: 0,
            proprietarioId: null
        }
    ]
}

setTimeout(async () => { cadastrar(proprietario) }, 1000);