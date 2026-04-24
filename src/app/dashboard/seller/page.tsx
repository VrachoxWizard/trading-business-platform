import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SellerDashboardClient from './SellerDashboardClient'

export const metadata = {
    title: 'Nadzorna ploča prodavatelja',
    description: 'Upravljanje profilima tvrtki, statusima objave i NDA interesom potencijalnih kupaca.',
}

export default async function SellerDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const { data: listings } = await supabase
        .from('listings')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })

    const { data: ndas } = await supabase
        .from('nda_requests')
        .select('*, listings!inner(seller_id, title)')
        .eq('listings.seller_id', user.id)
        .order('requested_at', { ascending: false })
        .limit(10)

    return (
        <SellerDashboardClient
            profile={profile}
            listings={listings || []}
            ndas={ndas || []}
        />
    )
}
