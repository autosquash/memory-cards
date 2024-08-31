const handler = {
    get(_target: unknown, name: string) {
        // console.log('handling key ' + name)
        return `Value for attribute ${name}`
    },
}
// console.log('importing cssModulesMock')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const content: any = new Proxy({}, handler)
export default content
