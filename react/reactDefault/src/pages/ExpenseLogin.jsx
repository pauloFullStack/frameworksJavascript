import { useExpenseContext } from '../context/ExpenseContext';
import { Link } from 'react-router-dom';

function ExpenseLogin() {
  const { handleTextChange, setData } = useExpenseContext();

  return (
    <div className="login">
      <div>
        <div className="div-login-title">
          <h3>ContExpense</h3>
        </div>
        <div className="div-login-input">
          <input type="text" id="user" onChange={handleTextChange} placeholder="Usuário" />
        </div>
        <div className="div-login-input">
          <input type="password" id="password" onChange={handleTextChange} placeholder="Senha" />
        </div>
        <div className="div-login-button">
          <Link to="/dashboard" className="btn btn-primary w-100-percent">Entrar</Link>
        </div>
        <div className="div-login-button">
          <Link to="/register" className="btn btn-link w-100-percent">Registrar</Link>
          <Link className="btn btn-link link-forgot-password">Esqueceu a
            senha ?</Link>
        </div>
      </div>
    </div>
  );
}

export default ExpenseLogin;
