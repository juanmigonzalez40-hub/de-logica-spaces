-- Add source field to contact_submissions table for lead attribution
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS source TEXT;
