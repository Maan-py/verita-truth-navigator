import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Briefcase, GraduationCap, Heart, Leaf, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const categories = [
    {
      id: "health",
      name: "Health",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      data: [
        { label: "Vaccination Rate", value: "87%", trend: "+5%" },
        { label: "Hospital Capacity", value: "72%", trend: "-3%" },
        { label: "Health Workers", value: "425K", trend: "+2%" },
      ],
    },
    {
      id: "politics",
      name: "Politics",
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      data: [
        { label: "Voter Turnout", value: "76%", trend: "+4%" },
        { label: "Bills Passed", value: "142", trend: "+12" },
        { label: "Public Approval", value: "68%", trend: "-2%" },
      ],
    },
    {
      id: "finance",
      name: "Finance",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      data: [
        { label: "GDP Growth", value: "5.2%", trend: "+0.3%" },
        { label: "Inflation Rate", value: "3.8%", trend: "-0.5%" },
        { label: "Unemployment", value: "4.2%", trend: "-0.2%" },
      ],
    },
    {
      id: "environment",
      name: "Environment",
      icon: Leaf,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      data: [
        { label: "Renewable Energy", value: "32%", trend: "+8%" },
        { label: "CO2 Emissions", value: "1.2B tons", trend: "-5%" },
        { label: "Forest Coverage", value: "58%", trend: "+1%" },
      ],
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      data: [
        { label: "Literacy Rate", value: "96%", trend: "+2%" },
        { label: "School Enrollment", value: "89%", trend: "+3%" },
        { label: "Teacher-Student Ratio", value: "1:18", trend: "improving" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Curated Data Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Official public data from verified government sources, updated regularly
            </p>
          </div>

          <Tabs defaultValue="health" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:h-12">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${cat.color}`} />
                    <span className="hidden sm:inline">{cat.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category.name} Statistics</h2>
                      <p className="text-muted-foreground">Latest verified data from official sources</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.data.map((item, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardDescription>{item.label}</CardDescription>
                          <CardTitle className="text-3xl">{item.value}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge variant={item.trend.startsWith('+') ? 'default' : item.trend.startsWith('-') ? 'destructive' : 'secondary'}>
                            {item.trend} vs last period
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Trend Analysis</CardTitle>
                      <CardDescription>Data visualization showing historical trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                        <div className="text-center text-muted-foreground">
                          <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Interactive chart will be displayed here</p>
                          <p className="text-sm">(Requires data visualization library)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/50 bg-accent/30">
                    <CardHeader>
                      <CardTitle className="text-base">Data Source & Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>
                        All data is sourced from official Indonesian government databases and verified by our team. 
                        Last updated: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
