import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Nadzorna ploča' }

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role === 'seller') redirect('/dashboard/seller')
    redirect('/dashboard/buyer')
}
