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

                <section className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
                    {cardsData.map((item) => (
                        <Card key={item.id} className="relative z-30 flex justify-center dark:bg-zinc-800 dark:border-zinc-600 p-5 font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] group">
                            <div className="relative z-30 flex rounded-md justify-center bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-600 p-8 font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] group-hover:-translate-y-10 transition-all duration-200">
                                <div className="max-w-[550px]">
                                    <h1 className="font-bold">{ item.username } -</h1>
                                    <h1>" {item.content} "</h1>
                                </div>
                            </div>
                            <div className="absolute bottom-6 flex gap-4 items-center px-3 py-1 rounded-full dark:bg-zinc-200">
                                 <div className="size-5 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill="#371ae5" d="m1902 196l121 120L683 1657L25 999l121-121l537 537z"/></svg>
                                 </div>
                                 <div className="size-6 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g fill="#e61919"><path d="M16.222 31.778a1 1 0 0 1 0-1.414L22.586 24l-6.364-6.364a1 1 0 0 1 1.414-1.414L24 22.586l6.364-6.364a1 1 0 0 1 1.414 1.414L25.414 24l6.364 6.364a1 1 0 0 1-1.414 1.414L24 25.414l-6.364 6.364a1 1 0 0 1-1.414 0"/><path fillRule="evenodd" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20m0-2c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18" clipRule="evenodd"/></g></svg>
                                 </div>
                            </div>
                        </Card>
                    ))}
                </section>
            </main>
        </>
    )
}