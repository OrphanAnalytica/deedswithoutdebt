import React from 'react';

interface ProTipProps {
  children: React.ReactNode;
  title?: string;
}

export const ProTip = ({ children, title = "Pro Tip" }: ProTipProps) => (
  <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-5 my-6 text-green-900">
    <strong className="block mb-1 font-semibold">💡 {title}:</strong>
    <div className="text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

interface ExampleBoxProps {
  children: React.ReactNode;
  title?: string;
}

export const ExampleBox = ({ children, title = "Example" }: ExampleBoxProps) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 my-6 text-blue-900">
    <strong className="block mb-1 font-semibold">📘 {title}:</strong>
    <div className="text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

interface WarningBoxProps {
  children: React.ReactNode;
  title?: string;
}

export const WarningBox = ({ children, title = "Warning" }: WarningBoxProps) => (
  <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5 my-6 text-red-900">
    <strong className="block mb-1 font-semibold">⚠️ {title}:</strong>
    <div className="text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

interface InfoBoxProps {
  children: React.ReactNode;
  title?: string;
}

export const InfoBox = ({ children, title = "Info" }: InfoBoxProps) => (
  <div className="bg-gray-50 border-l-4 border-gray-500 rounded-lg p-5 my-6 text-gray-900">
    <strong className="block mb-1 font-semibold">ℹ️ {title}:</strong>
    <div className="text-sm leading-relaxed">
      {children}
    </div>
  </div>
);
