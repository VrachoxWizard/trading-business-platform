import { createClient } from '@/lib/supabase/server'
import ListingsClient from './ListingsClient'

export const metadata = {
    title: 'Tržnica prilika',
    description: 'Pregled povjerljivih M&A prilika u Hrvatskoj s anonimnim profilima, osnovnim metrikama i NDA pristupom.',
}

export default async function ListingsPage() {
    const supabase = await createClient()

    const { data: listings } = await supabase
        .from('listings')
        .select('id, title, industry, region, revenue, ebitda, asking_price, employee_count, status, is_anonymous, created_at, reason_for_sale, business_model')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

    return <ListingsClient listings={listings || []} />
}
