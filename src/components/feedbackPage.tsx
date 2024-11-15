import { Pen, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
export function FeedbackPage(){
    const comments = [
        {
            username: "Ana Silva",
            content: "Estou apaixonada pelo produto! A qualidade é excelente, e realmente faz o que promete. Minha pele está mais hidratada e com um brilho saudável. Vou recomendar para todas as minhas amigas!",
            id: "1"
        },
        {
            username: "João Pereira",
            content: "Que experiência incrível! A comida estava deliciosa e chegou no horário combinado. O atendimento foi super atencioso, e o preço é justo pela qualidade oferecida. Com certeza, vou pedir de novo!",
            id: "2"
        },
        {
            username: "Camila Souza",
            content: "Eu amei minha compra! O tecido é ótimo, a cor é fiel à foto e o caimento é perfeito. Além disso, a entrega foi rápida e veio tudo bem embalado. Não vejo a hora de fazer o próximo pedido!",
            id: "3"
        },
        {
            username: "Ricardo Martins",
            content: "O atendimento foi excelente e o consultor realmente entendeu as minhas necessidades. A análise e as sugestões foram muito úteis, e já estou vendo resultados. Recomendo para quem precisa de uma orientação profissional!",
            id: "4"
        },
        {
            username: "Mariana Rocha",
            content: "Desde que comecei, sinto uma mudança incrível no meu corpo e na minha mente. As aulas são bem dinâmicas, e os professores têm muita atenção com cada aluno. É ótimo fazer parte dessa comunidade!",
            id: "5"
        },
        {
            username: "Lucas Almeida",
            content: "O site ficou do jeito que imaginei: moderno, funcional e fácil de navegar. O desenvolvedor sempre esteve disponível para tirar dúvidas e ajustar os detalhes. Agora posso gerenciar tudo com facilidade. Super recomendo!",
            id: "6"
        },
        {
            username: "Ana Silva",
            content: "Estou apaixonada pelo produto! A qualidade é excelente, e realmente faz o que promete. Minha pele está mais hidratada e com um brilho saudável. Vou recomendar para todas as minhas amigas!",
            id: "7"
        },
        {
            username: "João Pereira",
            content: "Que experiência incrível! A comida estava deliciosa e chegou no horário combinado. O atendimento foi super atencioso, e o preço é justo pela qualidade oferecida. Com certeza, vou pedir de novo!",
            id: "8"
        },
        {
            username: "Camila Souza",
            content: "Eu amei minha compra! O tecido é ótimo, a cor é fiel à foto e o caimento é perfeito. Além disso, a entrega foi rápida e veio tudo bem embalado. Não vejo a hora de fazer o próximo pedido!",
            id: "9"
        },
        {
            username: "Ricardo Martins",
            content: "O atendimento foi excelente e o consultor realmente entendeu as minhas necessidades. A análise e as sugestões foram muito úteis, e já estou vendo resultados. Recomendo para quem precisa de uma orientação profissional!",
            id: "10"
        },
        {
            username: "Mariana Rocha",
            content: "Desde que comecei, sinto uma mudança incrível no meu corpo e na minha mente. As aulas são bem dinâmicas, e os professores têm muita atenção com cada aluno. É ótimo fazer parte dessa comunidade!",
            id: "11"
        },
        {
            username: "Lucas Almeida",
            content: "O site ficou do jeito que imaginei: moderno, funcional e fácil de navegar. O desenvolvedor sempre esteve disponível para tirar dúvidas e ajustar os detalhes. Agora posso gerenciar tudo com facilidade. Super recomendo!",
            id: "12"
        }
    ]

    return(
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
                                <h1 className='text-[17px] font-semibold'>{comment.username}</h1>
                            </div>
                            <h1 className='break-words'>"{comment.content}"</h1>
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