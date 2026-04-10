import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../lib/auth-context";
import { mockApplications } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Search, FileText, ArrowUpDown, Archive } from "lucide-react";
const statusColors = {
  Draft: "bg-gray-100 text-gray-700",
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-amber-100 text-amber-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Other: "bg-purple-100 text-purple-700"
};
export function ApplicationsList({ archived = false }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const apps = useMemo(() => {
    let filtered = mockApplications.filter(
      (a) => a.applicantId === currentUser?.id && a.archived === archived
    );
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(q) || a.organization.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") filtered = filtered.filter((a) => a.type === typeFilter);
    if (statusFilter !== "all") filtered = filtered.filter((a) => a.status === statusFilter);
    filtered.sort(
      (a, b) => sortBy === "deadline" ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime() : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    return filtered;
  }, [currentUser, search, typeFilter, statusFilter, sortBy, archived]);
  return <div className="space-y-6">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>{archived ? "Archived Applications" : "Applications"}</h1>
          <p className="text-sm text-muted-foreground">
            {apps.length} application{apps.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!archived && <Button onClick={() => navigate("/applicant/applications/new")} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Application
          </Button>}
      </div>

      {
    /* Filters */
  }
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
    placeholder="Search applications..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="pl-9"
  />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Job">Job</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Organization">Organization</SelectItem>
            <SelectItem value="Program">Program</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button
    variant="outline"
    size="icon"
    onClick={() => setSortBy(sortBy === "deadline" ? "updated" : "deadline")}
    title={`Sort by ${sortBy === "deadline" ? "last updated" : "deadline"}`}
  >
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      </div>

      {
    /* List */
  }
      {apps.length === 0 ? <div className="text-center py-16 border rounded-xl">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="mb-1">{search || typeFilter !== "all" || statusFilter !== "all" ? "No results found" : archived ? "No archived applications" : "No applications yet"}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {search ? "Try different search terms or filters." : archived ? "Archived applications will appear here." : "Start by adding your first application."}
          </p>
          {!archived && !search && <Button onClick={() => navigate("/applicant/applications/new")} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Application
            </Button>}
        </div> : <div className="space-y-3">
          {apps.map((app) => <div
    key={app.id}
    onClick={() => navigate(`/applicant/applications/${app.id}`)}
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl hover:bg-muted/30 cursor-pointer transition-colors"
  >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="truncate">{app.title}</p>
                  {app.archived && <Badge variant="outline" className="text-xs gap-1">
                      <Archive className="w-3 h-3" /> Archived
                    </Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{app.organization}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant="outline" className="text-xs">{app.type}</Badge>
                <Badge className={`text-xs ${statusColors[app.status] || statusColors.Other}`}>
                  {app.status}
                </Badge>
                <span className="text-xs text-muted-foreground min-w-[70px] text-right">
                  {new Date(app.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>)}
        </div>}

      <p className="text-xs text-muted-foreground text-center">
        Sorting by {sortBy === "deadline" ? "deadline date" : "last updated"}
      </p>
    </div>;
}
