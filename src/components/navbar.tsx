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
            { name: 'Visão Geral', id: '1', href: '/', icon: FlameIcon },
        ] },
        { name: 'Conteúdo do Site', id: '2', icon: TableOfContents, items: [
            { name: 'seções', id: '3', href: '/sections', icon: Layers },
        ] },
        { name: 'Gerenciamento de Usuários', id: '3', icon: KeyIcon, items: [
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
            <nav className="w-full h-[80px] flex items-center justify-between px-5 gap-2">
                <div className="w-full flex justify-between items-center backdrop-blur-sm">
                    <h1 className="text-[13px]">pages / {pathNameView}</h1>
                    <div className="flex gap-2">
                        <Input placeholder="pesquise aqui" className="border-zinc-700 focus:border-zinc-300 w-full" />
                        <LuSunDim className="size-8 cursor-pointer hidden lg:block" onClick={toggleDarkMode} />
                    </div>
                </div>

                <div className="gap-2 items-center block lg:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <CiMenuFries className="lg:hidden size-5" />
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

                            <div className='w-full flex justify-center gap-1 absolute bottom-3'>
                                <h1>feito com </h1>
                                <div className='size-6'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#7aff33" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242"/></svg>
                                </div>
                                <a href='https://www.instagram.com/klangotechnology/' target='_blank' className='underline'>por Klango tech</a>
                                <div className='size-5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#3e721d" d="M15.66 6.844c.485-2.03.384-3.139-.553-3.677c-.936-.537.337-2.666 1.977-.793s1.428 3.618.662 4.853c-.767 1.234-2.336.66-2.086-.383m-.48 2.951c-.916 1.877-1.699 2.668-2.764 2.487c-1.064-.18-1.435 2.272 1.023 1.869c2.457-.403 3.401-1.886 3.595-3.326c.193-1.44-1.383-1.994-1.854-1.03m11.336 6.261c-2.072-1.377-5.382 1.43-5.699 2.28s1.721 3.461 1.146 4.94c-.577 1.477 1.142 1.768 1.92.491s.304-3.612.156-4.169s2.189-1.219 3.671-.037c1.481 1.18-.323-2.925-1.194-3.505m1.068-.818c-1.546-1.949.975-5.482 1.794-5.87c.821-.387 2.572.402 3.997-.295s1.745.854.65 1.874c-1.227 1.142-2.241 1.335-3.119 1.526c-.563.122-.032 2.033-.009 3.97c.023 1.799-2.663-.385-3.313-1.205"/><path fill="#3e721d" d="M15.319 3.167a.724.724 0 1 1-1.448 0a.724.724 0 0 1 1.448 0m-2.999 8.897a.724.724 0 1 1-1.449 0a.724.724 0 0 1 1.449 0m-.298 1.677a.724.724 0 1 1-1.448 0a.724.724 0 0 1 1.448 0m1.447.724a.724.724 0 1 1-1.449 0a.724.724 0 0 1 1.449 0m8.575 8.848a.725.725 0 1 1-1.368.467a.725.725 0 0 1 1.368-.467m.772 1.268a.725.725 0 0 1-1.37.467a.723.723 0 1 1 1.37-.467m1.627-.24a.724.724 0 1 1-1.37.468a.724.724 0 0 1 1.37-.468m9.803-15.752a.725.725 0 1 1-1.45-.003a.725.725 0 0 1 1.45.003m1.504.725a.725.725 0 1 1-1.45-.001a.725.725 0 0 1 1.45.001m-.346 1.716a.725.725 0 1 1-1.45-.001a.725.725 0 0 1 1.45.001M15.512 1.618a.724.724 0 1 1-1.449 0a.724.724 0 0 1 1.449 0m1.571-.469a.724.724 0 1 1-1.448 0a.724.724 0 0 1 1.448 0"/><path fill="#3e721d" d="M.208 5.652C.472 4.599 4.865.929 8.85 1.618c2.024.351 2.942 3.354 5.102 3.428c11.289.389 22.272 11.138 18.847 21.391c-1.506 4.507-5.618 8.798-15.461 5.001c-1.956-.754-3.97-1.985-7.824-1.227c-2.852.563-3.149 3.159-2.803 4.497c.272 1.048-.161 1.582-.701.759c-1.226-1.867-1.317-4.347.643-5.955c3.912-3.211 9.248-1.284 13.137-.059c6.481 2.044 9.917-3.651 6.346-10.315c-3.503-6.54-9.812-8.324-14.005-8.816c-1.168-.137-3.639 2.048-5.367 1.742C3.143 11.421.018 6.416.208 5.652"/><path fill="#77b255" d="M.208 5.652C.472 4.599 4.865.929 8.85 1.618c2.024.351 2.942 3.354 5.102 3.428c11.289.389 22.272 11.138 18.847 21.391c-1.506 4.507-5.618 8.798-15.461 5.001c-1.956-.754-3.97-1.985-7.824-1.227c-2.852.563-3.149 3.159-2.803 4.497c.134.516.097.906-.039 1.073c-.922-1.281-1.362-4.339.661-5.864c3.539-2.667 8.568-.131 13.301 1.042c10.251 2.541 12.183-7.995 7.907-14.875C23.355 7.736 7 5.75.208 5.652"/><circle cx="7" cy="3" r="1" fill="#292f33"/><circle cx="6" cy="10" r="1" fill="#292f33"/></svg>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    )
}