import React from 'react';
import { Book } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center">
        <Book className="mr-2" size={24} />
        <h1 className="text-2xl font-bold">OpenAPI Designer with LLM</h1>
      </div>
    </header>
  );
};

export default Header;