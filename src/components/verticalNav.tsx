'use client'
import { BarChart2, TableOfContents, KeyIcon, Grid3X3Icon, BoltIcon, HelpCircle, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
export function VerticalNav(){

    const navItems = [
        { name: 'Dashboard', href: '/', icon: BarChart2 },
        { name: 'Conteúdo do Site', href: '/a', icon: TableOfContents },
        { name: 'Gerenciamento de Usuários', href: '/b', icon: KeyIcon },
        { name: 'Análise e Estatísticas', href: '/c', icon: Grid3X3Icon },
        { name: 'Configurações do Site', href: '/d', icon: BoltIcon },
        { name: 'Suporte', href: '/e', icon: HelpCircle },
    ]

    const dashboardItens = [
        {name: 'Visão Geral', href: '/a', icon: BarChart2},
        {name: 'Relatórios de Desempenho', href: '/b', icon: BarChart2}
    ]
    
    const siteContentItens = [
        {name: 'Páginas', href: '/a', icon: BarChart2},
        {name: 'Blog ou Notícias', href: '/b', icon: BarChart2},
        {name: 'Galeria de Imagens/Vídeos', href: '/c', icon: BarChart2}
    ]

    const userManeger = [
        {name: 'Permissões e Acessos', href: '/a', icon: BarChart2},
        {name: 'Comentários e Feedback', href: '/b', icon: BarChart2}
    ]

    const analysisAndStatisticsItens = [
        {name: 'Tráfego', href: '/a', icon: BarChart2},
        {name: 'Conversões', href: '/b', icon: BarChart2},
        {name: 'SEO e Desempenho', href: '/c', icon: BarChart2}
    ]

    const siteConfigurationItens = [
        {name: 'Configurações Gerais', href: '/a', icon: BarChart2},
        {name: 'SEO e Meta Tags', href: '/b', icon: BarChart2},
        {name: 'Domínio e Email:', href: '/c', icon: BarChart2}
    ]

    const suport = [
        {name: 'Ajuda e Documentação', href: '/a', icon: BarChart2},
        {name: 'Contato com Suporte', href: '/b', icon: BarChart2}
    ]
    const pathname = usePathname()

    return(
        <>
            <section className="min-w-[300px] bg-zinc-800 h-screen hidden md:block py-6">
                <div className="space-y-1 px-3 flex flex-col items-start w-full">
                    {navItems.map((item) => (
                        <>
                            <Button
                                key={item.href}
                                asChild
                                variant='ghost'
                                className={
                                    pathname === item.href ? 'w-full flex justify-start bg-zinc-700 hover:bg-zinc-700 hover:text-zinc-50 cursor-pointer' : 'w-full flex justify-start hover:bg-zinc-700/40 hover:text-zinc-50 cursor-pointer'
                                }
                            >
                                <div className='w-full flex justify-between'>
                                    <div className='flex gap-1'>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </div>

                                    <ChevronRight/>
                                </div>
                            </Button>
                            <div className='w-full flex flex-col items-center'>
                                
                            </div>
                        </>
                    ))}
                </div>
            </section>
        </>
    )
}