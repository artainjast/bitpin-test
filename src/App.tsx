import { Suspense } from 'react';
import './App.css';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './components/layout/AppRouter';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback>
        <RouterProvider router={appRouter} />
        <ToastContainer />
      </Suspense>
    </ErrorBoundary>

  )
}

export default App;
