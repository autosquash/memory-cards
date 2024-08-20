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

        ctx.fillStyle = '#DDD'
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
                console.error(`Unknown shape: ${shape}`)
                break
        }
    }, [shape, color])

    return (
        <div
            style={{
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#555',
                width: '130px',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <canvas
                ref={canvasRef}
                width="1300"
                height="1300"
                style={{
                    width: '130px',
                    height: '130px',
                }}
            >
                Canvas unsupported
            </canvas>
        </div>
    )
}
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
export default Card
