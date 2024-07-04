import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const RepositoryDetails = lazy(() => import('./pages/RepositoryDetails'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repository/:id" element={<RepositoryDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
