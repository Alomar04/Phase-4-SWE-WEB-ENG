import { useNavigate } from "react-router";
import { useAuth } from "../../lib/auth-context";
import { mockApplications } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Plus, Clock, FileText, Send, MessageSquare, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
const statusConfig = {
  Draft: { color: "bg-gray-100 text-gray-700", icon: FileText },
  Applied: { color: "bg-blue-100 text-blue-700", icon: Send },
  Interview: { color: "bg-amber-100 text-amber-700", icon: MessageSquare },
  Accepted: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  Rejected: { color: "bg-red-100 text-red-700", icon: XCircle }
};
export function ApplicantDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  const apps = mockApplications.filter((a) => a.applicantId === currentUser?.id && !a.archived);
  const statusCounts = Object.entries(statusConfig).map(([status, config]) => ({
    status,
    count: apps.filter((a) => a.status === status).length,
    ...config
  }));
  const upcomingDeadlines = apps.filter((a) => new Date(a.deadline) > /* @__PURE__ */ new Date()).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).slice(0, 5);
  const getUrgencyBadge = (deadline) => {
    const diff = new Date(deadline).getTime() - Date.now();
    const days = diff / (1e3 * 60 * 60 * 24);
    if (days <= 1) return <Badge variant="destructive" className="text-xs">Due today</Badge>;
    if (days <= 3) return <Badge className="bg-amber-100 text-amber-700 text-xs">Due soon</Badge>;
    if (days <= 7) return <Badge className="bg-blue-100 text-blue-700 text-xs">This week</Badge>;
    return null;
  };
  if (loading) {
    return <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>;
  }
  return <div className="space-y-6">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {currentUser?.name?.split(" ")[0]}</p>
        </div>
        <Button onClick={() => navigate("/applicant/applications/new")} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Application
        </Button>
      </div>

      {
    /* Status Counts */
  }
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusCounts.map((s) => <Card key={s.status} className="cursor-pointer hover:border-primary/30 transition-colors" onClick={() => navigate("/applicant/applications")}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl">{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.status}</p>
            </CardContent>
          </Card>)}
      </div>

      {
    /* Upcoming Deadlines */
  }
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingDeadlines.length === 0 ? <div className="text-center py-8">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/applicant/applications/new")}>
                Add your first application
              </Button>
            </div> : <div className="space-y-3">
              {upcomingDeadlines.map((app) => <div
    key={app.id}
    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 cursor-pointer transition-colors"
    onClick={() => navigate(`/applicant/applications/${app.id}`)}
  >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{app.title}</p>
                    <p className="text-xs text-muted-foreground">{app.organization}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {getUrgencyBadge(app.deadline)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(app.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>)}
            </div>}
        </CardContent>
      </Card>

      {
    /* Recommendations notification */
  }
      {apps.some((a) => a.recommendations.length > 0) && <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm">You have new advisor recommendations</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Check your applications for actionable guidance from your advisor.
              </p>
            </div>
          </CardContent>
        </Card>}
    </div>;
}
