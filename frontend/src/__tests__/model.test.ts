import { createCard, getResult } from '../model'
import { Color, Shape } from '../types'

const data1: [Shape, Color][] = [
    ['square', 'green'],
    ['triangle', 'red'],
    ['circle', 'blue'],
]

test('getResult=>true', () => {
    const sequence1 = data1.map(([shape, color]) => createCard(shape, color))
    const sequence2 = data1.map(([shape, color]) => createCard(shape, color))
    expect(getResult(sequence1, sequence2)).toBe(true)
})

test('getResult=>false', () => {
    const sequence1 = data1.map(([shape, color]) => createCard(shape, color))
    const data2 = [...data1]
    data2[2] = ['circle', 'red']
    const sequence2 = data2.map(([shape, color]) => createCard(shape, color))
    expect(getResult(sequence1, sequence2)).toBe(false)
})
