'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const guestSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),

})

export type GuestFormData = z.infer<typeof guestSchema>

export async function adicionarConvidado(data: GuestFormData) {
  try {
    const validatedData = guestSchema.parse(data)

    const newGuest = await prisma.guest.create({
      data: validatedData
    })


    return {
      success: true,
      data: newGuest
    }
  } catch (error) {
    console.error('Erro ao adicionar convidado:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Dados inválidos',
        details: error.issues
      }
    }

    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}



