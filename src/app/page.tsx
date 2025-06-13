
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TechTrust
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Votre partenaire digital
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Link href="/auth/signin">
              <Button className="w-full">
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">
                Créer un compte
              </Button>
            </Link>
          </div>
          
          <div className="pt-4 border-t">
            <Link href="/contact">
              <Button variant="ghost" className="w-full">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
