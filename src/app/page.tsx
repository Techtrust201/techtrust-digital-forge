
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenue chez <span className="text-blue-600">TechTrust</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Votre partenaire digital pour créer des solutions web innovantes et performantes
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/signin">Se connecter</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Développement Web</CardTitle>
              <CardDescription>
                Sites web modernes et performants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Nous créons des applications web sur mesure avec les dernières technologies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Hacking</CardTitle>
              <CardDescription>
                Stratégies de croissance innovantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Optimisez votre croissance avec nos techniques de growth hacking éprouvées.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consulting Digital</CardTitle>
              <CardDescription>
                Expertise et accompagnement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Bénéficiez de notre expertise pour transformer votre présence digitale.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
