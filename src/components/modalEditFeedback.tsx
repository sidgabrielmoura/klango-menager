import { comment } from "@/interfaces/commum-interfaces";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from '@/hooks/use-toast';
interface ModalEditFeedbackProps {
    feedback: {
        name: string,
        comment: string
    }
    id: string
    onClose: () => void
    onCommentUpdated: any
}
export function ModalEditFeedback({...props}: ModalEditFeedbackProps){
    const { toast } = useToast()
    useEffect(() => {
        const input: any = document.getElementById("txtInput")
        input.select()
    }, [])


    const [comment, setComment] = useState(props.feedback.comment)
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleUpdateAcceptedComment = async () => {
        try{
            const response = await fetch(`https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/accepted-comments?id=eq.${props.id}`, {
                method: "PUT",
                headers:{
                    "apikey": `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comment: comment,
                    name: props.feedback.name,
                    id: props.id
                })
            })

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            toast({
                title: "Comentário atualizado!",
                description: "O comentário foi atualizado com sucesso",
            })

            const updatedFeedback = { ...props.feedback, comment }
            props.onCommentUpdated(updatedFeedback)
            props.onClose()
        }catch (error: any) {
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

    return(
        <>
            <section className="rounded-lg w-full h-[200px] md:h-[250px] flex items-center justify-center overflow-hidden shadow-lg scroll-none">
                <div className="w-full h-full bg-zinc-300 dark:bg-zinc-700 p-5 flex flex-col gap-2 overflow-y-auto">
                    <div className='flex items-center gap-2 '> 
                        <h1 className='text-[17px] font-semibold'>{props.feedback.name} -</h1>
                    </div>
                    <textarea value={comment} onChange={handleTextareaChange} id="txtInput" className='break-words w-[300px] h-full bg-transparent resize-none outline-none'/>
                </div>
                <div className="dark:bg-zinc-800 bg-zinc-200 h-full px-2 py-5 flex flex-col items-center gap-3">
                    <div title='fechar' onClick={props.onClose}>
                        <X className='cursor-pointer size-5 text-red-700' />
                    </div>
                    <div title='salvar' onClick={handleUpdateAcceptedComment}>
                        <Check className='cursor-pointer size-5 text-green-700' />
                    </div>
                </div>
            </section>
        </>
    )
}