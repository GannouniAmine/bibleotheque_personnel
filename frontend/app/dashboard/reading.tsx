
export default function Reading(props: any) {
  const stats = [
    {
     
      title: "Books To Read",
      value: props.bookToread.length,
      color: "text-green-500",
      icon: <img title="image-Yes" src="/book.gif" className="w-20 h-20 text-green-500" />,
    },
    
    {
      title: "Books Reading",
      value: props.bookReading.length,
      color: "text-blue-500",
      icon: <img title="image-Yes" src="/bookfermer.gif" className="w-20 h-20 text-green-500" />,
    },
    {
      title: "Books Finished",
      value: props.bookFinished.length,
      color: "text-green-500",
      icon: <img title="image-Yes" src="/yes-check.gif" className="w-20 h-20 text-green-500" />,
    },
   
    {
      title: "Books Abandoned",
      value: props.bookAbandoned.length,
      color: "text-red-500",
      icon:  <img title="image-no" src="/false-no.gif" className="w-20 h-20 text-green-500" />,
    },
    
    {
      title: `Books Read in ${new Date().getFullYear()}`,
      value: props.booksLusCetteAnnee.length,
      color: "text-pink-500",
      icon: <img title="image-no" src="/heart.gif" className="w-20 h-20 text-green-500" />,
    },
    
    {
      title: "Most Preferred Genre",
      value: props.generePrefere,
      color: "text-yellow-500",
      icon:  <img title="image-no" src="/stargif.gif" className="w-20 h-20 text-green-500" />,
    },
    
    {
      title: "My Annual Goal",
      value: `${props.annulgoal.length} / 24`,
      color: "text-blue-500",
      icon: <img title="image-no" src="/target.gif" className="w-20 h-20 text-green-500" />,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100">
        My Reading Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="mb-4">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
              {stat.title}
            </h2>
            <p className={`text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
