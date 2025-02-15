import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface InstallationStepsProps {
  keyId: string;
}

const InstallationSteps: React.FC<InstallationStepsProps> = ({ keyId }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }).catch(err => console.error("Failed to copy:", err));
  };

  const CopyButton: React.FC<{ text: string; id: string }> = ({ text, id }) => (
    <button 
      onClick={() => copyToClipboard(text, id)}
      className="ml-2 p-1 rounded hover:bg-gray-700 transition-colors"
    >
      {copiedStates[id] ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );

  return (
    <div className="bg-[#2e2f3e] rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Installation & Usage</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Your Key ID</h3>
          <div className="bg-[#1e1f2e] p-4 rounded-lg flex items-center">
            <code>{keyId}</code>
            <CopyButton text={keyId} id="keyId" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">1. Install Package</h3>
          <div className="bg-[#1e1f2e] p-4 rounded-lg flex items-center">
            <code>npm install analytic</code>
            <CopyButton text="npm install analytic" id="install" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">2. Import Package</h3>
          <div className="bg-[#1e1f2e] p-4 rounded-lg flex items-center">
            <code>import {'{ Analytics }'} from 'analytic';</code>
            <CopyButton text="import { Analytics } from 'analytic';" id="import" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">3. Initialize Analytics in your react project root</h3>
          <div className="bg-[#1e1f2e] p-4 rounded-lg flex items-center">
            <code>{`const analytics = new Analytics('${keyId}');`}</code>
            <CopyButton text={`const analytics = new Analytics('${keyId}');`} id="init" />
          </div>
        </div>

        

        <div className="text-center text-lg font-medium pt-4">
          Enjoy watching your website grow! 🚀
        </div>
      </div>
    </div>
  );
};

export default InstallationSteps;