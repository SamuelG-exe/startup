import { useState } from 'react'
import Header from './header.jsx';
import Footer from './footer.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {/* Your page content will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App
