interface ConvertKitFormProps {
  className?: string;
}

export default function ConvertKitForm({ className = "" }: ConvertKitFormProps) {
  const convertKitFormHTML = `
    <form 
      action="https://app.kit.com/forms/8630938/subscriptions" 
      class="seva-form formkit-form" 
      method="post" 
      data-sv-form="8630938" 
      data-uid="74c0dd729c" 
      data-format="inline" 
      data-version="5" 
      data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription."}}}' 
      min-width="400 500 600 700 800" 
      style="background-color: #f9fafb; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb; max-width: 420px; margin: 0 auto;"
    >
      <div class="formkit-form-wrapper">
        <div class="formkit-form-header" style="margin-bottom: 24px; text-align: center;">
          <h2 class="formkit-form-title" style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 12px; line-height: 1.3;">
            Start Your Tax Sales Journey Today
          </h2>
          <p class="formkit-form-description" style="color: #6b7280; font-size: 16px; line-height: 1.5; margin: 0;">
            No fluff, just weekly insights to help you find undervalued properties, navigate red tape, and build long-term wealth
          </p>
        </div>
        
        <div class="formkit-form-body">
          <div class="formkit-field" style="margin-bottom: 16px;">
            <input 
              type="email" 
              id="formkit-field-email" 
              name="email_address" 
              class="formkit-input" 
              placeholder="Enter your email address"
              required
              style="
                width: 100%;
                padding: 14px 16px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 16px;
                font-family: inherit;
                margin-bottom: 0;
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
                box-sizing: border-box;
                background-color: white;
              "
              onfocus="this.style.borderColor='#1f5d2c'; this.style.boxShadow='0 0 0 3px rgba(31, 93, 44, 0.1)'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
            />
          </div>
          
          <button 
            type="submit" 
            class="formkit-submit"
            style="
              width: 100%;
              background-color: #1f5d2c;
              color: white;
              padding: 14px 24px;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.2s ease;
              box-sizing: border-box;
              margin-bottom: 16px;
            "
            onmouseover="this.style.backgroundColor='#164a24'"
            onmouseout="this.style.backgroundColor='#1f5d2c'"
          >
            Subscribe Now
          </button>
        </div>
        
        <div class="formkit-form-footer" style="text-align: center;">
          <p class="formkit-form-disclaimer" style="font-size: 14px; color: #6b7280; margin: 0; line-height: 1.4;">
            No spam, ever. Just honest insights. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </form>
  `;

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: convertKitFormHTML }} />
    </div>
  );
}