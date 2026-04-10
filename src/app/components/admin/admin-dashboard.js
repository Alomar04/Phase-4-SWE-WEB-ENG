import { useState, useEffect } from "react";
import { mockUsers, mockApplications, mockTickets } from "../../lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Users, FileText, Headphones, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("all");
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  const totalUsers = mockUsers.length;
  const totalApps = mockApplications.length;
  const openTickets = mockTickets.filter((t) => t.status !== "Closed").length;
  const statusData = ["Draft", "Applied", "Interview", "Accepted", "Rejected"].map((s) => ({
    name: s,
    count: mockApplications.filter((a) => a.status === s).length
  }));
  const typeData = ["Job", "Internship", "Organization", "Program"].map((t) => ({
    name: t,
    count: mockApplications.filter((a) => a.type === t).length
  }));
  const roleData = [
    { name: "Applicants", value: mockUsers.filter((u) => u.role === "applicant").length },
    { name: "Advisors", value: mockUsers.filter((u) => u.role === "advisor").length },
    { name: "Admins", value: mockUsers.filter((u) => u.role === "admin").length }
  ];
  if (loading) {
    return <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Platform Overview</h1>
          <p className="text-sm text-muted-foreground">Admin dashboard and analytics</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {
    /* Summary Cards */
  }
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Total Users</span>
            </div>
            <p className="text-2xl">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Applications</span>
            </div>
            <p className="text-2xl">{totalApps}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Headphones className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Open Tickets</span>
            </div>
            <p className="text-2xl">{openTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-muted-foreground">Avg Apps/User</span>
            </div>
            <p className="text-2xl">
              {(totalApps / mockUsers.filter((u) => u.role === "applicant").length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {
    /* Charts */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Applications by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={roleData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                    {roleData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {
    /* Application Types Table */
  }
      <Card>
        <CardHeader>
          <CardTitle>Applications by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 text-sm text-muted-foreground">Type</th>
                  <th className="pb-2 text-sm text-muted-foreground text-right">Count</th>
                  <th className="pb-2 text-sm text-muted-foreground text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {typeData.map((t) => <tr key={t.name} className="border-b last:border-0">
                    <td className="py-3 text-sm">{t.name}</td>
                    <td className="py-3 text-sm text-right">{t.count}</td>
                    <td className="py-3 text-sm text-right">
                      {totalApps > 0 ? (t.count / totalApps * 100).toFixed(0) : 0}%
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}
