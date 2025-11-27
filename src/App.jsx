import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { RepositoryPage } from './pages/RepositoryPage';
import { PullRequestPage } from './pages/PullRequestPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="repositories/:owner/:repo"
            element={
              <ProtectedRoute>
                <RepositoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="repositories/:owner/:repo/pulls/:number"
            element={
              <ProtectedRoute>
                <PullRequestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
