import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const processarLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      // Requisição apontando para o seu backend no Render
      const response = await fetch('https://backend-lab8-hpx3.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha no login');
      }

      // Salva o token retornado pelo backend
      localStorage.setItem('jwt_token', data.token || 'token_valido_teste');
      
      // Redireciona para o Dashboard
      navigate('/dashboard');
    } catch (err) {
      setErro(err.message || 'Erro ao conectar com o servidor');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login - Sistema Acadêmico</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      <form onSubmit={processarLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Senha:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}