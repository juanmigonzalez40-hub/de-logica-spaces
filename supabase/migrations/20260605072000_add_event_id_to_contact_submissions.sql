-- Add event_id field to contact_submissions table for Meta CAPI deduplication
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS event_id TEXT;
