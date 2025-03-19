import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChartIcon as ScatterPlot,
  BoxIcon as BoxPlot,
  TreesIcon as TreeMap,
  RadiusIcon as RadialBar,
  Gauge,
} from "lucide-react"

export default function ChartsPage() {
  const chartTypes = {
    basic: [
      {
        title: "Bar Chart",
        description: "Compare quantities across different categories",
        useCase:
          "Perfect for comparing sales across products, regions, or time periods. Ideal for showing ranking and distribution.",
        icon: BarChart,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Comparison", "Distribution", "Ranking"],
      },
      {
        title: "Line Chart",
        description: "Show trends and patterns over time",
        useCase: "Best for visualizing stock prices, temperature changes, or any continuous data over time.",
        icon: LineChart,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Trends", "Time Series", "Continuous"],
      },
      {
        title: "Pie Chart",
        description: "Display parts of a whole",
        useCase: "Effective for showing market share, budget allocation, or demographic breakdowns.",
        icon: PieChart,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Composition", "Proportion", "Parts-to-Whole"],
      },
    ],
    advanced: [
      {
        title: "Scatter Plot",
        description: "Visualize relationships between variables",
        useCase: "Ideal for analyzing correlations, such as price vs. quality or height vs. weight relationships.",
        icon: ScatterPlot,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Correlation", "Distribution", "Patterns"],
      },
      {
        title: "Box Plot",
        description: "Show data distribution and outliers",
        useCase: "Perfect for comparing distributions across groups and identifying outliers in datasets.",
        icon: BoxPlot,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Distribution", "Outliers", "Statistical"],
      },
      {
        title: "Tree Map",
        description: "Hierarchical data visualization",
        useCase: "Great for displaying hierarchical data structures like file systems or organizational charts.",
        icon: TreeMap,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Hierarchy", "Nested", "Size Comparison"],
      },
    ],
    specialized: [
      {
        title: "Radial Chart",
        description: "Circular data visualization",
        useCase: "Useful for cyclic data like monthly patterns or periodic trends.",
        icon: RadialBar,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Circular", "Periodic", "Cycles"],
      },
      {
        title: "Gauge Chart",
        description: "Show progress towards a goal",
        useCase: "Perfect for KPIs, progress tracking, or performance metrics against targets.",
        icon: Gauge,
        image: "/placeholder.svg?height=200&width=300",
        tags: ["KPI", "Progress", "Metrics"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Chart Types & Use Cases</h1>
          <p className="text-muted-foreground text-lg">
            Explore different types of charts and learn when to use them effectively in your dashboards
          </p>
        </div>

        {/* Chart Categories */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="basic">Basic Charts</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Charts</TabsTrigger>
            <TabsTrigger value="specialized">Specialized Charts</TabsTrigger>
          </TabsList>

          {/* Basic Charts */}
          <TabsContent value="basic">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chartTypes.basic.map((chart) => (
                <ChartCard key={chart.title} chart={chart} />
              ))}
            </div>
          </TabsContent>

          {/* Advanced Charts */}
          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chartTypes.advanced.map((chart) => (
                <ChartCard key={chart.title} chart={chart} />
              ))}
            </div>
          </TabsContent>

          {/* Specialized Charts */}
          <TabsContent value="specialized">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chartTypes.specialized.map((chart) => (
                <ChartCard key={chart.title} chart={chart} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ChartCard({ chart }) {
  const { title, description, useCase, icon: Icon, image, tags } = chart

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video relative rounded-md overflow-hidden border">
          <img src={image || "/placeholder.svg"} alt={`${title} example`} className="object-cover w-full h-full" />
        </div>
        <ScrollArea className="h-24">
          <p className="text-sm text-muted-foreground">{useCase}</p>
        </ScrollArea>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

