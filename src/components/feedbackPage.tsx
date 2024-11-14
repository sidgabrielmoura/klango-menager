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
            <main className="w-full max-h-[85%] overflow-y-auto p-2 md:p-5 grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3">
                {comments.length > 0 ? (
                    comments.map((item) => (
                        <section className="rounded-lg w-full h-[250px] flex flex-col items-center justify-center overflow-hidden shadow-lg relative" key={item.id}>
                            <div className="w-full h-full bg-zinc-300 dark:bg-zinc-500/50 p-5 pb-0 flex flex-col justify-between gap-2">
                                <div className='overflow-y-auto w-full h-full'>
                                    <h1 className='text-[17px] font-semibold'>{item.name} -</h1>
                                    <h1 className='break-words'>"{item.comment}"</h1>
                                </div>
                                <div className="dark:bg-zinc-700/60 w-full py-2 flex items-center justify-center gap-3 rounded-t-lg border-zinc-400 dark:border-zinc-600 border-b-0 border">
                                    <div title='editar'>
                                        <Pen className='cursor-pointer size-5' />
                                    </div>
                                    <div title='apagar'>
                                        <X className='size-7 cursor-pointer text-[#bd2525]' onClick={() => handleDeleteAcceptedComments(item.id)} />
                                    </div>
                                </div>
                            </div>
                            {deletingComment === item.id && (
                                <div className='bg-black/50 w-full h-full absolute flex items-center justify-center'>
                                    <div className='size-20'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="white"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="12" r="0" fill="white"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="6" cy="12" r="0" fill="white"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
                                    </div>
                                </div>
                            )}
                        </section>
                    ))
                ) : (
                    <h1>nenhum comentário no seu site até o momento...</h1>
                )}
            </main>
        </>
    )
}