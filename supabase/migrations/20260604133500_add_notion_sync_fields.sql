-- Add notion synchronization fields to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS notion_sync_status TEXT DEFAULT 'pending' NOT NULL,
ADD COLUMN IF NOT EXISTS notion_sync_error TEXT;

-- Create an index to quickly filter by sync status
CREATE INDEX IF NOT EXISTS idx_contact_submissions_notion_sync_status 
ON public.contact_submissions(notion_sync_status);
