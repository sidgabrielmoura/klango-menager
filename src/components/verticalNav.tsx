'use client'
import { AlignJustify, Home, BarChart2, Users, Settings, HelpCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'
export function VerticalNav(){

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
        { name: 'Users', href: '/users', icon: Users },
        { name: 'Settings', href: '/settings', icon: Settings },
        { name: 'Help', href: '/help', icon: HelpCircle },
    ]
    const pathname = usePathname()

    return(
        <>
            <section className="min-w-[250px] bg-zinc-800 h-screen hidden md:block py-6">
                <div className="space-y-1 px-3 flex flex-col items-start w-full">
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
            </section>
        </>
    )
}