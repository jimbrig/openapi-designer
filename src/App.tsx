import React from 'react';
import { Book, Code, Send, FileText } from 'lucide-react';
import ApiSpecification from './components/ApiSpecification';
import LlmAssistant from './components/LlmAssistant';
import Header from './components/Header';
import RedocPreview from './components/RedocPreview';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6">
          <ApiSpecification />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 shadow-lg">
          <div className="mb-6">
            <LlmAssistant />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" size={20} />
              API Preview
            </h2>
            <RedocPreview />
          </div>
        </div>
      </main>
    </div>
  );
});

export default App;