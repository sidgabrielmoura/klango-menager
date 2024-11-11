"use client"

import { Users, DollarSign, ShoppingCart, BarChart2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, CartesianGrid, XAxis, BarChart, LineChart, Line, LabelList, Cell, PieChart, Pie, Label } from "recharts";
import React from "react";
import { CommentsDashBoard } from "./commentsDashBoard";

const chartData = [
    { month: "Janeiro", Redes: 186, Pesquisa: 140, visitantes: 326 },
    { month: "Fevereiro", Redes: 305, Pesquisa: 200, visitantes: -505 },
    { month: "Março", Redes: 237, Pesquisa: 120, visitantes: 357 },
    { month: "Abril", Redes: 73, Pesquisa: 190, visitantes: -263 },
    { month: "Maio", Redes: 209, Pesquisa: 130, visitantes: 339 },
    { month: "Junho", Redes: 214, Pesquisa: 140, visitantes: 354 },
]

const pizzaGraphicData = [
    { visitantes: 326, fill: "var(--color-chrome)", browser: "chrome" },
    { visitantes: -505, fill: "var(--color-safari)", browser: "safari" },
    { visitantes: 357, fill: "var(--color-firefox)", browser: "firefox" },
    { visitantes: -263, fill: "var(--color-edge)", browser: "edge" },
    { visitantes: 339, fill: "var(--color-other)", browser: "other" },
    { visitantes: 354, fill: "var(--color-chrome)", browser: "instagram" },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const cardsData = [
    { title: 'Usuários acessados no mês', data: '10,482', description: '+20.1% comparado ao mês passado', id: '1' },
    { title: 'Usuários acessados na semana', data: '7,268', description: '+10.1% comparado a semana passada', id: '2' },
    { title: 'Tempo Médio na Página', data: '1.5 min', description: '+8.1% comparado ao mês passado', id: '3' },
    { title: 'Origem de tráfego predominante', data: 'Instagram', description: 'Google', id: '4' },
]

export function Dashboard() {

    const totalVisitors = React.useMemo(() => {
        return pizzaGraphicData.reduce((acc, curr) => acc + curr.visitantes, 0)
    }, [])

    return (
        <>
            <main className="w-full h-[85%] overflow-y-auto p-4 md:p-5 flex flex-col gap-5">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {cardsData.map((item) => (
                        <Card className="dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-300 w-full" key={item.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.data}</div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="flex flex-col lg:flex-row gap-3 w-full">
                    <Card className="dark:bg-zinc-800 dark:border-zinc-600 w-full">
                        <CardHeader>
                            <CardTitle>Origem das visitas</CardTitle>
                            <CardDescription>últimos 6 meses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dashed" />}
                                    />
                                    <Bar dataKey="Redes" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="Pesquisa" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                mostrando o total de visitantes nos últimos 6 meses
                            </div>
                        </CardFooter>
                    </Card>

                    {/*  */}

                    <Card className="dark:bg-zinc-800 dark:border-zinc-600 w-full">
                        <CardHeader>
                            <CardTitle>Visitas mensais</CardTitle>
                            <CardDescription>últimos 6 meses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="w-full">
                                <LineChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        top: 30,
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <Line
                                        dataKey="Redes"
                                        type="natural"
                                        stroke="var(--color-desktop)"
                                        strokeWidth={2}
                                        dot={{
                                            fill: "var(--color-desktop)",
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    >
                                        <LabelList
                                            position="top"
                                            offset={12}
                                            className="fill-foreground"
                                            fontSize={12}
                                        />
                                    </Line>
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                mostrando o total de visitantes nos últimos 6 meses
                            </div>
                        </CardFooter>
                    </Card>

                    {/*  */}

                    <Card className="flex flex-col dark:bg-zinc-800 dark:border-zinc-600 w-full">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Visitantes alcançados</CardTitle>
                            <CardDescription>desde a data da publicação do site</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={pizzaGraphicData}
                                        dataKey="visitantes"
                                        nameKey="browser"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {totalVisitors.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Visitantes no total
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                mostrando o total de visitantes nos últimos 6 meses
                            </div>
                        </CardFooter>
                    </Card>
                </section>

                <section className="w-full flex justify-center">
                    <CommentsDashBoard/>
                </section>
            </main>
        </>
    )
}