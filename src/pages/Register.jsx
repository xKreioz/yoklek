import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Select } from '../components/Select';

function Register() {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="screen-container">
      <h2 className="title" style={{ marginTop: '2rem', marginBottom: '2rem' }}>Register</h2>

      <div className="form-group" style={{ marginBottom: '2rem' }}>
        <Input type="email" placeholder="Email adress" />
        <Input type="password" placeholder="Password" />

        <div className="row-group">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
        </div>

        <Input type="date" placeholder="Birth" />

        <Select defaultLabel="Gender" options={genderOptions} />

        <div className="row-group">
          <Input type="number" placeholder="Weight" />
          <Input type="number" placeholder="Height" />
        </div>
      </div>

      <Button variant="secondary">Sign in</Button>

      <Link to="/login" className="link" style={{ marginTop: '1.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
        Already Have an Account ?
      </Link>
    </div>
  );
}

export default Register;
