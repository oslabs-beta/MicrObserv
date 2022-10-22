import React, { useState } from 'react';

export default function Login() {
  //state for grabbing user information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('email: ', email);
  console.log('password: ', password);

  //function to grab input value and change state
  function handleChange(event: any) {
    console.log(event.target);
    if (event.target.type === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.type === 'password') {
      setPassword(event.target.value);
    }
  }
  //sending data to server
  function handleSubmit(event: any) {}

  return <div>Login</div>;
}
