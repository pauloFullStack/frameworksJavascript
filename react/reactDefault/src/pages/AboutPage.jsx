import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>Sobre este projeto</h1>
        <p>
          Este é um aplicativo React para deixar feedback sobre um produto ou
          serviço
        </p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/">Voltar ao Início</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
