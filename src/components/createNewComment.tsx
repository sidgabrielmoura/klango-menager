import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";

export function CreateNewComment({ onCommentAdded }: { onCommentAdded: () => void }) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const handleCreateComment = async (name: string, comment: string) => {
        try {
            const response = await fetch('https://olpkkeodlhbjirohqpax.supabase.co/rest/v1/comments', {
                method: 'POST',
                headers: {
                    'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    comment
                })
            });

            if (!response.ok) {
                throw new Error(`Erro ao adicionar comentário: ${response.status}`);
            }

            if (onCommentAdded) onCommentAdded()
            setComment('')
            setName('')
        } catch (error: any) {
            console.log('Erro ao fazer a requisição:', error);
        }
    };

    return (
        <section>
            <Sheet>
                <SheetTrigger asChild>
                    <div className="border h-full relative z-20 overflow-y-auto w-full flex items-center justify-center rounded-sm bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-600 p-8 font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] cursor-pointer">
                        <PlusCircleIcon className="size-20 text-zinc-500" />
                    </div>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Novo Comentário</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 py-4 w-full mt-10">
                        <div>
                            <Input
                                className="col-span-3"
                                placeholder="Nome do cliente"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                className="col-span-3"
                                placeholder="Agora escreva um comentário cativante!"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <Button onClick={() => handleCreateComment(name, comment)}>Criar</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
}
