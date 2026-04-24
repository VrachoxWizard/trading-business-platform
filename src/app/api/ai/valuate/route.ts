import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const apiKey = process.env.OPENAI_API_KEY

        if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
            // Return a generated narrative without AI
            return NextResponse.json({
                narrative: generateNarrative(body),
            })
        }

        // Call OpenAI API
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
                            'You are a professional M&A valuation analyst specializing in Croatian micro and small businesses. Provide concise, professional narratives explaining business valuations. Be specific about the factors that influenced the valuation. Keep the tone advisory and supportive. Write in 3-4 paragraphs.',
                    },
                    {
                        role: 'user',
                        content: `Generate a valuation narrative for this business:
Industry: ${body.industry}
Region: ${body.region}
Revenue: €${body.revenue}
EBITDA: €${body.ebitda}
Revenue Growth: ${body.revenueGrowth}%
Owner Dependence: ${body.ownerDependence}/10
Digital Maturity: ${body.digitalMaturity}/10
Customer Concentration: ${body.customerConcentration}/10
Recurring Revenue: ${body.recurringRevenue}/10
Market Trend: ${body.marketTrend}
Competitive Advantage: ${body.competitiveAdvantage}

Calculated Valuation:
Conservative: €${body.valuationLow}
Realistic: €${body.valuationMid}
Optimistic: €${body.valuationHigh}
Sell-Readiness Score: ${body.readinessScore}/100`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 600,
            }),
        })

        if (!response.ok) {
            return NextResponse.json({ narrative: generateNarrative(body) })
        }

        const data = await response.json()
        return NextResponse.json({
            narrative: data.choices[0]?.message?.content || generateNarrative(body),
        })
    } catch {
        return NextResponse.json(
            { error: 'Failed to generate valuation' },
            { status: 500 }
        )
    }
}

function generateNarrative(body: Record<string, string | number>) {
    const formatEur = (n: number) =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

    return `Based on our analysis of your ${body.industry} business in ${body.region}, we estimate an enterprise value range of ${formatEur(Number(body.valuationLow))} to ${formatEur(Number(body.valuationHigh))}, with a realistic midpoint of ${formatEur(Number(body.valuationMid))}.

This valuation is derived from industry-specific EBITDA and revenue multiples, adjusted for qualitative factors. Your owner dependence score of ${body.ownerDependence}/10 and digital maturity of ${body.digitalMaturity}/10 were key factors in the adjustment.

${Number(body.readinessScore) >= 70 ? 'Your business shows strong fundamentals for a successful sale. We recommend scheduling a free strategy consultation to discuss timing and positioning.' : 'There are opportunities to improve your business\'s sale-readiness. Key areas to focus on include reducing owner dependence and diversifying your customer base.'}

This is an indicative estimate based on the information provided. A formal valuation with access to detailed financials and market comparables would provide a more precise range. Contact our team to discuss next steps.`
}
