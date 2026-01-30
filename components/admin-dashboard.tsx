'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Download, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AdminStats } from './admin-stats'

interface Order {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  access_granted: boolean
  currency: string
}

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, use proper admin authentication with secure session management
    // This is a simple example - implement proper auth in production!
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    if (password === adminPassword) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  useEffect(() => {
    if (!authenticated) return

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminPassword: password })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        setOrders(data.orders || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [authenticated])

  const grantAccess = async (orderId: string) => {
    try {
      const response = await fetch('/api/admin/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          adminPassword: password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to grant access')
      }

      const data = await response.json()

      setOrders(
        orders.map(o =>
          o.id === orderId ? { ...o, access_granted: true, status: 'completed' } : o
        )
      )

      alert(`✓ Accès accordé!\nEmail envoyé à: ${data.email}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de l\'accès')
    }
  }

  const downloadPdf = async (orderId: string) => {
    // Implement secure PDF download logic
    // Check if user has access, generate secure token, etc.
    alert('Téléchargement initié - Vérifiez que ce client a bien payé avant de procéder!')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connexion Admin</CardTitle>
            <CardDescription>
              Tableau de bord de gestion des commandes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Mot de passe admin
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Connexion
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Tableau de bord Admin
            </h1>
            <p className="text-foreground/60 mt-2">
              Gestion des commandes de formation
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setAuthenticated(false)}
          >
            Déconnexion
          </Button>
        </div>

        {!loading && <AdminStats orders={orders as any[]} />}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>
              Total: {orders.length} commandes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-foreground/60">Chargement des commandes...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-foreground/60">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Client</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Téléphone</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Montant</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Méthode</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Statut</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm font-medium text-foreground">
                          {order.first_name} {order.last_name}
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground/70">{order.email}</td>
                        <td className="py-3 px-4 text-sm text-foreground">{order.phone}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-primary">
                          {order.amount} {order.currency || 'FCFA'}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            {order.payment_method?.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            {order.access_granted ? (
                              <>
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-green-600">Accordé</span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 text-amber-600" />
                                <span className="text-amber-600">En attente</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground/60">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {!order.access_granted && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => grantAccess(order.id)}
                              >
                                Accorder
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instructions de gestion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Flux de validation</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/70">
                <li>Un client passe commande via Orange Money, MTN, ou Stripe</li>
                <li>La commande apparaît ici avec le statut "En attente"</li>
                <li>Vérifiez le paiement manuellement via votre compte Orange Money/MTN/Stripe</li>
                <li>Cliquez sur "Accorder" pour confirmer l'accès et envoyer le lien de téléchargement au client</li>
                <li>Le client reçoit un email avec son lien de téléchargement sécurisé</li>
              </ol>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">💡 Astuce:</span> Téléchargez régulièrement votre historique de transactions depuis vos portails Orange Money et MTN pour vérifier les paiements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
