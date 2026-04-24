import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BuyerDashboardClient from './BuyerDashboardClient'

export const metadata = {
    title: 'Nadzorna ploča kupca',
    description: 'Praćenje spremljenih prilika, NDA zahtjeva i budućih AI preporuka za akvizicije.',
}

export default async function BuyerDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const { data: shortlists } = await supabase
        .from('shortlists')
        .select('*, listings(*)')
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false })

    const { data: ndas } = await supabase
        .from('nda_requests')
        .select('*, listings(title, industry, region)')
        .eq('buyer_id', user.id)
        .order('requested_at', { ascending: false })

    const { data: buyerProfile } = await supabase
        .from('buyer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

    return (
        <BuyerDashboardClient
            profile={profile}
            buyerProfile={buyerProfile}
            shortlists={shortlists || []}
            ndas={ndas || []}
        />
    )
}
