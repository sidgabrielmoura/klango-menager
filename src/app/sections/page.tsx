'use client'
import { SectionsPage } from "@/components/sectionsPage";
import { useEffect } from "react";

export default function Sections(){
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, [])

    return(
        <SectionsPage/>
    )
}