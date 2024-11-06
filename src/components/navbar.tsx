'use client'
import { LuSunDim } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { Input } from "./ui/input";
import { AlignJustify, Home, BarChart2, Users, Settings, HelpCircle, BoltIcon, Grid3X3Icon, KeyIcon, TableOfContents, ChevronRight, AlertCircle, BookMarked, Drill, Ear, Eye, FlameIcon, HammerIcon, ImagePlus, Images, Layers, LetterText, LockIcon, MessageCircle } from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
    };

    const [openDropdown, setOpenDropdown] = useState(null)
    const pathName = usePathname()

    const navItems = [
        { name: 'Dashboard', id: '1', icon: BarChart2, items: [
            { name: 'Visão Geral', id: '1', href: '/', icon: Eye },
            { name: 'Relatórios de Desempenho', id: '2', href: '/b', icon: FlameIcon }
        ] },
        { name: 'Conteúdo do Site', id: '2', icon: TableOfContents, items: [
            { name: 'Páginas', id: '3', href: '/a', icon: Layers },
            { name: 'Blog ou Notícias', id: '4', href: '/b', icon: ImagePlus },
            { name: 'Galeria de Imagens/Vídeos', id: '5', href: '/c', icon: Images }
        ] },
        { name: 'Gerenciamento de Usuários', id: '3', icon: KeyIcon, items: [
            { name: 'Permissões e Acessos', id: '6', href: '/a', icon: LockIcon },
            { name: 'Comentários e Feedback', id: '7', href: '/b', icon: MessageCircle }
        ] },
        { name: 'Análise e Estatísticas', id: '4', icon: Grid3X3Icon, items: [
            { name: 'Tráfego', href: '/a', id: '8', icon: AlertCircle },
            { name: 'Conversões', href: '/b', id: '9', icon: LetterText },
        ] },
        { name: 'Configurações do Site', id: '5', icon: BoltIcon, items: [
            { name: 'Configurações Gerais', id: '11', href: '/a', icon: HammerIcon },
            { name: 'SEO e Meta Tags', id: '12', href: '/b', icon: Drill },
            { name: 'Domínio e Email', id: '13', href: '/c', icon: BarChart2 }
        ] },
        { name: 'Suporte', id: '6', icon: HelpCircle, items: [
            { name: 'Ajuda e Documentação', id: '14', href: '/a', icon: BookMarked },
            { name: 'Contato com Suporte', id: '15', href: '/b', icon: Ear }
        ] }
    ]

    const toggleDropdown = (index: any) => {
        setOpenDropdown(openDropdown === index ? null : index)
    }

    const pathNameView = pathName === '/' ? 'Dashboard' : pathName.replace('/', '')

    return (
        <>
            <nav className="w-full h-[80px] flex items-center justify-between px-5">
                <div>
                    <h1 className="text-[13px]">pages / {pathNameView}</h1>
                </div>

                <div className="flex gap-2 items-center w-full md:w-2/3 lg:w-1/4">
                    <Input placeholder="pesquise aqui" className="border-zinc-700 focus:border-zinc-300 w-full" />
                    <LuSunDim className="size-8 cursor-pointer hidden md:block" onClick={toggleDarkMode} />
                    <Sheet>
                        <SheetTrigger>
                            <CiMenuFries className="md:hidden size-5" />
                        </SheetTrigger>
                        <SheetContent className="p-2">
                            <SheetTitle className="pb-5 flex gap-1 items-center">
                                <LuSunDim className="size-6 cursor-pointer" onClick={toggleDarkMode} />
                                Navbar 
                            </SheetTitle>
                            {navItems.map((item, index) => (
                                <div key={item.id} className='w-full'>
                                    <Button
                                        key={item.id}
                                        onClick={() => toggleDropdown(index)}
                                        asChild
                                        variant='ghost'
                                        className={'w-full flex justify-start dark:hover:bg-zinc-700/40 dark:hover:text-zinc-50 cursor-pointer'}
                                    >
                                        <div className='w-full flex justify-between'>
                                            <div className='flex gap-1 truncate'>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.name}
                                            </div>

                                            <ChevronRight className={openDropdown === index ? 'rotate-90 transition-all duration-200' : 'rotate-0 transition-all duration-200'} />
                                        </div>
                                    </Button>

                                    <div
                                        className={`transition-all duration-300 overflow-hidden ${openDropdown === index ? 'max-h-screen' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="w-full pl-3 mt-1 space-y-1">
                                            {item.items.map((subItem) => (
                                                <Button
                                                    key={subItem.id}
                                                    asChild
                                                    variant="ghost"
                                                    className={pathName === subItem.href ? 'w-full flex justify-start bg-zinc-200/70 hover:bg-zinc-200/70 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 cursor-pointer' : 'w-full flex justify-start hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50 cursor-pointer'}
                                                >
                                                    <Link href={subItem.href} className="flex gap-1">
                                                        <subItem.icon className="mr-2 h-4 w-4" />
                                                        {subItem.name}
                                                    </Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    )
}