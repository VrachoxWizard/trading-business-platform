import { NextResponse } from 'next/server'
import * as z from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  topic: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const parsed = contactSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Neispravan format podataka.' },
        { status: 400 }
      )
    }

    const inbox = process.env.CONTACT_INBOX_EMAIL
    if (!inbox) {
      return NextResponse.json(
        {
          error:
            'Kontakt forma trenutno nije aktivna. Javite nam se na info@heritance.hr ili +385 1 234 5678.',
        },
        { status: 503 }
      )
    }

    console.info('Contact form submission', {
      to: inbox,
      submittedAt: new Date().toISOString(),
      ...parsed.data,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Došlo je do greške pri obradi zahtjeva.' },
      { status: 500 }
    )
  }
}
