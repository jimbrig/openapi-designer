import React from 'react';
import { Code } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';

const ApiSpecification = observer(() => {
  const apiStore = useApiStore();

  const handleChange = (e) => {
    try {
      const updatedSpec = JSON.parse(e.target.value);
      apiStore.updateApiSpec(updatedSpec);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Code className="mr-2" size={20} />
        API Specification
      </h2>
      <textarea
        className="w-full h-[calc(100vh-200px)] p-4 font-mono text-sm border rounded"
        value={JSON.stringify(apiStore.apiSpec, null, 2)}
        onChange={handleChange}
      />
    </div>
  );
});

export default ApiSpecification;