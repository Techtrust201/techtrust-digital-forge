
-- Table pour les articles de blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  views INTEGER DEFAULT 0,
  publish_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les catégories de blog
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les commentaires de blog
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'rejected')),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les campagnes email
CREATE TABLE public.email_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL DEFAULT 'newsletter' CHECK (type IN ('newsletter', 'promotion', 'automation', 'event')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'scheduled', 'active')),
  recipients INTEGER DEFAULT 0,
  open_rate DECIMAL(5,2) DEFAULT 0,
  click_rate DECIMAL(5,2) DEFAULT 0,
  sent_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les campagnes SMS
CREATE TABLE public.sms_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'scheduled', 'failed')),
  recipients INTEGER DEFAULT 0,
  delivered INTEGER DEFAULT 0,
  delivery_rate DECIMAL(5,2) DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  sent_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les campagnes d'automatisation
CREATE TABLE public.automation_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('welcome', 'abandoned_cart', 'birthday', 'follow_up')),
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'paused')),
  total_triggered INTEGER DEFAULT 0,
  total_completed INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les factures
CREATE TABLE public.invoices (
  id TEXT NOT NULL PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  amount INTEGER NOT NULL, -- en centimes
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'paid', 'overdue')),
  due_date DATE NOT NULL,
  paid_date DATE,
  services TEXT[] NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les paiements
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id TEXT REFERENCES public.invoices(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- en centimes
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'bank_transfer', 'paypal', 'stripe')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id TEXT,
  fees INTEGER DEFAULT 0,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les analytics détaillées
CREATE TABLE public.analytics_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les utilisateurs analytics (pour éviter les conflits avec auth.users)
CREATE TABLE public.user_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  page_url TEXT,
  session_duration INTEGER,
  device_type TEXT,
  browser TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les performances du site
CREATE TABLE public.performance_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('page_load', 'api_response', 'conversion', 'bounce_rate')),
  value DECIMAL(10,2) NOT NULL,
  page_path TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insérer quelques données de test
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Growth Hacking', 'growth-hacking', 'Techniques et stratégies de croissance rapide', 'blue'),
('SEO', 'seo', 'Référencement naturel et optimisation', 'green'),
('Community Management', 'community-management', 'Gestion de communautés et réseaux sociaux', 'purple'),
('Marketing Digital', 'marketing-digital', 'Stratégies marketing digitales', 'orange'),
('Développement Web', 'developpement-web', 'Technologies et bonnes pratiques web', 'red');

-- Données de test pour analytics
INSERT INTO analytics_data (metric_name, metric_value, category) VALUES
('unique_visitors', 125847, 'traffic'),
('page_views', 892436, 'traffic'),
('click_rate', 3.24, 'engagement'),
('session_duration', 272, 'engagement'),
('bounce_rate', 32.5, 'engagement'),
('conversion_rate', 2.8, 'conversion');

-- Enable RLS sur toutes les tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies (admin peut tout faire)
CREATE POLICY "Admin can manage blog_posts" ON public.blog_posts FOR ALL USING (true);
CREATE POLICY "Admin can manage blog_categories" ON public.blog_categories FOR ALL USING (true);
CREATE POLICY "Admin can manage blog_comments" ON public.blog_comments FOR ALL USING (true);
CREATE POLICY "Admin can manage email_campaigns" ON public.email_campaigns FOR ALL USING (true);
CREATE POLICY "Admin can manage sms_campaigns" ON public.sms_campaigns FOR ALL USING (true);
CREATE POLICY "Admin can manage automation_campaigns" ON public.automation_campaigns FOR ALL USING (true);
CREATE POLICY "Admin can manage invoices" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Admin can manage payments" ON public.payments FOR ALL USING (true);
CREATE POLICY "Admin can manage analytics_data" ON public.analytics_data FOR ALL USING (true);
CREATE POLICY "Admin can manage user_analytics" ON public.user_analytics FOR ALL USING (true);
CREATE POLICY "Admin can manage performance_metrics" ON public.performance_metrics FOR ALL USING (true);

-- Index pour améliorer les performances
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(post_id);
CREATE INDEX idx_analytics_data_date ON public.analytics_data(date);
CREATE INDEX idx_analytics_data_metric_name ON public.analytics_data(metric_name);
CREATE INDEX idx_user_analytics_date ON public.user_analytics(created_at);
CREATE INDEX idx_performance_metrics_date ON public.performance_metrics(date);
