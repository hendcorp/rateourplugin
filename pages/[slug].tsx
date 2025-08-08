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
  ratings: {
    1: number
    2: number
    3: number
    4: number
    5: number
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
  
  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (typeof window !== 'undefined') {
      const textarea = document.createElement('textarea')
      textarea.innerHTML = text
      return textarea.value
    } else {
      // Server-side fallback
      return text
        .replace(/&#8211;/g, '–')
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
    }
  }

  // Safe access to plugin icons with fallback - WordPress.org style default icon
  const defaultIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iOCIgZmlsbD0iIzIzMjgyZCIvPgo8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI0NCIgZmlsbD0iIzM3NGE1NSIvPgo8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSIzMiIgZmlsbD0iIzQ5NWY2YyIvPgo8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSIyMCIgZmlsbD0iIzVjNzM4MSIvPgo8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSIxMCIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4='
  
  // Check if plugin has icons, otherwise try to construct the icon URL
  let iconUrl = defaultIcon
  if (plugin.icons && typeof plugin.icons === 'object') {
    iconUrl = plugin.icons['2x'] || plugin.icons['1x'] || plugin.icons.default || defaultIcon
  } else {
    // API doesn't provide icons, try to construct based on plugin slug
    // Special handling for known plugins
    if (slug === 'wp-rss-aggregator') {
      iconUrl = 'https://ps.w.org/wp-rss-aggregator/assets/icon-128x128.gif?rev=3157091'
    } else {
      // For other plugins, try the common icon URL pattern
      iconUrl = `https://ps.w.org/${slug}/assets/icon-128x128.png`
    }
  }
  
  console.log('Using icon URL:', iconUrl === defaultIcon ? 'default icon' : iconUrl)

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
        <title>{`How to rate ${decodeHtmlEntities(plugin.name || 'this plugin')} on WordPress.org`}</title>
        <meta name="description" content={`Learn how to leave a 5-star review for ${decodeHtmlEntities(plugin.name || 'this plugin')} on WordPress.org`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with 5 stars */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-6 h-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight">
              How to rate us on WordPress.org
            </h1>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-3.5 rounded-lg transition-colors duration-200"
            >
              Leave a 5 star review
            </a>
          </div>

          {/* Main content area */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Instructions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-10 hover:shadow-3xl transition-shadow duration-300">
              <div className="mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-8">
                  Log in to WordPress.org
                </h3>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
                  <p className="text-gray-800 text-base leading-relaxed">
                    <span className="inline-flex items-center font-black text-blue-700 text-base mb-2">
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
                  <p className="text-gray-800 text-base leading-relaxed">
                    <span className="inline-flex items-center font-black text-green-700 text-base mb-2">
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
                      {decodeHtmlEntities(plugin.name || 'plugin')} page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - WordPress.org-style Plugin Review Interface */}
            <div className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
              {/* Plugin Banner */}
              {(plugin.banners?.high || plugin.banners?.low) && (
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={plugin.banners.high || plugin.banners.low}
                    alt={`${plugin.name || 'Plugin'} banner`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
              )}

              {/* Plugin header - WordPress.org style */}
              <div className="bg-white p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                    <img
                      src={iconUrl}
                      alt={`${plugin.name || 'Plugin'} icon`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        // If the specific icon fails, try alternative formats
                        if (target.src !== defaultIcon) {
                          if (slug === 'wp-rss-aggregator' && !target.src.includes('gif')) {
                            // Try the .gif version first for wp-rss-aggregator
                            target.src = 'https://ps.w.org/wp-rss-aggregator/assets/icon-128x128.gif?rev=3157091'
                          } else if (!target.src.includes('.png') && slug !== 'wp-rss-aggregator') {
                            // Try .png version for other plugins
                            target.src = `https://ps.w.org/${slug}/assets/icon-128x128.png`
                          } else {
                            // Fall back to default icon
                            target.src = defaultIcon
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900 leading-tight mb-2">
                      {decodeHtmlEntities(plugin.name || 'Plugin Name')}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= Math.round((plugin.rating || 0) / 20) ? 'text-orange-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {((plugin.rating || 0) / 20).toFixed(1)} out of 5 stars
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mt-20">
            {/* Left side - Step 2 Instructions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-10 hover:shadow-3xl transition-shadow duration-300">
              <div className="mb-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200 shadow-lg">
                <p className="text-gray-800 text-base leading-relaxed">
                  You should be redirected back to the {decodeHtmlEntities(plugin.name || 'plugin')} review page.
                </p>
                <br />
                <p className="text-gray-800 text-base leading-relaxed">
                  Here, click on the{' '}
                  <span className="font-black bg-blue-600 text-white px-3 py-1 rounded-lg">&ldquo;Add your own review&rdquo;</span>{' '}
                  button or scroll down to the bottom of the page.
                </p>
              </div>
            </div>

            {/* Right side - WordPress.org Reviews Page */}
            <div className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 h-full">
                {/* Main Content Area */}
                <div className="col-span-3">
                  {/* Page Header */}
                  <div className="border-b border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h1 className="text-xl text-gray-900">
                        [{decodeHtmlEntities(plugin.name || 'Plugin Name')}] Reviews
                      </h1>
                    </div>
                  </div>

                  {/* Average Rating Section */}
                  <div className="border-b border-gray-200 p-4">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">Average Rating</h2>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= Math.round((plugin.rating || 0) / 20) ? 'text-orange-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-700 text-sm">
                        {((plugin.rating || 0) / 20).toFixed(1)} out of 5 stars.
                      </span>
                    </div>
                    
                                         <div className="flex items-center space-x-3">
                       <a
                         href={reviewUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                       >
                         Add your own review
                       </a>
                       <div className="text-red-500">
                         <svg className="w-16 h-12 wiggle-arrow" fill="none" stroke="currentColor" viewBox="0 0 32 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6l-8 6m0 0l8 6m-8-6h24" />
                         </svg>
                       </div>
                     </div>

                    {/* Reviews Breakdown */}
                    <div className="mt-6">
                                             <h3 className="text-base font-semibold text-gray-900 mb-3">{plugin.num_ratings || 0} reviews</h3>
                      
                                             <div className="space-y-1">
                         {[
                           { stars: 5, count: plugin.ratings?.[5] || 0, color: 'bg-red-500' },
                           { stars: 4, count: plugin.ratings?.[4] || 0, color: 'bg-orange-400' },
                           { stars: 3, count: plugin.ratings?.[3] || 0, color: 'bg-yellow-400' },
                           { stars: 2, count: plugin.ratings?.[2] || 0, color: 'bg-yellow-300' },
                           { stars: 1, count: plugin.ratings?.[1] || 0, color: 'bg-red-400' }
                         ].map((rating) => (
                           <div key={rating.stars} className="flex items-center space-x-2 text-sm">
                             <a href="#" className="text-blue-600 hover:underline min-w-12">
                               {rating.stars} stars
                             </a>
                             <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                               <div 
                                 className={`${rating.color} h-2 rounded-full`}
                                 style={{ width: `${((rating.count / (plugin.num_ratings || 1)) * 100).toFixed(1)}%` }}
                               ></div>
                             </div>
                             <a href="#" className="text-blue-600 hover:underline w-8 text-right">
                               {rating.count}
                             </a>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>

                  {/* Search Forum */}
                  <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Search this forum"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled
                      />
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-1 bg-gray-50 border-l border-gray-200 p-4">
                  <div className="flex flex-col mb-3">
                    <div className="w-full aspect-square rounded overflow-hidden bg-white border border-gray-300 mb-3">
                      <img
                        src={iconUrl}
                        alt={`${plugin.name || 'Plugin'} icon`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          if (target.src !== defaultIcon) {
                            if (slug === 'wp-rss-aggregator' && !target.src.includes('gif')) {
                              target.src = 'https://ps.w.org/wp-rss-aggregator/assets/icon-128x128.gif?rev=3157091'
                            } else if (!target.src.includes('.png') && slug !== 'wp-rss-aggregator') {
                              target.src = `https://ps.w.org/${slug}/assets/icon-128x128.png`
                            } else {
                              target.src = defaultIcon
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-blue-600 hover:underline cursor-pointer mb-2">
                        {decodeHtmlEntities(plugin.name || 'Plugin Name')}
                      </h3>
                    </div>
                    
                    <div className="text-xs">
                      <a href="#" className="block text-blue-600 hover:underline py-2 border-b border-gray-300">Frequently Asked Questions</a>
                      <a href="#" className="block text-blue-600 hover:underline py-2 border-b border-gray-300">Support Threads</a>
                      <a href="#" className="block text-blue-600 hover:underline py-2 border-b border-gray-300">Active Topics</a>
                      <a href="#" className="block text-blue-600 hover:underline py-2 border-b border-gray-300">Unresolved Topics</a>
                      <a href="#" className="block text-blue-600 hover:underline py-2 border-b border-gray-300 font-medium">Reviews</a>
                      <a href="#" className="block text-blue-600 hover:underline py-2">Add Review</a>
                    </div>
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
    console.log('Plugin banners:', plugin?.banners)
    
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