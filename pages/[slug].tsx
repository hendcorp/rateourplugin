import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface PluginData {
  name: string
  slug: string
  version: string
  author: string
  requires: string
  tested: string
  downloaded: number
  rating: number
  num_ratings: number
  short_description: string
  icons: {
    '1x'?: string
    '2x'?: string
    default?: string
  }
  banners: {
    high?: string
    low?: string
  }
}

interface PluginPageProps {
  plugin: PluginData | null
  slug: string
}

export default function PluginPage({ plugin, slug }: PluginPageProps) {
  if (!plugin) {
    return (
      <>
        <Head>
          <title>Plugin Not Found</title>
        </Head>
        <main className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-lg w-full text-center">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Plugin Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We couldn&apos;t find a plugin with the slug &ldquo;{slug}&rdquo;. Please check the URL and try again.
              </p>
              <Link href="/" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  const pluginUrl = `https://wordpress.org/plugins/${slug}/`
  const reviewUrl = `https://wordpress.org/support/plugin/${slug}/reviews/`
  const loginUrl = 'https://login.wordpress.org/'
  
  // Safe access to plugin icons with fallback
  const defaultIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzMzNzNkYyIvPgo8cGF0aCBkPSJNMjQgMjBoMTZ2NGgtMTZ2LTR6bTAgOGgxNnY0aC0xNnYtNHptMCA4aDE2djRoLTE2di00eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
  const iconUrl = plugin.icons?.['2x'] || plugin.icons?.['1x'] || plugin.icons?.default || defaultIcon

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
      className={`w-12 h-12 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  return (
    <>
      <Head>
        <title>How to rate {plugin.name || 'this plugin'} on WordPress.org</title>
        <meta name="description" content={`Learn how to leave a 5-star review for ${plugin.name || 'this plugin'} on WordPress.org`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with 5 stars */}
          <div className="text-center mb-16">
            <div className="flex justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={true} />
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12 leading-tight">
              How to rate us on WordPress.org
            </h1>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-12 py-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-xl"
            >
              Leave a 5 star review
            </a>
          </div>

          {/* Main content area */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Instructions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Step 1</h2>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                  Log in to WordPress.org
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    <span className="font-bold text-blue-600">Option 1:</span> Click on{' '}
                    <a
                      href={loginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-semibold"
                    >
                      this link
                    </a>{' '}
                    to access the log in page.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    <span className="font-bold text-green-600">Option 2:</span> Click on the{' '}
                    <span className="font-bold bg-gray-200 px-2 py-1 rounded">&ldquo;Log In&rdquo;</span> button in the top right-hand corner of the{' '}
                    <a
                      href={pluginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-semibold"
                    >
                      {plugin.name || 'plugin'} page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Plugin card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Plugin header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/30">
                    <img
                      src={iconUrl}
                      alt={`${plugin.name || 'Plugin'} icon`}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = defaultIcon
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {plugin.name || 'Plugin Name'}
                    </h3>
                    <p className="text-blue-100 text-base leading-relaxed">
                      {plugin.short_description || 'WordPress Plugin'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plugin stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{plugin.version || '1.0.0'}</div>
                    <div className="text-sm text-gray-600">Version</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{(plugin.downloaded || 0).toLocaleString()}+</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 mb-6 text-center border border-yellow-200">
                  <div className="flex justify-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${star <= Math.round((plugin.rating || 0) / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700">
                    {plugin.num_ratings || 0} reviews
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800 text-lg mb-4">Frequently Asked Questions</h4>
                  <div className="space-y-2">
                    <a href="#" className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-colors">
                      Support Threads
                    </a>
                    <a href="#" className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-colors">
                      Active Topics
                    </a>
                    <a href="#" className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-colors">
                      Unresolved Topics
                    </a>
                    <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                      Reviews ★
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-colors font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Generate another review guide
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string

  if (!slug) {
    return {
      props: {
        plugin: null,
        slug: ''
      }
    }
  }

  try {
    const apiUrl = `https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=${slug}`
    console.log('Fetching plugin data from:', apiUrl)
    
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const responseText = await response.text()
    console.log('Raw API response:', responseText.substring(0, 200) + '...')
    
    let plugin
    try {
      plugin = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
      throw new Error('Invalid JSON response from WordPress API')
    }

    // Log the plugin structure to understand what we're getting
    console.log('Plugin object keys:', Object.keys(plugin || {}))
    console.log('Plugin icons:', plugin?.icons)
    
    // Validate that we have the minimum required data
    if (!plugin || typeof plugin !== 'object') {
      throw new Error('Invalid plugin data structure')
    }

    // WordPress API returns the plugin data directly
    return {
      props: {
        plugin,
        slug
      }
    }
  } catch (error) {
    console.error('Error fetching plugin data for slug:', slug, error)
    return {
      props: {
        plugin: null,
        slug
      }
    }
  }
} 