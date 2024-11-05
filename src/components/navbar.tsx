'use client'
import { LuSunDim } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { Input } from "./ui/input";
import { AlignJustify, Home, BarChart2, Users, Settings, HelpCircle } from 'lucide-react'
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

export function Navbar(){

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
    };
    const navItems = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
        { name: 'Users', href: '/users', icon: Users },
        { name: 'Settings', href: '/settings', icon: Settings },
        { name: 'Help', href: '/help', icon: HelpCircle },
    ]
    const pathname = usePathname()

    return(
        <>
            <nav className="w-full h-[80px] flex items-center justify-between px-5">
                <div>
                    <h1 className="text-[13px]">pages / home</h1>
                </div>
                <div className="flex gap-2 items-center w-full md:w-2/3 lg:w-1/4">
                    <Input placeholder="pesquise aqui" className="border-zinc-700 focus:border-zinc-300 w-full"/>
                    <LuSunDim className="size-8 cursor-pointer hidden md:block" onClick={toggleDarkMode}/>
                    <Sheet>
                        <SheetTrigger>
                            <CiMenuFries className="md:hidden size-5"/> 
                        </SheetTrigger>
                        <SheetContent>
                            <div className="flex gap-2 items-center">
                                <SheetTitle>Navbar</SheetTitle>
                                <LuSunDim className="size-6 cursor-pointer hidden md:block" onClick={toggleDarkMode}/>
                            </div>
                            <div className="space-y-1 mt-5 flex flex-col items-start w-full">
                                {navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant='ghost'
                                    className={pathname === item.href ? 'w-full flex justify-start bg-zinc-700 hover:bg-zinc-700 hover:text-zinc-50' : 'w-full flex justify-start hover:bg-zinc-700/40 hover:text-zinc-50'}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name} 
                                    </Link>
                                </Button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    )
}