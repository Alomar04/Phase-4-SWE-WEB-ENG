import { useState } from "react";
import { useNavigate } from "react-router";
import { mockUsers, mockApplications } from "../../lib/mock-data";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Search, Users, Lock, FileText, Clock } from "lucide-react";
export function AdvisorHome() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const applicants = mockUsers.filter((u) => u.role === "applicant");
  const permittedIds = ["u1", "u2"];
  const filtered = search ? applicants.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  ) : applicants;
  return <div className="space-y-6">
      <div>
        <h1>Applicants</h1>
        <p className="text-sm text-muted-foreground">Search and view applicant profiles</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="pl-9"
  />
      </div>

      {filtered.length === 0 ? <div className="text-center py-16 border rounded-xl">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3>No applicants found</h3>
          <p className="text-sm text-muted-foreground">Try different search terms.</p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((user) => {
    const hasPermission = permittedIds.includes(user.id);
    const userApps = mockApplications.filter(
      (a) => a.applicantId === user.id && !a.archived
    );
    const upcomingCount = userApps.filter(
      (a) => new Date(a.deadline) > /* @__PURE__ */ new Date()
    ).length;
    return <Card
      key={user.id}
      className={`cursor-pointer transition-colors ${hasPermission ? "hover:border-primary/30" : "opacity-60 cursor-not-allowed"}`}
      onClick={() => {
        if (hasPermission) navigate(`/advisor/applicant/${user.id}`);
      }}
    >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm text-primary">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    {!hasPermission && <Badge variant="outline" className="gap-1 text-xs">
                        <Lock className="w-3 h-3" /> No access
                      </Badge>}
                  </div>
                  <h4>{user.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{user.email}</p>
                  {hasPermission && <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {userApps.length} apps
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {upcomingCount} upcoming
                      </span>
                    </div>}
                </CardContent>
              </Card>;
  })}
        </div>}
    </div>;
}
