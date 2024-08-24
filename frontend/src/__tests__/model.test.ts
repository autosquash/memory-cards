import { createCard, getResult } from '../model'
import { sequenceData } from './examples'

test('getResult=>true', () => {
    const sequence1 = sequenceData.map(([shape, color]) =>
        createCard(shape, color)
    )
    const sequence2 = sequenceData.map(([shape, color]) =>
        createCard(shape, color)
    )
    expect(getResult(sequence1, sequence2)).toBe(true)
})

test('getResult=>false', () => {
    const sequence1 = sequenceData.map(([shape, color]) =>
        createCard(shape, color)
    )
    let data2 = [...sequenceData]
    data2 = [sequenceData[1], sequenceData[0], ...sequenceData.slice(2)]
    const sequence2 = data2.map(([shape, color]) => createCard(shape, color))
    expect(getResult(sequence1, sequence2)).toBe(false)
})
