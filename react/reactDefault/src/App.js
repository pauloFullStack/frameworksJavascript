import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ExpenseLogin from './pages/ExpenseLogin';
import ExpenseRegister from './pages/ExpenseRegister';
import ExpenseDashboard from './pages/ExpenseDashboard';
import { ExepnseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExepnseProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <ExpenseLogin />
                  {/* <FeedbackStats />
                  <FeedbackList />
                  <AboutIconLink /> */}
                </>
              }
            />
            <Route path="/register" element={<ExpenseRegister />} />
            <Route path="/dashboard" element={<ExpenseDashboard />} />
          </Routes>
        </div>
      </Router>
    </ExepnseProvider>
  );
}

export default App;
