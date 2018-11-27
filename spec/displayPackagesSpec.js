import displayPackages from '../src/displayPackages'

xdescribe('displayPackages()', () => {
    const installed = []
    const toInstall = ['lodash']

    beforeEach(() => {
        spyOn(console, 'log')
    })

    it('should call console.log to display packages to install', () => {
        displayPackages(installed, toInstall)
        expect(console.log).toHaveBeenCalled()
    })
})