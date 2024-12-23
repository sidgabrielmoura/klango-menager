'use client'
import { Pen, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { comment } from '@/interfaces/commum-interfaces';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import '../app/globals.css'
import { ModalEditFeedback } from './modalEditFeedback';
export function FeedbackPage() {

    const { toast } = useToast()
    const [comments, setComments] = useState<Array<comment>>([])
    const [selectedFeedback, setSelectedFeedback] = useState<comment | null>(null)
    const handleGetAllAcceptedComments = async () => {
        try {
            const response = await fetch('https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/accepted-comments', {
                method: 'GET',
                headers: {
                    'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
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

    const [modalIsShow, setModalIsShow] = useState(false)
    const toogleModal = () => {
        setModalIsShow(!modalIsShow)
    } 

    const [id, setId] = useState<any>()
    const handleEditFeedback = (feedback: comment, id: any) => {
        setSelectedFeedback(feedback);
        setId(id)
        setModalIsShow(true);
    };

    const handleUpdateCommentInParent = (updatedComment: comment) => {
        setComments((prevComments) =>
                prevComments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
            )
        );
    };

    return (
        <>
            <main className="w-full h-[85%] overflow-y-auto p-2 md:p-5 grid sm:grid-cols-2 xl:grid-cols-3 gap-1">
                {comments.map((comment) => (
                    <section className="rounded-lg w-full h-[200px] flex items-center justify-center overflow-hidden shadow-lg scroll-none" key={comment.id}>
                        <div className="w-full h-full bg-zinc-300 dark:bg-zinc-500/50 p-5 flex flex-col gap-2 overflow-y-auto">
                            <div className='flex items-center gap-2 '> 
                                <h1 className='text-[17px] font-semibold'>{comment.name} -</h1>
                            </div>
                            <h1 className='break-words'>"{comment.comment}"</h1>
                        </div>
                        <div className="dark:bg-zinc-700/60 h-full px-2 py-7 flex flex-col items-center gap-3">
                            <div title='editar'>
                                <Pen className='cursor-pointer size-4' onClick={() => handleEditFeedback(comment, comment.id)}/>
                            </div>
                            <div title='apagar'>
                                <X className='size-5 cursor-pointer text-[#bd2525]' onClick={() => handleDeleteAcceptedComments(comment.id)}/>
                            </div>
                        </div>
                    </section>
                ))}

                {modalIsShow && selectedFeedback && (
                    <div
                        className="w-full h-full bg-black/70 absolute top-0 left-0 flex items-center justify-center px-10"
                        onClick={toogleModal}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='w-full max-w-[500px]'
                        >
                            <ModalEditFeedback feedback={selectedFeedback} id={id} onClose={toogleModal} onCommentUpdated={handleUpdateCommentInParent}/>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}