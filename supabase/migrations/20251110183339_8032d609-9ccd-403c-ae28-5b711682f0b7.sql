-- Enable email/password authentication and auto-confirm
-- This will be configured via Supabase settings

-- Create initial admin user function
CREATE OR REPLACE FUNCTION public.setup_initial_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  first_user_id uuid;
BEGIN
  -- Get the first user who signed up
  SELECT id INTO first_user_id
  FROM auth.users
  ORDER BY created_at ASC
  LIMIT 1;
  
  -- If a user exists and doesn't have admin role, assign it
  IF first_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (first_user_id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_registrations_status ON public.project_registrations(status);
CREATE INDEX IF NOT EXISTS idx_project_registrations_created_at ON public.project_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_registrations_sector ON public.project_registrations(sector);