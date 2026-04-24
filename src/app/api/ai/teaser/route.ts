import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const apiKey = process.env.OPENAI_API_KEY

        if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
            return NextResponse.json({
                html: generateFallbackTeaser(body),
                text: generateFallbackTeaserText(body),
            })
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a professional M&A advisor creating blind teasers for business sales. Write anonymous, professional teasers that highlight key business strengths without revealing identifying information. Use a business-neutral, discrete tone. Output valid HTML for the teaser.',
                    },
                    {
                        role: 'user',
                        content: `Generate a blind teaser for this business:
Industry: ${body.industry}
Region: ${body.region}
Revenue: €${body.revenue}
EBITDA: €${body.ebitda}
Employees: ${body.employeeCount}
Business Model: ${body.businessModel}
Reason for Sale: ${body.reasonForSale}
Asking Price: €${body.askingPrice}
Year Established: ${body.yearEstablished}`,
                    },
                ],
                temperature: 0.6,
                max_tokens: 800,
            }),
        })

        if (!response.ok) {
            return NextResponse.json({
                html: generateFallbackTeaser(body),
                text: generateFallbackTeaserText(body),
            })
        }

        const data = await response.json()
        const content = data.choices[0]?.message?.content || ''

        return NextResponse.json({
            html: content,
            text: content.replace(/<[^>]*>/g, ''),
        })
    } catch {
        return NextResponse.json(
            { error: 'Failed to generate teaser' },
            { status: 500 }
        )
    }
}

function generateFallbackTeaser(body: Record<string, string>) {
    const formatEur = (n: number) =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

    return `<div style="font-family: system-ui, sans-serif; max-width: 600px;">
<h2 style="color: #0D1B2A; border-bottom: 2px solid #D4A853; padding-bottom: 8px;">
  Confidential Business Opportunity
</h2>
<p><strong>Sector:</strong> ${body.industry}</p>
<p><strong>Region:</strong> ${body.region}</p>
<p><strong>Annual Revenue:</strong> ${formatEur(Number(body.revenue))}</p>
<p><strong>EBITDA:</strong> ${formatEur(Number(body.ebitda))}</p>
<p><strong>Team Size:</strong> ${body.employeeCount} employees</p>
${body.businessModel ? `<p><strong>Business Model:</strong> ${body.businessModel}</p>` : ''}
<p><strong>Reason for Sale:</strong> ${body.reasonForSale}</p>
<p><strong>Indicative Asking Price:</strong> ${formatEur(Number(body.askingPrice))}</p>
<hr style="border: 1px solid #eee;" />
<p style="color: #666; font-size: 14px;">
  This is a confidential blind teaser distributed by DealFlow. For more information, 
  please request NDA access through the platform.
</p>
</div>`
}

function generateFallbackTeaserText(body: Record<string, string>) {
    const formatEur = (n: number) =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

    return `CONFIDENTIAL BUSINESS OPPORTUNITY
Sector: ${body.industry}
Region: ${body.region}
Annual Revenue: ${formatEur(Number(body.revenue))}
EBITDA: ${formatEur(Number(body.ebitda))}
Team Size: ${body.employeeCount} employees
Reason for Sale: ${body.reasonForSale}
Indicative Asking Price: ${formatEur(Number(body.askingPrice))}

This is a confidential blind teaser distributed by DealFlow.`
}
