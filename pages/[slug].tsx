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
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-white/30 shadow-2xl">
              <div className="text-8xl mb-8">❌</div>
              <h1 className="text-5xl font-black text-gray-900 mb-6">Plugin Not Found</h1>
              <p className="text-gray-700 mb-12 text-xl leading-relaxed font-medium">
                We couldn&apos;t find a plugin with the slug &ldquo;{slug}&rdquo;. Please check the URL and try again.
              </p>
              <Link href="/" className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <svg className="w-8 h-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
      className={`w-16 h-16 ${filled ? 'text-yellow-500' : 'text-gray-300'} drop-shadow-lg`}
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

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with 5 stars */}
          <div className="text-center mb-20">
            <div className="flex justify-center space-x-3 mb-12">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="transform hover:scale-110 transition-transform duration-200">
                  <StarIcon filled={true} />
                </div>
              ))}
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-16 leading-tight tracking-tight">
              How to rate us on WordPress.org
            </h1>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-2xl px-16 py-8 rounded-2xl transition duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              Leave a 5 star review
            </a>
          </div>

          {/* Main content area */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Instructions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 hover:shadow-3xl transition-shadow duration-300">
              <div className="mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-3">Step 1</h2>
                <h3 className="text-2xl font-bold text-gray-700 mb-8">
                  Log in to WordPress.org
                </h3>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
                  <p className="text-gray-800 text-xl leading-relaxed">
                    <span className="inline-flex items-center font-black text-blue-700 text-lg mb-2">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                      Option 1:
                    </span>
                    <br />
                    Click on{' '}
                    <a
                      href={loginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 underline font-bold decoration-2 underline-offset-2"
                    >
                      this link
                    </a>{' '}
                    to access the log in page.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg">
                  <p className="text-gray-800 text-xl leading-relaxed">
                    <span className="inline-flex items-center font-black text-green-700 text-lg mb-2">
                      <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                      Option 2:
                    </span>
                    <br />
                    Click on the{' '}
                    <span className="font-black bg-gray-800 text-white px-3 py-1 rounded-lg">&ldquo;Log In&rdquo;</span> button in the top right-hand corner of the{' '}
                    <a
                      href={pluginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 underline font-bold decoration-2 underline-offset-2"
                    >
                      {plugin.name || 'plugin'} page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Plugin card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              {/* Plugin header */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-start space-x-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center border-3 border-white/40 shadow-xl">
                    <img
                      src={iconUrl}
                      alt={`${plugin.name || 'Plugin'} icon`}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = defaultIcon
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black mb-3 text-white drop-shadow-lg">
                      {plugin.name || 'Plugin Name'}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed font-medium">
                      {plugin.short_description || 'WordPress Plugin'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plugin stats */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200 shadow-lg">
                    <div className="text-3xl font-black text-blue-700 mb-1">{plugin.version || '1.0.0'}</div>
                    <div className="text-sm font-semibold text-blue-600">Version</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-200 shadow-lg">
                    <div className="text-3xl font-black text-green-700 mb-1">{(plugin.downloaded || 0).toLocaleString()}+</div>
                    <div className="text-sm font-semibold text-green-600">Downloads</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-2xl p-6 mb-8 text-center border-2 border-yellow-300 shadow-lg">
                  <div className="flex justify-center space-x-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-8 h-8 ${star <= Math.round((plugin.rating || 0) / 20) ? 'text-yellow-500 drop-shadow-md' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {plugin.num_ratings || 0} reviews
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-gray-900 text-2xl mb-6">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    <a href="#" className="block p-4 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 text-gray-700 hover:text-gray-900 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md font-semibold">
                      Support Threads
                    </a>
                    <a href="#" className="block p-4 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 text-gray-700 hover:text-gray-900 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md font-semibold">
                      Active Topics
                    </a>
                    <a href="#" className="block p-4 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 text-gray-700 hover:text-gray-900 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md font-semibold">
                      Unresolved Topics
                    </a>
                    <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 text-yellow-800 hover:text-yellow-900 transition-all duration-200 border-2 border-yellow-300 shadow-md hover:shadow-lg font-bold">
                      Reviews ⭐
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-20">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 text-blue-700 hover:text-blue-900 rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-200 shadow-xl hover:shadow-2xl font-black text-xl"
            >
              <svg className="w-10 h-10 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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