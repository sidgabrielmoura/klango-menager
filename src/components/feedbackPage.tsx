'use client'
import { Pen, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { comment } from '@/interfaces/commum-interfaces';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
export function FeedbackPage() {

    const { toast } = useToast()
    const [comments, setComments] = useState<Array<comment>>([])
    const handleGetAllAcceptedComments = async () => {
        try {
            const response = await fetch('https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/accepted-comments', {
                method: 'GET',
                headers: {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9scGtrZW9kbGhiamlyb2hxcGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTE4ODYsImV4cCI6MjA0NzE2Nzg4Nn0.JwWNT9K1iTv4x2isG_CQK_Os_T5p8eNaC24wyMhPvZg'
                }
            })

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data: any = await response.json()
            console.log(response)
            setComments(data)
        } catch (error: any) {

            console.error('Erro ao fazer a requisição:', error);

            const errorReport = {
                message: error.message || 'Erro desconhecido',
                stack: error.stack || 'Sem stack disponível',
                response: error.response ? {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response._data
                } : 'Nenhuma resposta recebida'
            };

            console.error('Relatório de erro:', errorReport);

        }
    }

    useEffect(() => {
        handleGetAllAcceptedComments()
    }, [])


    const [deletingComment, setDeletingComment] = useState<number | null>(null)
    const handleDeleteAcceptedComments = async (id: number) => {
        try {
            setDeletingComment(id)
            const response = await fetch(`https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/accepted-comments?id=eq.${id}`, {
                method: "DELETE",
                headers: {
                    'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
                }
            })

            if (!response.ok) {
                throw new Error(`Erro ao deletar comentário: ${response.status}`);
            }

            toast({
                title: "Comentário deletado com sucesso",
                description: "Este comentário não irá aparecer na seção de avaliações do seu site",
            })

            setDeletingComment(null)
            setComments(prevComments => prevComments.filter(item => item.id !== id))
        } catch (error: any) {
            console.error('Erro ao fazer a requisição:', error);

            const errorReport = {
                message: error.message || 'Erro desconhecido',
                stack: error.stack || 'Sem stack disponível',
                response: error.response ? {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response._data
                } : 'Nenhuma resposta recebida'
            };

            console.error('Relatório de erro:', errorReport);
        }
    }

    return (
        <>
            <main className="w-full h-[85%] overflow-y-auto p-2 md:p-5 grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-1">
                {comments.map((comment) => (
                    <section className="rounded-lg w-full h-[300px] flex flex-col items-center justify-center overflow-hidden shadow-lg" key={comment.id}>
                        <div className="w-full h-full bg-zinc-300 dark:bg-zinc-500/50 p-5 flex flex-col gap-2 overflow-y-auto">
                            <div className='flex items-center gap-2 '>                            
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1 className='text-[17px] font-semibold'>{comment.name}</h1>
                            </div>
                            <h1 className='break-words'>"{comment.comment}"</h1>
                        </div>
                        <div className="dark:bg-zinc-700/60 w-full py-2 flex items-center justify-center gap-5">
                            <div title='editar'>
                                <Pen className='cursor-pointer size-5'/>
                            </div>
                            <div title='apagar'>
                                <X className='size-7 cursor-pointer text-[#bd2525]'/>
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </>
    )
}