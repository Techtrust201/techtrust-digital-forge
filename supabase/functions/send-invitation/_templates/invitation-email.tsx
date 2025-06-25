
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

interface InvitationEmailProps {
  recipientName: string;
  companyName: string;
  activationUrl: string;
  senderName: string;
}

export const InvitationEmail = ({
  recipientName,
  companyName,
  activationUrl,
  senderName,
}: InvitationEmailProps) => (
  <Html>
    <Head />
    <Preview>Bienvenue chez Tech Trust - Activez votre compte</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Bienvenue chez Tech Trust !</Heading>
        
        <Text style={text}>Bonjour {recipientName},</Text>
        
        <Text style={text}>
          Nous sommes ravis de vous accueillir chez Tech Trust ! Votre compte a été créé 
          et nous avons sélectionné des services adaptés à {companyName}.
        </Text>
        
        <Text style={text}>
          Pour finaliser votre inscription et accéder à votre espace client, 
          veuillez cliquer sur le bouton ci-dessous pour créer votre mot de passe :
        </Text>

        <Section style={buttonContainer}>
          <Button href={activationUrl} style={button}>
            Activer mon compte
          </Button>
        </Section>

        <Text style={text}>
          Si le bouton ne fonctionne pas, vous pouvez également copier et coller ce lien 
          dans votre navigateur :
        </Text>
        
        <Text style={linkText}>{activationUrl}</Text>

        <Text style={text}>
          Ce lien expirera dans 7 jours pour des raisons de sécurité.
        </Text>

        <Text style={text}>
          Si vous avez des questions, n'hésitez pas à nous contacter à contact@tech-trust.fr
        </Text>

        <Text style={signature}>
          Cordialement,<br />
          {senderName}
        </Text>

        <Text style={footer}>
          Tech Trust - Votre partenaire digital de confiance
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#ef4444",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const linkText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "16px 0",
  wordBreak: "break-all" as const,
};

const signature = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "24px 0 16px",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "32px 0 0",
  textAlign: "center" as const,
  borderTop: "1px solid #e5e7eb",
  paddingTop: "16px",
};
