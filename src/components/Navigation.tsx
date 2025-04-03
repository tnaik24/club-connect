import Link from 'next/link'

const Navigation = () => {
  return (
    <div className="flex space-x-4">
      <Link
        href="/matches"
        className="text-gray-700 dark:text-gray-300 hover:text-bryant-blue dark:hover:text-bryant-blue-light"
      >
        Matches
      </Link>
      <Link
        href="/preferences"
        className="text-gray-700 dark:text-gray-300 hover:text-bryant-blue dark:hover:text-bryant-blue-light"
      >
        Preferences
      </Link>
    </div>
  )
}

export default Navigation 