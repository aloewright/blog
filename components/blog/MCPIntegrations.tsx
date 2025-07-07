import React, { useState } from 'react';
import { Settings, Play, Pause, AlertCircle, CheckCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface MCPIntegration {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  serverUrl: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  capabilities?: string[];
  lastSync?: string;
}

interface MCPIntegrationsProps {
  integrations: MCPIntegration[];
  onToggle?: (id: string, enabled: boolean) => void;
  onAdd?: (integration: Partial<MCPIntegration>) => void;
  onRemove?: (id: string) => void;
  onSync?: (id: string) => void;
}

export const MCPIntegrations: React.FC<MCPIntegrationsProps> = ({
  integrations,
  onToggle,
  onAdd,
  onRemove,
  onSync,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIntegration, setNewIntegration] = useState<Partial<MCPIntegration>>({
    name: '',
    serverUrl: '',
    description: '',
  });

  const getStatusIcon = (status: MCPIntegration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: MCPIntegration['status']) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      case 'pending':
        return 'Connecting...';
      default:
        return 'Disconnected';
    }
  };

  const handleAdd = () => {
    if (newIntegration.name && newIntegration.serverUrl) {
      onAdd?.({
        ...newIntegration,
        enabled: true,
        status: 'pending',
      });
      setNewIntegration({ name: '', serverUrl: '', description: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            MCP Integrations
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage Model Context Protocol integrations for enhanced AI capabilities
          </p>
        </div>
        
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Add Integration Form */}
      {showAddForm && (
        <Card className="p-6 border-2 border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Add New MCP Integration
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Integration Name
              </label>
              <Input
                value={newIntegration.name || ''}
                onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                placeholder="e.g., Semantic Scholar API"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Server URL
              </label>
              <Input
                value={newIntegration.serverUrl || ''}
                onChange={(e) => setNewIntegration({ ...newIntegration, serverUrl: e.target.value })}
                placeholder="https://api.example.com/mcp"
                type="url"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={newIntegration.description || ''}
                onChange={(e) => setNewIntegration({ ...newIntegration, description: e.target.value })}
                placeholder="Describe what this integration does..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleAdd} size="sm">
                Add Integration
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setNewIntegration({ name: '', serverUrl: '', description: '' });
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Integrations List */}
      <div className="space-y-4">
        {integrations.length === 0 ? (
          <Card className="p-8 text-center">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No MCP integrations configured yet.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Add integrations to enhance your AI writing capabilities.
            </p>
          </Card>
        ) : (
          integrations.map(integration => (
            <Card key={integration.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(integration.status)}
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${integration.status === 'connected' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : integration.status === 'error'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : integration.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }
                    `}>
                      {getStatusText(integration.status)}
                    </span>
                  </div>
                  
                  {integration.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {integration.description}
                    </p>
                  )}
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Server:</span>
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {integration.serverUrl}
                      </code>
                    </div>
                    
                    {integration.capabilities && integration.capabilities.length > 0 && (
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Capabilities:</span>
                        <div className="flex flex-wrap gap-1">
                          {integration.capabilities.map((cap, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {integration.lastSync && (
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Last sync:</span>
                        <span>{integration.lastSync}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-6">
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={(checked) => onToggle?.(integration.id, checked)}
                  />
                  
                  <div className="flex gap-1">
                    <Button
                      onClick={() => onSync?.(integration.id)}
                      variant="outline"
                      size="sm"
                      disabled={!integration.enabled || integration.status === 'pending'}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => onRemove?.(integration.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Usage Instructions */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          About MCP Integrations
        </h4>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• MCP (Model Context Protocol) allows AI models to access external tools and data sources</li>
          <li>• Integrations can provide real-time data, perform searches, and execute actions</li>
          <li>• Each integration runs on a separate server and communicates via the MCP protocol</li>
          <li>• Enable integrations to give your AI writing assistant access to specialized capabilities</li>
        </ul>
      </Card>
    </div>
  );
};
