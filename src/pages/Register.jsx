import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '',
    birthDate: '', gender: '', weight: '', height: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        ...form,
        weight: form.weight ? Number(form.weight) : undefined,
        height: form.height ? Number(form.height) : undefined,
      });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-container">
      <h2 className="title" style={{ marginTop: '2rem', marginBottom: '2rem' }}>Register</h2>

      <form className="form-group" style={{ marginBottom: '2rem' }} onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email address" value={form.email} onChange={set('email')} />
        <Input type="password" placeholder="Password" value={form.password} onChange={set('password')} />

        <div className="row-group">
          <Input type="text" placeholder="First Name" value={form.firstName} onChange={set('firstName')} />
          <Input type="text" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} />
        </div>

        <Input type="date" placeholder="Birth" value={form.birthDate} onChange={set('birthDate')} />

        <Select
          defaultLabel="Gender"
          options={genderOptions}
          value={form.gender}
          onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
        />

        <div className="row-group">
          <Input type="number" placeholder="Weight (kg)" value={form.weight} onChange={set('weight')} />
          <Input type="number" placeholder="Height (cm)" value={form.height} onChange={set('height')} />
        </div>

        {error && (
          <p style={{ color: '#e53e3e', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>
        )}

        <Button variant="secondary" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign in'}
        </Button>
      </form>

      <Link to="/login" className="link" style={{ marginTop: '1.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
        Already Have an Account?
      </Link>
    </div>
  );
}

export default Register;
