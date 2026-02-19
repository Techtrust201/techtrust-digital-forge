import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Techtrust - Agence Web & Growth Hacking | Solutions Digitales Sur Mesure'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #6d28d9 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(69, 199, 255, 0.15)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.15)',
            filter: 'blur(60px)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-2px',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            <span style={{ color: '#45C7FF' }}>Tech</span>
            <span>trust</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: '32px',
              display: 'flex',
            }}
          >
            Agence Web & Growth Hacking IA
          </div>

          {/* Services badges */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Création Web', 'Growth Hacking', 'SEO/SEA/GEO', 'Solutions IA'].map(
              (service) => (
                <div
                  key={service}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '999px',
                    padding: '10px 24px',
                    fontSize: '18px',
                    color: '#e2e8f0',
                    display: 'flex',
                  }}
                >
                  {service}
                </div>
              )
            )}
          </div>

          {/* URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '20px',
              color: '#94a3b8',
              display: 'flex',
            }}
          >
            www.tech-trust.fr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
