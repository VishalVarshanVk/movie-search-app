import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Link to="/" className="text-2xl font-bold">
          Movie Search App
        </Link>
      </div>
    </nav>
  );
}

export default Navbar; 