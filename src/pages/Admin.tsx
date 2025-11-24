import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi, ApiError } from "@/lib/api";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Admin = () => {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: "PENDING",
    verification_notes: "",
    category: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch reports
  const { data: reportsData, isLoading: reportsLoading, error: reportsError } = useQuery({
    queryKey: ["admin-reports", statusFilter, page],
    queryFn: () => adminApi.getAllReports({ status: statusFilter === "ALL" ? undefined : statusFilter, page, limit: 20 }),
    retry: false,
    onError: (error: ApiError) => {
      if (error.statusCode === 403) {
        toast({
          title: "Access Denied",
          description: "Admin access required",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error loading reports",
          description: error.message || "Failed to load reports",
          variant: "destructive",
        });
      }
    },
  });

  // Fetch statistics
  const { data: statsData, error: statsError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminApi.getReportStats(),
    retry: false,
  });

  // Update status mutation
  const updateMutation = useMutation({
    mutationFn: (data: { status: string; verification_notes?: string; category?: string }) =>
      adminApi.updateReportStatus(selectedReport.id, data),
    onSuccess: () => {
      toast({
        title: "Report updated",
        description: "Report status has been updated successfully",
      });
      setIsDialogOpen(false);
      setSelectedReport(null);
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update report status",
        variant: "destructive",
      });
    },
  });

  const handleOpenDialog = (report: any) => {
    setSelectedReport(report);
    setUpdateData({
      status: report.status,
      verification_notes: report.verification_notes || "",
      category: report.category || "NONE",
    });
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedReport) return;
    updateMutation.mutate({
      status: updateData.status,
      verification_notes: updateData.verification_notes || undefined,
      category: updateData.category === "NONE" ? undefined : updateData.category,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "FACT":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "HOAX":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "UNVERIFIED":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "FACT":
        return <Badge className="bg-green-500">FACT</Badge>;
      case "HOAX":
        return <Badge variant="destructive">HOAX</Badge>;
      case "UNVERIFIED":
        return <Badge variant="secondary">UNVERIFIED</Badge>;
      default:
        return <Badge variant="outline">PENDING</Badge>;
    }
  };

  const stats = statsData?.data || {
    total: 0,
    pending: 0,
    fact: 0,
    hoax: 0,
    unverified: 0,
  };

  const reports = reportsData?.data || [];
  const pagination = reportsData?.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <div className="container py-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold">Verification Management</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Review and verify user-submitted content for fact-checking
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Reports</CardDescription>
                  <CardTitle className="text-3xl">{stats.total}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pending</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Verified FACT</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{stats.fact}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Verified HOAX</CardDescription>
                  <CardTitle className="text-3xl text-red-600">{stats.hoax}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Unverified</CardDescription>
                  <CardTitle className="text-3xl text-gray-600">{stats.unverified}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Filters and Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>
                      Manage and verify user-submitted content reports
                    </CardDescription>
                  </div>
                  <Select value={statusFilter} onValueChange={(value) => {
                    setStatusFilter(value);
                    setPage(1);
                  }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="FACT">Fact</SelectItem>
                      <SelectItem value="HOAX">Hoax</SelectItem>
                      <SelectItem value="UNVERIFIED">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {reportsError ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                    <p className="text-destructive font-medium">Error loading reports</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(reportsError as ApiError).message || "Please try again later"}
                    </p>
                  </div>
                ) : reportsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No reports found</p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reports.map((report: any) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-mono text-xs">
                                {report.id.substring(0, 8)}...
                              </TableCell>
                              <TableCell className="max-w-md">
                                <p className="line-clamp-2 text-sm">
                                  {report.content}
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p className="font-medium">{report.users?.name || "N/A"}</p>
                                  <p className="text-muted-foreground text-xs">
                                    {report.users?.email || "N/A"}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(report.status)}
                                  {getStatusBadge(report.status)}
                                </div>
                              </TableCell>
                              <TableCell>
                                {report.category ? (
                                  <Badge variant="outline">{report.category}</Badge>
                                ) : (
                                  <span className="text-muted-foreground text-sm">-</span>
                                )}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {new Date(report.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenDialog(report)}
                                >
                                  Review
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                          {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                          {pagination.total} reports
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={pagination.page === 1}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                            disabled={pagination.page === pagination.totalPages}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />

        {/* Update Status Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Update Report Status</DialogTitle>
              <DialogDescription>
                Review the content and update the verification status
              </DialogDescription>
            </DialogHeader>

            {selectedReport && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Report Content</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{selectedReport.content}</p>
                  </div>
                </div>

                {selectedReport.image_url && (
                  <div>
                    <Label className="text-sm font-medium">Image</Label>
                    <div className="mt-2">
                      <img
                        src={selectedReport.image_url}
                        alt="Report"
                        className="max-w-full h-auto rounded-lg border"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="status">Verification Status *</Label>
                  <Select
                    value={updateData.status}
                    onValueChange={(value) =>
                      setUpdateData({ ...updateData, status: value })
                    }
                  >
                    <SelectTrigger id="status" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="FACT">Fact</SelectItem>
                      <SelectItem value="HOAX">Hoax</SelectItem>
                      <SelectItem value="UNVERIFIED">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Select
                    value={updateData.category}
                    onValueChange={(value) =>
                      setUpdateData({ ...updateData, category: value })
                    }
                  >
                    <SelectTrigger id="category" className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Verification Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    className="mt-2"
                    placeholder="Add notes about the verification process..."
                    value={updateData.verification_notes}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, verification_notes: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;

