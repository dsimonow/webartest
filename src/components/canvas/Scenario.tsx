'use client'
import dynamic from 'next/dynamic'

import { useRef } from "react";

const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })

export function Scenario() {
    const dogref = useRef(null);
    return (
        <Dog ref={dogref} scale={0.1} />
    )
}