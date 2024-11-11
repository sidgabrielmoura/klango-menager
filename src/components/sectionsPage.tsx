'use client'
import { Minus, Plus, Upload, X } from "lucide-react";
import "../app/globals.css";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, ChangeEvent, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";
export function SectionsPage() {

    const [imageFirstSection, setImageFirstSection] = useState<string | null>(null)
    const [titleFirstSection, setTitleFirstSection] = useState('')
    const [subtitleFirstSection, setSubtitleFirstSection] = useState('')
    const maxTitleLength = 50
    const maxSubtitleLength = 200

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageFirstSection(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }


    /// 2º section

    const [imageAreas, setImageAreas] = useState(3)
    const [titleSecondSection, setTitleSecondSection] = useState('')
    const [subtitleSecondSection, setSubtitleSecondSection] = useState('')
    const [images, setImages] = useState<string[]>([])
    const maxSecTitleLength = 50
    const maxSecSubtitleLength = 200

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file))
            setImages(prev => [...prev, ...newImages].slice(0, 6))
        }
    }

    const addImageArea = () => {
        if (imageAreas < 6) {
            setImageAreas(prev => prev + 1)
        }
    }

    const removeArea = () => {
        if (imageAreas > 3) {
            setImageAreas(prev => prev - 1)
        }
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }


    //// 3º section


    const [titleThirdSection, setTitleThirdSection] = useState('')
    const [descriptionThirdSection, setDescriptionThirdSection] = useState('')
    const [imagePreviewThirdSection, setImagePreviewThirdSection] = useState<string | null>(null)
    const [reasonsThirdSection, setReasonsThirdSection] = useState([
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' }
    ])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreviewThirdSection(reader.result as string)
        }
        reader.readAsDataURL(file)
        }
    }

    const handleReasonChange = (index: number, field: 'title' | 'description', value: string) => {
        const newReasons = [...reasonsThirdSection]
        newReasons[index][field] = value
        setReasonsThirdSection(newReasons)
    }

    return (
        <main className="w-full h-[85%] overflow-y-auto p-2 md:p-5 flex flex-col gap-[70px] backdrop-blur-sm">
            <section className="w-full min-h-[90%]">
                <h1 className="text-[25px] font-semibold">seu site está assim:</h1>
                <iframe
                    src="https://cortinas-persianas-theta.vercel.app/"
                    title="W3Schools Free Online Web Tutorials"
                    className="w-full h-full rounded-2xl"
                    style={{
                        animation: 'growDown 0.3s ease-out forwards',
                        transformOrigin: 'top center'
                    }}
                ></iframe>
            </section>

            <section className="w-full">
                <div>
                    <div className="w-full rounded-xl space-y-5 overflow-hidden">

                        {/* primeira seção */}

                        <h1 className="text-[20px] font-bold">Primeira seção:</h1>
                        <section className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full dark:bg-zinc-800 p-2">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="image-upload">Carregar imagem</Label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-500 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 dark:text-zinc-400">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                                >
                                                    <span>Carregar imagem aqui</span>
                                                    <Input
                                                        id="image-upload"
                                                        name="image-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="title">título</Label>
                                    <Input
                                        id="title"
                                        placeholder="Digíte um título impactante"
                                        value={titleFirstSection}
                                        onChange={(e) => {
                                            if (e.target.value.length <= maxTitleLength) {
                                                setTitleFirstSection(e.target.value);
                                            }
                                        }}
                                        className="shadow-lg border border-zinc-400"
                                    />
                                    <p className="text-sm text-gray-300">{maxTitleLength - titleFirstSection.length} caracteres restantes</p>
                                </div>
                                <div>
                                    <Label htmlFor="subtitle">Subtítulo</Label>
                                    <Textarea
                                        id="subtitle"
                                        placeholder="Digite uma frase de impacto chamativa "
                                        value={subtitleFirstSection}
                                        onChange={(e) => {
                                            if (e.target.value.length <= maxSubtitleLength) {
                                                setSubtitleFirstSection(e.target.value);
                                            }
                                        }}
                                        className="shadow-lg border border-zinc-400"
                                    />
                                    <p className="text-sm text-gray-300">{maxSubtitleLength - subtitleFirstSection.length} caracteres restantes</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-center items-center">
                                <div className="border rounded-md p-4 flex flex-col gap-3 -tracking-[.35x] text-center justify-center items-center
                                w-full max-w-[800px]">
                                    {imageFirstSection && (
                                        <img
                                            src={imageFirstSection}
                                            alt="Uploaded content"
                                            className="w-full h-[250px] object-cover rounded-md max-w-[800px] bg-no-repeat"
                                        />
                                    )}

                                    {!imageFirstSection && (
                                        <h1 className="text-center">nenhuma imagem selecionada</h1>
                                    )}

                                    {titleFirstSection && <div className="text-[30px] w-full font-semibold break-words leading-6">{titleFirstSection}</div>}
                                    {subtitleFirstSection && <p className="text-gray-600 dark:text-zinc-300 w-full break-words leading-5">{subtitleFirstSection}</p>}
                                </div>
                            </div>
                            <Button className="bg-emerald-500/80 hover:bg-emerald-500" disabled={!titleFirstSection || !subtitleFirstSection || !imageFirstSection}>Salvar</Button>
                        </section>




                        {/* segunda seção */}




                        <h1 className="text-[20px] font-bold">Segunda seção:</h1>
                        <section className="w-full dark:bg-zinc-800">
                            <CardHeader>
                                <CardTitle>importe as imagens para a segunda seção</CardTitle>
                            </CardHeader>
                            <CardContent className="w-full">
                                <div className="grid grid-cols-2 lg:grid-cols-6 lg:grid-rows-1 gap-4">
                                    {Array.from({ length: imageAreas }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square border-2 border-dashed border-zinc-400 rounded-lg flex items-center justify-center relative overflow-hidden"
                                        >
                                            {images[index] ? (
                                                <>
                                                    <img src={images[index]} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col md:flex-row gap-2 justify-between">
                                <div className="flex flex-col-reverse gap-2 md:flex-row items-center">
                                    <Label htmlFor="image-upload-second" className="cursor-pointer w-full">
                                        <Input
                                            id="image-upload-second"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <div className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">
                                            <Upload className="h-4 w-4" />
                                            <span>Carregar imagens</span>
                                        </div>
                                    </Label>
                                    <div className="flex gap-2">
                                        <Button onClick={addImageArea} disabled={imageAreas == 6} variant="outline" className="dark:hover:bg-zinc-700 border border-zinc-600">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Adicionar campo
                                        </Button>
                                        <Button onClick={removeArea} disabled={imageAreas == 3} variant="outline" className="dark:hover:bg-zinc-700 border border-zinc-600">
                                            <Minus className="h-4 w-4 mr-2" />
                                            <h1 className="hidden sm:block">Remover campo</h1>
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {images.length} / 6 imagens carregadas
                                </p>
                            </CardFooter>
                            <div className="flex gap-3 w-full px-5 pb-5">
                                <div className="w-full">
                                    <Label htmlFor="title-second">título</Label>
                                    <Input
                                        id="title-second"
                                        placeholder="Digíte o título"
                                        value={titleSecondSection}
                                        onChange={(e) => {
                                            if (e.target.value.length <= maxSecTitleLength) {
                                                setTitleSecondSection(e.target.value);
                                            }
                                        }}
                                        className="shadow-lg border border-zinc-400 h-[60px]"
                                    />
                                    <p className="text-sm text-gray-300">{maxSecTitleLength - titleSecondSection.length} caracteres restantes</p>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="subtitle-second">Subtítulo</Label>
                                    <Textarea
                                        id="subtitle-second"
                                        placeholder="Digite o Subtítulo"
                                        value={subtitleSecondSection}
                                        onChange={(e) => {
                                            if (e.target.value.length <= maxSecSubtitleLength) {
                                                setSubtitleSecondSection(e.target.value);
                                            }
                                        }}
                                        className="shadow-lg border border-zinc-400"
                                    />
                                    <p className="text-sm text-gray-300">{maxSecSubtitleLength - subtitleSecondSection.length} caracteres restantes</p>
                                </div>
                            </div>
                        </section>



                        <h1 className="text-[20px] font-bold">Terceira seção:</h1>                
                        <section className="w-full dark:bg-zinc-800">
                            <Card className="w-full bg-transparent">
                                <CardHeader>
                                    <CardTitle>Informe aqui as informações para a terceira seção</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-lg font-semibold">Título</Label>
                                            <Input
                                                id="title"
                                                value={titleThirdSection}
                                                onChange={(e) => setTitleThirdSection(e.target.value.slice(0, 50))}
                                                maxLength={50}
                                                placeholder="Escreva um título para a seção"
                                                className="shadow-lg border border-zinc-400"
                                            />
                                            <p className="text-sm text-muted-foreground">{titleThirdSection.length}/50 Caracteres</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-lg font-semibold">Descrição</Label>
                                            <Textarea
                                                id="description"
                                                value={descriptionThirdSection}
                                                onChange={(e) => setDescriptionThirdSection(e.target.value.slice(0, 300))}
                                                maxLength={300}
                                                rows={4}
                                                className="shadow-lg border border-zinc-400"
                                                placeholder="Fale um pouco mais sobre a sua empresa"
                                            />
                                            <p className="text-sm text-muted-foreground">{descriptionThirdSection.length}/300 Caracteres</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="image" className="text-lg font-semibold">Foto para a seção</Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={fileInputRef}
                                                className="hidden"
                                            />
                                            <Button
                                                onClick={() => fileInputRef.current?.click()}
                                                variant="outline"
                                                className="w-full dark:bg-zinc-300 text-zinc-900 font-semibold dark:hover:bg-zinc-300/90 dark:hover:text-zinc-900"
                                            >
                                                Carregar foto aqui
                                            </Button>
                                            {imagePreviewThirdSection && (
                                                <div className="mt-2">
                                                    <img src={imagePreviewThirdSection} alt="Logo Preview" className="max-w-full h-auto rounded-md" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <Label className="text-xl font-bold">Seções de impacto</Label>
                                        {reasonsThirdSection.map((reason, index) => (
                                            <div key={index} className="space-y-2 p-4 bg-secondary border border-zinc-600 rounded-lg">
                                                <Label className="text-lg font-semibold">Seção {index + 1}</Label>
                                                <Input
                                                    placeholder="Título da seção"
                                                    value={reason.title}
                                                    className="shadow-lg border border-zinc-400"
                                                    onChange={(e) => handleReasonChange(index, 'title', e.target.value.slice(0, 50))}
                                                    maxLength={50}
                                                />
                                                <p className="text-sm text-muted-foreground">{reason.title.length}/50 characters</p>
                                                <Textarea
                                                    placeholder="Descrição da seção"
                                                    value={reason.description}
                                                    className="shadow-lg border border-zinc-400"
                                                    onChange={(e) => handleReasonChange(index, 'description', e.target.value.slice(0, 200))}
                                                    maxLength={200}
                                                    rows={3}
                                                />
                                                <p className="text-sm text-muted-foreground">{reason.description.length}/200 characters</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <Separator className="my-6" />
                                <CardFooter>
                                    <Button className="w-full text-[13px] bg-emerald-500 hover:bg-emerald-500/90 font-semibold">Enviar</Button>
                                </CardFooter>
                            </Card>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    )
}