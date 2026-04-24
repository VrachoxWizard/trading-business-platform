import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ListingDetailClient from './ListingDetailClient'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: listing } = await supabase.from('listings').select('title, industry, region').eq('id', id).single()

    if (!listing) return { title: 'Listing Not Found' }

    return {
        title: `${listing.title} — ${listing.industry} in ${listing.region}`,
        description: `Confidential M&A opportunity: ${listing.industry} business in ${listing.region}. Request NDA access for full details.`,
    }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: listing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()

    if (!listing) notFound()

    const { data: { user } } = await supabase.auth.getUser()

    let hasNda = false
    if (user) {
        const { data: nda } = await supabase
            .from('nda_requests')
            .select('status')
            .eq('listing_id', id)
            .eq('buyer_id', user.id)
            .single()
        hasNda = nda?.status === 'signed' || nda?.status === 'approved'
    }

    return <ListingDetailClient listing={listing} user={user} hasNda={hasNda} />
}
