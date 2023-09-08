import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
    const [adminEmail , setAdminEmail] = useState<string>('');
    const [adminPassword , setAdminPassword] = useState<string>('');

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <>
    <div className=" border-solid flex min-h-full flex-1 flex-col justify-center px-6 py-12 laptop:px-8">
        <div className="mobile:mx-auto mobile:w-full mobile:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="public/admin.jpg"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ADMIN LOGIN
          </h2>
        </div>

        <div className="border-2 rounded-md border-violet-950 p-5 bg-gray-300 mt-10 mobile:mx-auto mobile:w-full mobile:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-black border-gray-200">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={adminEmail}
                  name="email"
                  type="email"
                  onChange={(e) => setAdminEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-black border-gray-200">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={adminPassword}
                  name="password"
                  type="password"
                  onChange={(e) => setAdminPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an Account?
            <Link to='/register' className="font-semibold leading-6 text-violet-900 hover:text-indigo-500">
              Sign up
            </Link>
          </p> */}
        </div>
    </div>
    </>
  )
}

export default Adminlogin