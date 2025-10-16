import { useState } from "react";

interface PDFDownloadButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function PDFDownloadButton({ className, children }: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    
    try {
      // Open the HTML file in a new tab
      const newWindow = window.open('/downloads/DWD_Property_Red_Flags_Checklist.html', '_blank');
      
      if (newWindow) {
        // Check if the window loaded successfully
        const checkLoad = setInterval(() => {
          try {
            // If we can access the document, it loaded successfully
            if (newWindow.document && newWindow.document.readyState === 'complete') {
              clearInterval(checkLoad);
              setIsLoading(false);
              
              // Try to trigger print dialog after a short delay
              setTimeout(() => {
                try {
                  newWindow.print();
                } catch (printError) {
                  console.log('Print dialog blocked or not available');
                  // Show user-friendly message
                  alert('Checklist opened! Use your browser\'s print function (Ctrl+P / Cmd+P) and select "Save as PDF" to download.');
                }
              }, 1000);
            }
          } catch (error) {
            // Cross-origin or other error - window might be blocked
            console.log('Cannot access window content, likely blocked by popup blocker');
          }
        }, 100);
        
        // Fallback timeout
        setTimeout(() => {
          clearInterval(checkLoad);
          setIsLoading(false);
        }, 5000);
        
      } else {
        // Popup blocked - show fallback
        setIsLoading(false);
        alert('Popup blocked! Please allow popups for this site or click the link below to open manually.\n\nAlternatively, copy this URL: /downloads/DWD_Property_Red_Flags_Checklist.html');
      }
      
    } catch (error) {
      console.error('Error opening PDF:', error);
      setIsLoading(false);
      alert('Unable to load checklist. Please try again later or contact support.');
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