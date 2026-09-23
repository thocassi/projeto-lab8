import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const buscarAlunos = async () => {
      try {
        const response = await fetch('https://backend-lab8-hpx3.onrender.com/alunos');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Erro ao buscar lista de alunos');
        }

        setAlunos(data);
      } catch (err) {
        setErro(err.message);
      }
    };

    buscarAlunos();
  }, []);

  const handleSair = () => {
    localStorage.removeItem('jwt_token');
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Painel do Aluno</h2>
        <button onClick={handleSair} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Sair
        </button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <h3>Alunos Cadastrados:</h3>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula} ({aluno.curso})
          </li>
        ))}
      </ul>
    </div>
  );
}