import { Card, Cards } from 'fumadocs-ui/components/card'

const HomePage = () => (
  <main className="flex flex-1 flex-col justify-center align-center text-center">
    <h1 className="mb-4 text-2xl font-bold">Standard for Moeru AI</h1>
    <Cards className="w-full max-w-md mx-auto">
      <Card href="/docs/packages/std" title="TypeScript Library" />
      <Card href="/docs/packages/eslint-config" title="ESLint Configuration" />
    </Cards>
  </main>
)

export default HomePage
