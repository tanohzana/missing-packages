import checkFile from '../src/checkFile'

describe('checkFile()', () => {
    it('should use the callback and equal 2', () => {
        checkFile((toInstall, installed) => {
            expect(installed.length - toInstall.length).toEqual(2)
        },
        `${process.cwd()}/spec/support/packageForTests.json`,
        `${process.cwd()}/spec/support/mainForTests.js`)
    })
})