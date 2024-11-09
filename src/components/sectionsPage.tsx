'use client'
import { Minus, Plus, Upload, X } from "lucide-react";
import "../app/globals.css";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
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


    /// second section

    const [imageAreas, setImageAreas] = useState(3)
    const [images, setImages] = useState<string[]>([])

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
        if(imageAreas > 3){
            setImageAreas(prev => prev - 1)
        }
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <main className="w-full h-[85%] overflow-y-auto p-4 md:p-5 flex flex-col gap-[70px] backdrop-blur-sm">
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
                    <div className="w-full rounded-xl space-y-5 overflow-hidden overflow-y-auto h-[550px]">

                        {/* primeira seção */}

                        <h1 className="text-[20px] font-bold">Primeira seção:</h1>
                        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full dark:bg-zinc-800 p-5">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="image-upload">Upload Image</Label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-500 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 dark:text-zinc-400">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                                >
                                                    <span>Upload a file</span>
                                                    <Input
                                                        id="image-upload"
                                                        name="image-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter title"
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
                                    <Label htmlFor="subtitle">Subtitle</Label>
                                    <Textarea
                                        id="subtitle"
                                        placeholder="Enter subtitle"
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
                        </div>




                        {/* segunda seção */}




                        <h1 className="text-[20px] font-bold">Segunda seção:</h1>
                        <Card className="w-full mx-auto dark:bg-zinc-800">
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
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="image-upload-second" className="cursor-pointer">
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
                                            <span>Upload Images</span>
                                        </div>
                                    </Label>
                                    {imageAreas < 6 && (
                                        <Button onClick={addImageArea} variant="outline" className="dark:hover:bg-zinc-700 border border-zinc-600">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Area
                                        </Button>
                                    )}
                                    {imageAreas > 3 && (
                                        <Button onClick={removeArea} variant="outline" className="dark:hover:bg-zinc-700 border border-zinc-600">
                                            <Minus className="h-4 w-4 mr-2" />
                                            Remove Area
                                        </Button>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {images.length} / 6 images uploaded
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}