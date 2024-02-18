import { useExpenseContext } from '../context/ExpenseContext';
import ToGoBack  from '../components/ToGoBack';

function ExpenseRegister() {
  const { handleTextChange } = useExpenseContext();

  return (
    <>
      <ToGoBack routeHost="/" />
      <div className="rem-p-20">
        <div className="row">
          <div className="col-lg-6 mx-auto flex-default-column">

            <div className="w-100-percent register">
              <input type="text" id="name" onChange={handleTextChange} className="w-100-percent" placeholder="Nome" />
            </div>
            <div className="w-100-percent register">
              <input type="email" id="email" onChange={handleTextChange} className="w-100-percent" placeholder="Email" />
            </div>
            <div className="w-100-percent register">
              <input type="text" id="user" onChange={handleTextChange} className="w-100-percent" placeholder="Criar Usuário" />
            </div>
            <div className="w-100-percent register">
              <input type="password" id="password" onChange={handleTextChange} className="w-100-percent" placeholder="Nova Senha" />
            </div>
            <div className="w-100-percent register">
              <input type="password" id="passwordRepeat" onChange={handleTextChange} className="w-100-percent" placeholder="Repetir Senha" />
            </div>
            <div className="w-100-percent">
              <button className="btn btn-primary w-100-percent">Registrar</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ExpenseRegister;
