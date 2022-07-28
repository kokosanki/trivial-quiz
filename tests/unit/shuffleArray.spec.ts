import { shuffleArray } from '@/utils/ArrayHelpers'

describe('shuffleArray', () => {
  it('returns randomized array', () => {
    expect(shuffleArray([1, 2, 3, 4])).not.toBe([1, 2, 3, 4])
  })

  it('returns empty array', () => {
    expect(shuffleArray([])).toStrictEqual([])
  })
})
