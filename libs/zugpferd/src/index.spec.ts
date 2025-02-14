import { ApiAnalytics } from '.'

describe('ApiAnalytics', () => {
  it('exposes #foundAllUsers', () => {
    const zugpferd = new ApiAnalytics()
    expect(zugpferd).toHaveProperty('foundAllUsers')
  })
})
