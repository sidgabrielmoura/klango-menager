import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { comment } from "@/interfaces/commum-interfaces";
import { useToast } from "@/hooks/use-toast";
import { CreateNewComment } from "./createNewComment";

export function CommentsDashBoard() {

    const { toast } = useToast()
    const [comments, setComments] = useState<Array<comment>>([])

    const handleGetAllComments = async () => {
        try {
            const response = await fetch('https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/comments', {
                method: 'GET',
                headers: {
                    'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
                }
            })

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            setComments(data)
            console.log(comments)

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

    const [loadingDeleteComment, setLoadingDeleteComment] = useState<number | null>(null)
    const handleDeleteComment = async (id: number) => {
        try {

            setLoadingDeleteComment(id)

            const response = await fetch(`https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/comments?id=eq.${id}`, {
                method: "DELETE",
                headers: {
                    'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
                }
            })

            if (!response.ok) {
                throw new Error(`Erro ao deletar comentário: ${response.status}`);
            }

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
        } finally {
            setLoadingDeleteComment(null)
        }
    }

    useEffect(() => {
        handleGetAllComments()
    }, [])

    const handleAddCommentsOnAcceptedTable = async (name: string, comment: string, id: number) => {
        try {
            const response = await fetch('https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/accepted-comments', {
                method: 'POST',
                headers: {
                    'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment,
                    name
                })
            })

            if (!response.ok) {
                throw new Error(`Erro ao adicionar comentário: ${response.status}`);
            }

            const data = await response.text();
            console.log(data)
            handleDeleteComment(id)
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
            <main className="w-full flex flex-col gap-5">

                <div className="bg-[#81C784] dark:bg-[#59ac5d] w-full flex items-center justify-center py-4 px-2 rounded-2xl">
                    <h1 className="text-[14px] sm:text-[14px] font-bold text-zinc-900">Comentários pendentes para aprovação ( {comments.length > 9 ? comments.length : `0${comments.length}`} )</h1>
                </div>


                <section className={'w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2'}>
                    <CreateNewComment onCommentAdded={handleGetAllComments}/>
                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <Card
                                key={item.id}
                                className={`relative z-20 max-h-[300px] flex justify-center dark:bg-zinc-800 dark:border-zinc-600 p-5 font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] group ${loadingDeleteComment === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}

                            >
                                <div className="relative z-20 overflow-y-auto w-full flex rounded-md bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-600 p-8 font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] lg:group-hover:-translate-y-10 transition-all duration-200">
                                    <div className="max-w-[550px]">
                                        <h1 className="font-bold">{item.name} -</h1>
                                        <h1>" {item.comment} "</h1>
                                    </div>
                                </div>
                                <div className="absolute z-30 lg:!z-0 bottom-[88%] lg:bottom-6 flex gap-4 items-center px-3 py-1 rounded-full dark:bg-zinc-200">
                                    <div className="size-5 cursor-pointer" onClick={() => {
                                        handleAddCommentsOnAcceptedTable(item.name, item.comment, item.id)
                                        toast({
                                            title: "Comentário aprovado!",
                                            description: "Este comentário já está aparecendo na seção de comentários do seu site!",
                                        })                            
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill="#371ae5" d="m1902 196l121 120L683 1657L25 999l121-121l537 537z" /></svg>
                                    </div>
                                    <div className="size-6 cursor-pointer" onClick={() => {
                                        handleDeleteComment(item.id)
                                        toast({
                                            title: "Comentário deletado com sucesso",
                                            description: "Este comentário não irá aparecer na seção de avaliações do seu site",
                                        })                            
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g fill="#e61919"><path d="M16.222 31.778a1 1 0 0 1 0-1.414L22.586 24l-6.364-6.364a1 1 0 0 1 1.414-1.414L24 22.586l6.364-6.364a1 1 0 0 1 1.414 1.414L25.414 24l6.364 6.364a1 1 0 0 1-1.414 1.414L24 25.414l-6.364 6.364a1 1 0 0 1-1.414 0" /><path fillRule="evenodd" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20m0-2c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18" clipRule="evenodd" /></g></svg>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <h1 className="text-center text-[14px] font-medium w-full h-full animate-pulse flex items-center justify-center border border-zinc-500 rounded-lg">Nenhum comentário até o momento...</h1>
                    )}
                </section>
            </main>
        </>
    )
}