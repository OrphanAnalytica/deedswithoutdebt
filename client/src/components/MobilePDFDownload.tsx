import { useState } from "react";

interface MobilePDFDownloadProps {
  className?: string;
  children: React.ReactNode;
}

export default function MobilePDFDownload({ className, children }: MobilePDFDownloadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    
    try {
      // Simple approach: just open the file in a new tab
      const newWindow = window.open('/downloads/DWD_Property_Red_Flags_Checklist.html', '_blank');
      
      if (newWindow) {
        setIsLoading(false);
        
        // Show instructions after a short delay
        setTimeout(() => {
          alert('Checklist opened! To save as PDF:\n\n1. Use Ctrl+P (Cmd+P on Mac)\n2. Select "Save as PDF" as destination\n3. Save the file\n\nOr use the direct link below if needed.');
        }, 500);
      } else {
        setIsLoading(false);
        alert('Popup blocked! Please allow popups for this site or use the direct link below.');
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
      setIsLoading(false);
      alert('Unable to load checklist. Please try the direct link below or contact support.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? 'Opening...' : children}
    </button>
  );
}