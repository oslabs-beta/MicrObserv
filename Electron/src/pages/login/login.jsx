import React, { useState } from 'react';

export default function Login() {
  //state for grabbing user information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('email: ', email);
  console.log('password: ', password);

  //function to grab input value and change state
  function handleChange(event) {
    console.log(event.target);
    if (event.target.type === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.type === 'password') {
      setPassword(event.target.value);
    }
  }
  //sending data to server
  function handleSubmit(event) {}

  return (
    <section class='bg-gray-50 dark:bg-gray-900'>
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          class='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          {/* <img
            class='w-8 h-8 mr-2'
            src='../images/laser-eyes1.png'
            alt='logo'
          /> */}
          MicrObserv
        </a>
        <div class='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form class='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  for='email'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type='email'
                  name='email'
                  id='email'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='maddie@gmail.com'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <div class='flex items-center justify-between'>
                <div class='flex items-start'>
                  <div class='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      class='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div class='ml-3 text-sm'>
                    <label
                      for='remember'
                      class='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href='#'
                  class='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'
              >
                Login
              </button>

              <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?
                <a
                  href='#'
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
