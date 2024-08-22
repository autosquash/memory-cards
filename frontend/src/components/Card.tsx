import { useEffect, useRef } from 'react'
import { Color, Shape } from '../types'
interface Props {
    color: Color
    shape: Shape
    scale?: number
}

type Position = [number, number]

const Card = ({ shape, color, scale = 1 }: Props) => {
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
                    [canvas.width / 2, canvas.height / 2],
                    canvas.width / 4
                )
                break
            case 'square':
                drawSquare(
                    ctx,
                    [canvas.width / 4, canvas.height / 4],
                    canvas.width / 2
                )
                break
            case 'triangle':
                drawTriangle(
                    ctx,
                    [canvas.width / 2, canvas.height / 4],
                    canvas.width / 2
                )
                break
            default:
                console.error(`Unknown shape: ${shape}`)
                break
        }
    }, [shape, color])
    const innerSquareSide = 130
    const cardWidth = 130
    const cardHeight = 150
    const toPixels = (value: number) => `${value}px`
    const scaled = (value: number) => toPixels(value * scale)

    return (
        <div
            style={{
                borderRadius: scaled(8),
                padding: scaled(10),
                backgroundColor: '#555',
                width: scaled(cardWidth),
                height: scaled(cardHeight),
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
                    width: scaled(innerSquareSide),
                    height: scaled(innerSquareSide),
                }}
            >
                Canvas unsupported
            </canvas>
        </div>
    )
}
const drawCircle = (
    ctx: CanvasRenderingContext2D,
    center: Position,
    radius: number
) => {
    const [x, y] = center
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
}

const drawSquare = (
    ctx: CanvasRenderingContext2D,
    pos: Position,
    size: number
) => {
    const [x, y] = pos
    ctx.fillRect(x, y, size, size)
}

const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    pos: Position,
    size: number
) => {
    const [x, y] = pos
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - size / 2, y + size)
    ctx.lineTo(x + size / 2, y + size)
    ctx.closePath()
    ctx.fill()
}
export default Card
