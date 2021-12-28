import form from './form.css';

const Form = () => {
  const handelSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  return (
    <form onSubmit={handelSubmit} className='formContainer'>
      <label className='labelContainer'>
        <h1>Sign up</h1>
        <h4>Username</h4>
        <input type='text' name='username' />
        <h4>Email</h4>
        <input type='email' name='email' />
        <h4>Password</h4>
        <input type='password' name='password' />
        <h4>Confirm password</h4>
        <input type='password' name='confirmpassword' />
      </label>
      <input type='submit' value='Continue' className='submitBtn' />

      <div className='iconBar'>
        <div className='icons'>
          <i className='fab fa-facebook-f'></i>
        </div>
        <div className='icons'>
          <i className='fab fa-twitter'></i>
        </div>
        <div className='icons'>
          <i className='fab fa-google'></i>
        </div>
      </div>
      <div className='login'>
        <h3>
          Already have an account? <a href='/login'>Login</a>
        </h3>
      </div>
    </form>
  );
};

export default Form;
