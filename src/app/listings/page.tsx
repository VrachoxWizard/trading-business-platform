import { createClient } from '@/lib/supabase/server'
import ListingsClient from './ListingsClient'

export const metadata = {
    title: 'Deal Flow — Browse Businesses for Sale',
    description: 'Explore curated M&A opportunities in Croatia. Filter by industry, region, enterprise value, and more. All listings are pre-screened and confidential.',
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
