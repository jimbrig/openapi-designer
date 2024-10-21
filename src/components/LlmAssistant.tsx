import React, { useState } from 'react';
import { Send } from 'lucide-react';
import OpenAI from 'openai';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const LlmAssistant = observer(() => {
  const apiStore = useApiStore();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert API designer assistant. Help the user design their OpenAPI specification. When suggesting changes, provide the full updated JSON structure for the relevant part of the specification." },
          { role: "user", content: `Given this API specification: ${JSON.stringify(apiStore.apiSpec, null, 2)}\n\nUser question: ${prompt}` }
        ],
      });

      const assistantResponse = completion.choices[0].message.content;
      setResponse(assistantResponse);

      // Try to extract and apply JSON changes from the assistant's response
      const jsonRegex = /{[\s\S]*}/;
      const match = assistantResponse.match(jsonRegex);
      if (match) {
        try {
          const suggestedChanges = JSON.parse(match[0]);
          apiStore.updateApiSpec({ ...apiStore.apiSpec, ...suggestedChanges });
        } catch (error) {
          console.error('Failed to parse or apply suggested changes:', error);
        }
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setResponse('An error occurred while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Send className="mr-2" size={20} />
        LLM Assistant
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask the LLM for help with your API design..."
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Processing...' : 'Send'}
        </button>
      </form>
      {response && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">LLM Response:</h3>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
});

export default LlmAssistant;