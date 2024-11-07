import { Card } from "./ui/card";

export function CommentsDashBoard(){

    const cardsData = [
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
        }
    ]

    return(
        <>
            <main className="w-full flex flex-col gap-5">
                <div className="bg-[#81C784] dark:bg-[#59ac5d] w-full flex items-center justify-center py-4 px-2 rounded-2xl">
                    <h1 className="text-[14px] sm:text-[14px] font-bold text-zinc-900">Comentários pendentes para aprovação</h1>
                </div>

                <section className="w-full grid grid-cols-3 gap-2">
                    {cardsData.map((item) => (
                        <Card key={item.id} className="relative dark:bg-zinc-800 dark:border-zinc-600 p-5 font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] hover:-translate-y-10 transition-all duration-200">
                            <div>
                                <h1 className="font-bold">{ item.username } -</h1>
                                <h1>" {item.content} "</h1>
                            </div>
                        </Card>
                    ))}
                </section>
            </main>
        </>
    )
}