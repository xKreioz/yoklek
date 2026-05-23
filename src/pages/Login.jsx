import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

function Login() {
  return (
    <div className="screen-container">
      <h2 className="title" style={{ marginTop: '4rem', marginBottom: '4rem' }}>Login</h2>
      
      <div className="form-group">
        <Input type="email" placeholder="Email adress" />
        <Input type="password" placeholder="Password" />
        <Link to="#" className="link link-right" style={{ fontSize: '0.7rem' }}>forgotten your password ?</Link>
      </div>

      <Button variant="secondary">Log in</Button>
    </div>
  );
}

export default Login;
