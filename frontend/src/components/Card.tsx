import React, { useEffect, useRef } from 'react'
import { Color, Shape } from '../types'
interface Props {
    color: Color
    shape: Shape
}
const Card = ({ shape, color }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas === null) {
            return
        }
        const ctx = canvas.getContext('2d')
        if (ctx === null) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = color

        switch (shape) {
            case 'circle':
                drawCircle(
                    ctx,
                    canvas.width / 2,
                    canvas.height / 2,
                    canvas.width / 4
                )
                break
            case 'square':
                drawSquare(
                    ctx,
                    canvas.width / 4,
                    canvas.height / 4,
                    canvas.width / 2
                )
                break
            case 'triangle':
                drawTriangle(
                    ctx,
                    canvas.width / 2,
                    canvas.height / 4,
                    canvas.width / 2
                )
                break
            default:
                break
        }
    }, [shape, color])

    const drawCircle = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number
    ) => {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()
    }

    const drawSquare = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number
    ) => {
        ctx.fillRect(x, y, size, size)
    }

    const drawTriangle = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number
    ) => {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x - size / 2, y + size)
        ctx.lineTo(x + size / 2, y + size)
        ctx.closePath()
        ctx.fill()
    }

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#FFFFFF',
                width: '130px',
                height: '150px',
            }}
        >
            <canvas
                ref={canvasRef}
                width={130}
                height={130}
                style={{ width: '130px', height: '130px' }}
            ></canvas>
        </div>
    )
}

export default Card
