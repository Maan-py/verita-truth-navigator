import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Shield, Target, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Credibility",
      description: "We verify every piece of information against official sources and maintain complete transparency in our process.",
    },
    {
      icon: Target,
      title: "Accuracy First",
      description: "Our expert team uses rigorous fact-checking methodologies to ensure the highest accuracy in our verifications.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We empower citizens with the tools and knowledge to navigate the digital information landscape confidently.",
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Fighting misinformation contributes to a healthier democracy and more informed society.",
    },
  ];

  const team = [
    { name: "Muhammad Rizal", role: "Project Manager", description: "Strategic planning and business development" },
    { name: "Muhammad Ruhul Jadid", role: "UI/UX Designer", description: "User experience and interface design" },
    { name: "Muhammad Luqmaan", role: "Full-Stack Developer", description: "Backend architecture and API development" },
    { name: "Dewi Rahmawati", role: "Full-Stack Developer", description: "Frontend development and authentication" },
    { name: "Nisrina Rahma Nabilah", role: "Full-Stack Developer", description: "Learning modules and dynamic features" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-20">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Verita</h1>
              <p className="text-xl text-primary-foreground/90">
                We're on a mission to combat misinformation and build digital resilience in Indonesia through 
                trusted fact-checking and educational tools.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl mb-2">Our Mission</CardTitle>
                  <CardDescription className="text-base">
                    Verita was created to address Indonesia's growing challenge of digital misinformation. 
                    We bridge the information gap by curating official public data, providing rapid content verification, 
                    and delivering practical digital literacy tools—especially for Gen Z users who are most vulnerable to online hoaxes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                      <h3 className="font-semibold mb-2 text-success">Short-Term Goals</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Launch functional MVP platform</li>
                        <li>• Process 50+ verification requests</li>
                        <li>• Develop 3 literacy modules</li>
                        <li>• Validate B2B/B2G partnerships</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <h3 className="font-semibold mb-2 text-primary">Long-Term Vision</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Become Indonesia's trusted verification source</li>
                        <li>• Expand premium analytics service</li>
                        <li>• Improve national digital literacy</li>
                        <li>• Build community resilience</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and commitment to fighting misinformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A dedicated group of professionals committed to building a more informed society
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {team.map((member, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-light mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <CardTitle className="text-center text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-center font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-center text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                Together, we're making a difference in the fight against misinformation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-sm text-primary-foreground/80">Facts Verified</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5K+</div>
                <div className="text-sm text-primary-foreground/80">Users Educated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm text-primary-foreground/80">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24h</div>
                <div className="text-sm text-primary-foreground/80">Avg Response</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
