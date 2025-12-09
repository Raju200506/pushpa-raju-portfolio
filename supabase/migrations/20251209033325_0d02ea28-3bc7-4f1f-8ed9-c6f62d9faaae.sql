-- Create projects table for portfolio showcase
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_link TEXT,
  icon_type TEXT DEFAULT 'palette',
  gradient TEXT DEFAULT 'from-primary to-accent',
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for storing inquiries
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Projects are public to view (portfolio)
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Insert default projects
INSERT INTO public.projects (title, category, description, icon_type, gradient, display_order) VALUES
('Logo Design Portfolio', 'Logo Design', 'Collection of minimalist and modern logo designs for various brands and startups.', 'palette', 'from-primary to-accent', 1),
('Photo Retouching Work', 'Photo Editing', 'Professional photo retouching and enhancement work showcasing color grading and restoration.', 'image', 'from-accent to-primary', 2),
('Short Form Films', 'Video Editing', 'Creative short films and reels edited with professional transitions and effects.', 'play', 'from-primary to-accent', 3),
('Thumbnail Design', 'Thumbnail Design', 'Eye-catching YouTube and social media thumbnails designed for maximum engagement.', 'image', 'from-accent to-primary', 4);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for projects
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();