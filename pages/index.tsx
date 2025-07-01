import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home() {
  const [pluginUrl, setPluginUrl] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const extractPluginSlug = (url: string): string | null => {
    // Match WordPress.org plugin URLs
    const match = url.match(/wordpress\.org\/plugins\/([^\/]+)\/?/)
    return match ? match[1] : null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!pluginUrl.trim()) {
      setError('Please enter a plugin URL')
      return
    }

    const slug = extractPluginSlug(pluginUrl)
    
    if (!slug) {
      setError('Please enter a valid WordPress.org plugin URL (e.g., https://wordpress.org/plugins/plugin-name/)')
      return
    }

    router.push(`/${slug}`)
  }

  return (
    <>
      <Head>
        <title>WordPress Plugin Review Guide Generator</title>
        <meta name="description" content="Generate branded review guides for WordPress plugins" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              WordPress Plugin<br />Review Guide Generator
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="plugin-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your WordPress plugin URL
                </label>
                <input
                  id="plugin-url"
                  type="url"
                  value={pluginUrl}
                  onChange={(e) => setPluginUrl(e.target.value)}
                  placeholder="https://wordpress.org/plugins/your-plugin-name/"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Generate Review Guide
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-500 text-center">
              <p>Example: https://wordpress.org/plugins/wp-rss-aggregator/</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 