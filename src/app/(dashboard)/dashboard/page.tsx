
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord
        </h2>
        <p className="text-gray-600">
          Gérez vos projets et suivez vos performances
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projets actifs</CardTitle>
            <CardDescription>Vos projets en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tâches terminées</CardTitle>
            <CardDescription>Ce mois-ci</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">23</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Score global</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">94%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du compte</CardTitle>
          <CardDescription>Vos données personnelles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Nom:</strong> {session?.user.name || 'Non défini'}</p>
            <p><strong>Email:</strong> {session?.user.email}</p>
            <p><strong>Statut:</strong> {session?.user.emailVerified ? 'Vérifié' : 'Non vérifié'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
