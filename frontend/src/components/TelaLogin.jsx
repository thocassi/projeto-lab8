import { useNavigate } from 'react-router-dom';

export default function TelaLogin() {
  const navigate = useNavigate();

  const processarLogin = async (e) => {
    e.preventDefault();
    
    // ... Aqui fica a sua lógica de requisição (Axios ou Fetch) ...
    
    // Salva o token no navegador
    localStorage.setItem('jwt_token', tokenRecebido);
    
    // Redireciona o usuário para o Dashboard
    navigate('/dashboard');
  };

  return (
    // Seu formulário de Login aqui
    <div>
      {/* ... */}
    </div>
  );
}