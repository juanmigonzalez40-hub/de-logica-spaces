
-- Enable pg_net to perform HTTP requests from the database
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function that POSTs the new row to the sync-to-notion edge function
CREATE OR REPLACE FUNCTION public.notify_sync_to_notion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  function_url text := 'https://uwoftzgglkewplsjlsoo.supabase.co/functions/v1/sync-to-notion';
  service_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3b2Z0emdnbGtld3Bsc2psc29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjE5NzYsImV4cCI6MjA3ODAzNzk3Nn0.Lox0KGAKTcj9HzZAibuTt26LPbXURo0mJWRY9Y5t8lc';
BEGIN
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_key
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'event', 'INSERT',
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$;

-- Replace any prior trigger of the same name to keep the migration idempotent
DROP TRIGGER IF EXISTS sync_contact_to_notion ON public.contact_submissions;

CREATE TRIGGER sync_contact_to_notion
AFTER INSERT ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.notify_sync_to_notion();
