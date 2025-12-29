-- Add new columns to contact_submissions for the standardized form
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS cif TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS budget TEXT[],
ADD COLUMN IF NOT EXISTS sectors TEXT[];

-- Add new columns to project_registrations for the standardized form  
ALTER TABLE public.project_registrations
ADD COLUMN IF NOT EXISTS cif TEXT,
ADD COLUMN IF NOT EXISTS budget TEXT[];