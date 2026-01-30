'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@supabase/supabase-js'
import { DollarSign, ShoppingCart, CheckCircle, Clock } from 'lucide-react'

interface Stats {
  totalOrders: number
  totalRevenue: number
  completedOrders: number
  pendingOrders: number
}

interface Order {
  id: string
  amount: number
  status: string
  access_granted: boolean
}

interface AdminStatsProps {
  orders: Order[]
}

export function AdminStats({ orders }: AdminStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    if (orders) {
      const completed = orders.filter(o => o.status === 'completed' || o.access_granted).length
      const pending = orders.filter(o => o.status === 'pending' && !o.access_granted).length
      const revenue = orders
        .filter(o => o.status === 'completed' || o.access_granted)
        .reduce((sum, o) => sum + (o.amount || 0), 0)

      setStats({
        totalOrders: orders.length,
        totalRevenue: revenue,
        completedOrders: completed,
        pendingOrders: pending,
      })
    }
  }, [orders])

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <p className="text-xs text-muted-foreground">
            Toutes les commandes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenus</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</div>
          <p className="text-xs text-muted-foreground">
            De commandes complétées
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Complétées</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
          <p className="text-xs text-muted-foreground">
            Avec accès accordé
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En Attente</CardTitle>
          <Clock className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats.pendingOrders}</div>
          <p className="text-xs text-muted-foreground">
            À vérifier
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
