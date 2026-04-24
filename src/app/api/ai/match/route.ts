import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get buyer profile
        const { data: buyerProfile } = await supabase
            .from('buyer_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (!buyerProfile) {
            return NextResponse.json({ error: 'No buyer profile found' }, { status: 400 })
        }

        // Get active listings
        const { data: listings } = await supabase
            .from('listings')
            .select('*')
            .eq('status', 'active')

        if (!listings || listings.length === 0) {
            return NextResponse.json({ matches: [] })
        }

        // Matching algorithm
        const matches = listings
            .map((listing) => {
                let score = 0
                const reasons: string[] = []

                // EV fit (30%)
                if (buyerProfile.min_ev && buyerProfile.max_ev && listing.asking_price) {
                    if (listing.asking_price >= buyerProfile.min_ev && listing.asking_price <= buyerProfile.max_ev) {
                        score += 30
                        reasons.push('vrijednost je unutar ciljanog raspona')
                    } else {
                        const distance = listing.asking_price < buyerProfile.min_ev
                            ? (buyerProfile.min_ev - listing.asking_price) / buyerProfile.min_ev
                            : (listing.asking_price - buyerProfile.max_ev) / buyerProfile.max_ev
                        score += Math.max(0, 30 - distance * 30)
                    }
                } else {
                    score += 15 // Neutral if no price data
                }

                // Sector fit (25%)
                if (buyerProfile.target_industries?.length > 0) {
                    if (buyerProfile.target_industries.includes(listing.industry)) {
                        score += 25
                        reasons.push(`industrija odgovara profilu: ${listing.industry}`)
                    }
                } else {
                    score += 12.5
                }

                // Geography fit (20%)
                if (buyerProfile.target_regions?.length > 0) {
                    if (buyerProfile.target_regions.includes(listing.region)) {
                        score += 20
                        reasons.push(`regija odgovara profilu: ${listing.region}`)
                    }
                } else {
                    score += 10
                }

                // Financial fit (25%)
                if (buyerProfile.min_ebitda && buyerProfile.max_ebitda && listing.ebitda) {
                    if (listing.ebitda >= buyerProfile.min_ebitda && listing.ebitda <= buyerProfile.max_ebitda) {
                        score += 25
                        reasons.push('EBITDA je unutar ciljanog raspona')
                    } else {
                        const distance = listing.ebitda < buyerProfile.min_ebitda
                            ? (buyerProfile.min_ebitda - listing.ebitda) / buyerProfile.min_ebitda
                            : (listing.ebitda - buyerProfile.max_ebitda) / buyerProfile.max_ebitda
                        score += Math.max(0, 25 - distance * 25)
                    }
                } else {
                    score += 12.5
                }

                const roundedScore = Math.round(score)
                const narrative = reasons.length > 0
                    ? `Prilika u industriji ${listing.industry} ima ${roundedScore}% podudaranja prema vašim kriterijima: ${reasons.join(', ')}.`
                    : `Prilika u industriji ${listing.industry} i regiji ${listing.region} ima ${roundedScore}% podudaranja.`

                return {
                    listing_id: listing.id,
                    listing_title: listing.title,
                    listing_industry: listing.industry,
                    listing_region: listing.region,
                    listing_asking_price: listing.asking_price,
                    match_score: roundedScore,
                    match_narrative: narrative,
                }
            })
            .filter((m) => m.match_score >= 70)
            .sort((a, b) => b.match_score - a.match_score)

        return NextResponse.json({ matches })
    } catch {
        return NextResponse.json(
            { error: 'Failed to run matching' },
            { status: 500 }
        )
    }
}
