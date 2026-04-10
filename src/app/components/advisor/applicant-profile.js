import { useNavigate, useParams } from "react-router";
import { mockUsers, mockApplications } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, FileText, Mail, Calendar, ShieldAlert } from "lucide-react";
const statusColors = {
  Draft: "bg-gray-100 text-gray-700",
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-amber-100 text-amber-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700"
};
export function ApplicantProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = mockUsers.find((u) => u.id === userId);
  const permittedIds = ["u1", "u2"];
  if (!user || !permittedIds.includes(user.id)) {
    return <div className="text-center py-16">
        <ShieldAlert className="w-12 h-12 mx-auto text-destructive mb-4" />
        <h2>Access Denied</h2>
        <p className="text-sm text-muted-foreground mt-2">You do not have permission to view this applicant's profile.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/advisor")}>Back to Applicants</Button>
      </div>;
  }
  const apps = mockApplications.filter((a) => a.applicantId === userId && !a.archived);
  const statusCounts = ["Draft", "Applied", "Interview", "Accepted", "Rejected"].map(
    (s) => ({ status: s, count: apps.filter((a) => a.status === s).length })
  );
  return <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/advisor")} className="gap-2 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back
      </Button>

      {
    /* Profile Summary */
  }
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary">{user.name.split(" ").map((n) => n[0]).join("")}</span>
            </div>
            <div>
              <h1>{user.name}</h1>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {user.email}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {user.createdAt}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {
    /* Stats */
  }
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statusCounts.map((s) => <Card key={s.status}>
            <CardContent className="p-3 text-center">
              <p className="text-xl">{s.count}</p>
              <Badge className={`text-xs mt-1 ${statusColors[s.status]}`}>{s.status}</Badge>
            </CardContent>
          </Card>)}
      </div>

      {
    /* Applications */
  }
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Applications ({apps.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {apps.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No active applications.</p> : <div className="space-y-2">
              {apps.map((app) => <div
    key={app.id}
    onClick={() => navigate(`/advisor/applicant/${userId}/application/${app.id}`)}
    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
  >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm truncate">{app.title}</p>
                    <p className="text-xs text-muted-foreground">{app.organization}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <Badge className={`text-xs ${statusColors[app.status]}`}>{app.status}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(app.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>)}
            </div>}
        </CardContent>
      </Card>
    </div>;
}
