
-- Add DELETE policies for contact_submissions (admin only)
CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policies for project_registrations (admin only)
CREATE POLICY "Only admins can delete project registrations"
ON public.project_registrations
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add INSERT policy for user_roles (admin only)
CREATE POLICY "Only admins can insert user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for user_roles (admin only)
CREATE POLICY "Only admins can delete user roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
