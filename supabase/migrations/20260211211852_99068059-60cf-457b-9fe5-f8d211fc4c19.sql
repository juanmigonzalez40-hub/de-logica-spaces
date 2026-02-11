-- Drop the setup_initial_admin function to prevent privilege escalation
-- An admin user already exists, so this function is no longer needed
DROP FUNCTION IF EXISTS public.setup_initial_admin();