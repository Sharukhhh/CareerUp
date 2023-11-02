

const Section = () => {
  return (
    <>
    <div className="bg-teal-200 text-gray-800 mx-auto max-w-6xl rounded-xl shadow-lg shadow-gray-300 mb-12 py-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center">
        <div className="sm:w-1/2 p-4">
          <img
            src="/hero.png"
            alt=""
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="sm:w-1/2 p-4 leading-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Recruit Top Talent:</h2>
          <p className="text-lg">Streamline your recruitment process and find the best candidates for your team.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Section