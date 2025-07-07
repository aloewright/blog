import React, { useState, useCallback } from 'react';
import { Wand2, Brain, Sparkles, Lightbulb, FileText, Save, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface AIProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  available: boolean;
}

interface AIWritingAssistantProps {
  onContentGenerated?: (content: string) => void;
  onPromptSaved?: (prompt: string) => void;
  initialContent?: string;
  brandVoice?: any;
}

export const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({
  onContentGenerated,
  onPromptSaved,
  initialContent = '',
  brandVoice,
}) => {
  const [activeProvider, setActiveProvider] = useState<string>('claude');
  const [prompt, setPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [writingMode, setWritingMode] = useState<'create' | 'improve' | 'expand' | 'summarize'>('create');

  const providers: AIProvider[] = [
    {
      id: 'claude',
      name: 'Claude',
      icon: <Brain className="w-4 h-4" />,
      color: 'purple',
      available: true,
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'green',
      available: true,
    },
    {
      id: 'gemini',
      name: 'Gemini',
      icon: <Lightbulb className="w-4 h-4" />,
      color: 'blue',
      available: true,
    },
    {
      id: 'ollama',
      name: 'Ollama (Local)',
      icon: <FileText className="w-4 h-4" />,
      color: 'gray',
      available: false,
    },
  ];

  const writingModes = [
    { id: 'create', label: 'Create New', description: 'Generate new content from scratch' },
    { id: 'improve', label: 'Improve', description: 'Enhance existing content' },
    { id: 'expand', label: 'Expand', description: 'Add more details and depth' },
    { id: 'summarize', label: 'Summarize', description: 'Create a concise summary' },
  ];

  const promptTemplates = {
    create: [
      'Write a blog post about {{topic}} for {{audience}}',
      'Create an engaging introduction for an article about {{topic}}',
      'Generate a listicle of {{number}} tips for {{topic}}',
    ],
    improve: [
      'Improve the clarity and flow of this text',
      'Make this content more engaging and conversational',
      'Add more specific examples and data to support the points',
    ],
    expand: [
      'Expand on the following points with more detail',
      'Add relevant statistics and research findings',
      'Include real-world examples and case studies',
    ],
    summarize: [
      'Create a brief summary of the key points',
      'Write a compelling meta description',
      'Extract the main takeaways in bullet points',
    ],
  };

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = `# Generated Content\n\nThis is a sample AI-generated content based on your prompt:\n\n"${prompt}"\n\n## Key Points\n\n- Point 1: Lorem ipsum dolor sit amet\n- Point 2: Consectetur adipiscing elit\n- Point 3: Sed do eiusmod tempor incididunt\n\n## Conclusion\n\nThis content was generated using ${providers.find(p => p.id === activeProvider)?.name}.`;
      
      setGeneratedContent(mockContent);
      onContentGenerated?.(mockContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, activeProvider, onContentGenerated, providers]);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-500" />
          AI Writing Assistant
        </h3>
        
        {/* AI Provider Selector */}
        <div className="flex gap-2">
          {providers.map(provider => (
            <button
              key={provider.id}
              onClick={() => setActiveProvider(provider.id)}
              disabled={!provider.available}
              className={`p-2 rounded-lg transition-colors ${
                activeProvider === provider.id
                  ? `bg-${provider.color}-100 text-${provider.color}-700 border-2 border-${provider.color}-300`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${!provider.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={provider.name}
            >
              {provider.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Writing Mode Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Writing Mode
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {writingModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => setWritingMode(mode.id as any)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                writingMode === mode.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{mode.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {mode.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* System Prompt (Brand Voice) */}
      {brandVoice && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Brand Voice: {brandVoice.name}
          </label>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
            <p className="text-gray-600 dark:text-gray-400">{brandVoice.description}</p>
          </div>
        </div>
      )}

      {/* Custom System Prompt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          System Prompt (Optional)
        </label>
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Add specific instructions for the AI (tone, style, format, etc.)"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Prompt Templates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2">
          {promptTemplates[writingMode].map((template, index) => (
            <button
              key={index}
              onClick={() => setPrompt(template)}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      {/* Main Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Prompt
        </label>
        <div className="space-y-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want the AI to write..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
          />
          
          {/* Context Input */}
          {writingMode !== 'create' && initialContent && (
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Working with existing content ({initialContent.length} characters)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleGenerate}
          disabled={!prompt || isGenerating}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin mr-2">⚡</span>
              Generating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => onPromptSaved?.(prompt)}
          disabled={!prompt}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Prompt
        </Button>
      </div>

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium mb-3">Generated Content</h4>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                onContentGenerated?.(generatedContent);
              }}
            >
              Use This Content
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGeneratedContent('')}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
