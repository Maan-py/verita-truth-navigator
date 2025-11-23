import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Clock, Star, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { educationApi, ApiError, api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Icon mapping
const iconMap: Record<string, any> = {
  BookOpen,
  Star,
  TrendingUp,
  Award,
};

const Learn = () => {
  const { toast } = useToast();
  const token = api.getToken();
  const isAuthenticated = !!token;

  // Fetch modules
  const { data: modulesData, isLoading: modulesLoading } = useQuery({
    queryKey: ["education-modules"],
    queryFn: () => educationApi.getModules(),
    onError: (error: ApiError) => {
      toast({
        title: "Error loading modules",
        description: error.message || "Failed to load education modules",
        variant: "destructive",
      });
    },
  });

  // Fetch user progress
  const { data: progressData } = useQuery({
    queryKey: ["education-progress"],
    queryFn: () => educationApi.getUserProgress(),
    enabled: isAuthenticated,
    onError: (error: ApiError) => {
      // Silent fail for unauthenticated users
      if (error.statusCode !== 401) {
        toast({
          title: "Error loading progress",
          description: error.message || "Failed to load your progress",
          variant: "destructive",
        });
      }
    },
  });

  // Fetch achievements
  const { data: achievementsData } = useQuery({
    queryKey: ["education-achievements"],
    queryFn: () => educationApi.getUserAchievements(),
    enabled: isAuthenticated,
    onError: (error: ApiError) => {
      // Silent fail for unauthenticated users
      if (error.statusCode !== 401) {
        // Silent error for achievements
      }
    },
  });

  const modules = modulesData?.data || [];
  const progressMap = new Map(
    (progressData?.data || []).map((p: any) => [p.education_modules?.id || p.module_id, p])
  );
  const earnedAchievementIds = new Set(
    (achievementsData?.data || []).map((a: any) => a.achievements?.id || a.achievement_id)
  );

  // Calculate stats
  const completedCount = Array.from(progressMap.values()).filter((p: any) => p.completed).length;
  const inProgressCount = Array.from(progressMap.values()).filter(
    (p: any) => !p.completed && p.progress_percentage > 0
  ).length;
  const totalModules = modules.length;
  const badgesCount = earnedAchievementIds.size;
  const overallProgress = modules.length > 0
    ? Math.round(
        Array.from(progressMap.values()).reduce(
          (sum: number, p: any) => sum + (p.progress_percentage || 0),
          0
        ) / modules.length
      )
    : 0;

  // Fallback modules
  const fallbackModules = [
    {
      id: 1,
      title: "Identifying Misinformation Basics",
      description: "Learn the fundamental techniques to spot fake news and false information",
      difficulty: "Beginner",
      duration: "15 min",
      lessons: 5,
      completed: true,
      progress: 100,
      badge: "Fact Checker",
    },
    {
      id: 2,
      title: "Source Verification Techniques",
      description: "Master the art of verifying sources and cross-checking information",
      difficulty: "Intermediate",
      duration: "25 min",
      lessons: 8,
      completed: false,
      progress: 60,
      badge: "Source Detective",
    },
    {
      id: 3,
      title: "Advanced Media Literacy",
      description: "Deep dive into advanced fact-checking methods and media analysis",
      difficulty: "Advanced",
      duration: "35 min",
      lessons: 12,
      completed: false,
      progress: 0,
      badge: "Truth Guardian",
    },
  ];

  // Use API data if available, otherwise use fallback
  const displayModules = modules.length > 0 ? modules : fallbackModules;

  // Fallback achievements
  const fallbackAchievements = [
    { id: "1", name: "First Module", icon: "BookOpen", earned: earnedAchievementIds.has("1") },
    { id: "2", name: "Perfect Score", icon: "Star", earned: earnedAchievementIds.has("2") },
    { id: "3", name: "Speed Learner", icon: "TrendingUp", earned: earnedAchievementIds.has("3") },
    { id: "4", name: "Master Badge", icon: "Award", earned: earnedAchievementIds.has("4") },
  ];

  const achievements = achievementsData?.data || fallbackAchievements;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Digital Literacy Modules</h1>
            <p className="text-muted-foreground text-lg">
              Build your skills in identifying misinformation and verifying facts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your learning journey and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="text-3xl font-bold text-primary mb-1">{completedCount}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-warning/10">
                    <div className="text-3xl font-bold text-warning mb-1">{inProgressCount}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-3xl font-bold mb-1">{totalModules}</div>
                    <div className="text-sm text-muted-foreground">Total Modules</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-success/10">
                    <div className="text-3xl font-bold text-success mb-1">{badgesCount}</div>
                    <div className="text-sm text-muted-foreground">Badges</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>Badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement: any, idx: number) => {
                    const iconName = achievement.achievements?.icon || achievement.icon || "Award";
                    const Icon = iconMap[iconName] || Award;
                    const earned = achievement.achievements ? true : achievement.earned || earnedAchievementIds.has(achievement.id);
                    const name = achievement.achievements?.name || achievement.name;
                    return (
                      <div
                        key={achievement.id || idx}
                        className={`p-3 rounded-lg text-center ${
                          earned
                            ? "bg-primary/10 border-2 border-primary/30"
                            : "bg-muted/50 opacity-50"
                        }`}
                      >
                        <Icon className={`h-6 w-6 mx-auto mb-1 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="text-xs font-medium">{name}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {modulesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Available Modules</h2>
              
              {displayModules.map((module: any) => {
                const progress = progressMap.get(module.id);
                const progressPercentage = progress?.progress_percentage || 0;
                const completed = progress?.completed || false;
                return (
                  <Card key={module.id} className={completed ? "border-success" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{module.title}</CardTitle>
                            {completed && (
                              <Badge variant="default" className="bg-success">
                                <Award className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className={
                          module.difficulty === "Beginner" ? "border-green-500 text-green-700 dark:text-green-400" :
                          module.difficulty === "Intermediate" ? "border-yellow-500 text-yellow-700 dark:text-yellow-400" :
                          "border-red-500 text-red-700 dark:text-red-400"
                        }>
                          {module.difficulty}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.duration_minutes || module.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {module.lessons_count || module.lessons} lessons
                        </span>
                        {module.badge_name && (
                          <span className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Badge: {module.badge_name}
                          </span>
                        )}
                      </div>

                      {progressPercentage > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button asChild className="flex-1">
                          <Link to={`/learn/${module.id}`}>
                            {progressPercentage === 0 ? "Start Module" : completed ? "Review" : "Continue"}
                          </Link>
                        </Button>
                        {completed && (
                          <Button variant="outline">View Certificate</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
