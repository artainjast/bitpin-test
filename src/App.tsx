import { Suspense } from 'react';
import './App.css';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './components/layout/AppRouter';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback>
        <RouterProvider router={appRouter} />
      </Suspense>
    </ErrorBoundary>

  )
}

export default App;
