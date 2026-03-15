// Build a ContactForm component with:
// - Two inputs: name and email (both controlled by useState)
// - A submit button
// - On submit: prevent default, log the values, clear both inputs
// - Disable the submit button if either field is empty
// - Type everything including the event parameter in onSubmit

import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");


  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, name)
        setEmail("")
        setName("")

  };

  return (
    <>
      <p>Contact Form</p>
      <form  onSubmit={submitHandler}>

     
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <input
        value={email}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <button disabled ={name.trim() === "" || email.trim() === ""} type="submit">Submit Form</button>
       </form>
    </>
  );
};

export default ContactForm;
