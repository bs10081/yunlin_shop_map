import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">找不到頁面</h2>
        <p className="text-gray-600 mb-8">抱歉，您訪問的頁面不存在</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <i className="fas fa-home" aria-hidden="true"></i>
          <span>返回首頁</span>
        </Link>
      </div>
    </div>
  );
}
