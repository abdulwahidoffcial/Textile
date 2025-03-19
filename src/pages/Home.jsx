import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, BarChart3, PieChart, LineChart, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIframeLoaded(true);
    }, 1000); // Delay the iframe loading by 1 second

    return () => clearTimeout(timer);
  }, []);

  function getback() {
    navigate("/dashboard");
  }



      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Transform Your Data Into Insights</h2>
            <p className="text-muted-foreground mb-6">
              Powerful visualization tools to help you understand and communicate your data effectively
            </p>
            <Button size="lg" className="mr-4" onClick={getback}>
              Explore Dashboards
              <ChevronRight className="ml-2" />
            </Button>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img src="/placeholder.svg?height=400&width=600" alt="Dashboard Overview" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Visualizations */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="trending" className="mb-8">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="trending" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video mb-4 bg-muted rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Sales Performance</h3>
                  <p className="text-sm text-muted-foreground">Monthly revenue analysis and trends</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video mb-4 bg-muted rounded-lg flex items-center justify-center">
                    <PieChart className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Market Distribution</h3>
                  <p className="text-sm text-muted-foreground">Regional market share breakdown</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video mb-4 bg-muted rounded-lg flex items-center justify-center">
                    <LineChart className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Growth Metrics</h3>
                  <p className="text-sm text-muted-foreground">Year-over-year performance metrics</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured Dashboard */}
      <section className="container mx-auto px-4 py-12 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Dashboard</h2>
          <p className="text-muted-foreground">Explore our most comprehensive business intelligence dashboard</p>
        </div>
        <div className="relative aspect-[21/9] rounded-lg overflow-hidden border">
          <img src="/placeholder.svg?height=600&width=1400" alt="Featured Dashboard" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Executive Overview</h3>
              <p className="text-muted-foreground mb-4">
                A comprehensive view of your organization's key performance indicators
              </p>
              <Button>
                View Dashboard
                <TrendingUp className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

