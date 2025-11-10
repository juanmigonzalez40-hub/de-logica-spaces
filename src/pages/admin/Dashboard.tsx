import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Briefcase, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Stats {
  totalContacts: number;
  totalProjects: number;
  pendingContacts: number;
  pendingProjects: number;
}

interface RecentSubmission {
  id: string;
  name: string;
  email: string;
  created_at: string;
  status: string;
  type: 'contact' | 'project';
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalProjects: 0,
    pendingContacts: 0,
    pendingProjects: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch contact stats
      const { count: totalContacts } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });

      const { count: pendingContacts } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch project stats
      const { count: totalProjects } = await supabase
        .from('project_registrations')
        .select('*', { count: 'exact', head: true });

      const { count: pendingProjects } = await supabase
        .from('project_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalContacts: totalContacts || 0,
        totalProjects: totalProjects || 0,
        pendingContacts: pendingContacts || 0,
        pendingProjects: pendingProjects || 0,
      });

      // Fetch recent submissions
      const { data: recentContacts } = await supabase
        .from('contact_submissions')
        .select('id, name, email, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: recentProjects } = await supabase
        .from('project_registrations')
        .select('id, name, email, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5);

      const combined: RecentSubmission[] = [
        ...(recentContacts?.map((c) => ({ ...c, type: 'contact' as const })) || []),
        ...(recentProjects?.map((p) => ({ ...p, type: 'project' as const })) || []),
      ]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      setRecentSubmissions(combined);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Resumen de contactos y proyectos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contactos
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contactos Pendientes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Proyectos
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proyectos Pendientes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Envíos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{submission.name}</p>
                    <Badge variant={submission.type === 'contact' ? 'secondary' : 'default'}>
                      {submission.type === 'contact' ? 'Contacto' : 'Proyecto'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{submission.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(submission.created_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
                <Badge
                  variant={submission.status === 'pending' ? 'outline' : 'default'}
                  className="capitalize"
                >
                  {submission.status === 'pending' ? 'Pendiente' : submission.status}
                </Badge>
              </div>
            ))}
            {recentSubmissions.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No hay envíos recientes
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
