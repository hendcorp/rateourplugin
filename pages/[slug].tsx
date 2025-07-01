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
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Plugin Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find a plugin with the slug &ldquo;{slug}&rdquo;. Please check the URL and try again.
            </p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
              Go Back
            </Link>
          </div>
        </main>
      </>
    )
  }

  const pluginUrl = `https://wordpress.org/plugins/${slug}/`
  const reviewUrl = `https://wordpress.org/support/plugin/${slug}/reviews/`
  const loginUrl = 'https://login.wordpress.org/'
  
  const iconUrl = plugin.icons['2x'] || plugin.icons['1x'] || plugin.icons.default || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzMzNzNkYyIvPgo8cGF0aCBkPSJNMjQgMjBoMTZ2NGgtMTZ2LTR6bTAgOGgxNnY0aC0xNnYtNHptMCA4aDE2djRoLTE2di00eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
      className={`w-8 h-8 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  return (
    <>
      <Head>
        <title>How to rate {plugin.name} on WordPress.org</title>
        <meta name="description" content={`Learn how to leave a 5-star review for ${plugin.name} on WordPress.org`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with 5 stars */}
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={true} />
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to rate us on WordPress.org
            </h1>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
            >
              Leave a 5 star review
            </a>
          </div>

          {/* Main content area */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left side - Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Log in to WordPress.org
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Option 1:</span> Click on{' '}
                    <a
                      href={loginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      this link
                    </a>{' '}
                    to access the log in page.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Option 2:</span> Click on the{' '}
                    <span className="font-semibold">&ldquo;Log In&rdquo;</span> button in the top right-hand corner of the{' '}
                    <a
                      href={pluginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {plugin.name} page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Plugin card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={iconUrl}
                    alt={`${plugin.name} icon`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzMzNzNkYyIvPgo8cGF0aCBkPSJNMjQgMjBoMTZ2NGgtMTZ2LTR6bTAgOGgxNnY0aC0xNnYtNHptMCA4aDE2djRoLTE2di00eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plugin.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {plugin.short_description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-semibold">{plugin.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Downloads:</span>
                  <span className="font-semibold">{plugin.downloaded.toLocaleString()}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= Math.round(plugin.rating / 20)} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({plugin.num_ratings} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800">Support Threads</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800">Active Topics</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800">Unresolved Topics</a>
                  </li>
                  <li>
                    <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Generate another review guide
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
    const response = await fetch(
      `https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=${slug}`
    )
    
    if (!response.ok) {
      throw new Error('Plugin not found')
    }
    
    const plugin = await response.json()

    // WordPress API returns the plugin data directly
    return {
      props: {
        plugin,
        slug
      }
    }
  } catch (error) {
    console.error('Error fetching plugin data:', error)
    return {
      props: {
        plugin: null,
        slug
      }
    }
  }
} 