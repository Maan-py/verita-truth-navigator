import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Upload, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please provide the content you want to verify",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Submission received",
        description: "Our team will verify this content within 24 hours. You'll receive an email notification.",
      });
      setContent("");
      setImage(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const statusExamples = [
    {
      status: "FACT",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success-light",
      borderColor: "border-success",
      description: "Verified as accurate based on official sources",
    },
    {
      status: "HOAX",
      icon: XCircle,
      color: "text-destructive",
      bgColor: "bg-destructive-light",
      borderColor: "border-destructive",
      description: "False information with no credible sources",
    },
    {
      status: "UNVERIFIED",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning-light",
      borderColor: "border-warning",
      description: "Insufficient evidence to confirm or deny",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Quick Verification</h1>
            <p className="text-muted-foreground text-lg">
              Submit suspicious content for expert fact-checking. Get results within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Content for Verification</CardTitle>
                  <CardDescription>
                    Provide the text or upload an image of the content you want us to verify
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="content">Content Text *</Label>
                      <Textarea
                        id="content"
                        placeholder="Paste the text, claim, or information you want to verify..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Be as specific as possible. Include sources if available.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Image (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                        {image && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            {image.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Upload a screenshot if the content is from social media or other platforms
                      </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit for Verification"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>My Recent Submissions</CardTitle>
                  <CardDescription>Track the status of your verification requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, snippet: "COVID-19 vaccine contains microchips...", status: "HOAX", date: "2 days ago" },
                      { id: 2, snippet: "Government announces new economic policy...", status: "FACT", date: "5 days ago" },
                      { id: 3, snippet: "New environmental regulations...", status: "PENDING", date: "1 hour ago" },
                    ].map((submission) => (
                      <div key={submission.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium mb-1 line-clamp-1">{submission.snippet}</p>
                          <p className="text-sm text-muted-foreground">{submission.date}</p>
                        </div>
                        <Badge 
                          variant={
                            submission.status === "FACT" ? "default" : 
                            submission.status === "HOAX" ? "destructive" : 
                            "secondary"
                          }
                        >
                          {submission.status === "PENDING" ? (
                            <><Clock className="h-3 w-3 mr-1" /> Pending</>
                          ) : (
                            submission.status
                          )}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium mb-1">Submit Content</p>
                      <p className="text-sm text-muted-foreground">
                        Provide text or image of the suspicious content
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium mb-1">Expert Review</p>
                      <p className="text-sm text-muted-foreground">
                        Our team verifies against official sources
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium mb-1">Get Results</p>
                      <p className="text-sm text-muted-foreground">
                        Receive verification status within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verification Status Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statusExamples.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.status} className={`p-3 rounded-lg border-2 ${item.borderColor} ${item.bgColor}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-5 w-5 ${item.color}`} />
                          <span className="font-semibold">{item.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verify;
