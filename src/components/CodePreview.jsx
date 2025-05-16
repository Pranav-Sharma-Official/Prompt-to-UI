import { useEffect, useState } from 'react';

const CodePreview = ({ components }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!components || components.length === 0) {
      setCode('// No components generated yet');
      return;
    }

    // Generate React code
    let generatedCode = 'import React from "react";\n\n';
    generatedCode += 'const GeneratedComponent = () => {\n';
    generatedCode += '  return (\n';
    
    if (components.length === 1) {
      // Single component
      generatedCode += generateComponentCode(components[0], 4);
    } else {
      // Multiple components
      generatedCode += '    <div className="space-y-4">\n';
      components.forEach(component => {
        generatedCode += generateComponentCode(component, 6);
      });
      generatedCode += '    </div>\n';
    }
    
    generatedCode += '  );\n';
    generatedCode += '};\n\n';
    generatedCode += 'export default GeneratedComponent;';
    
    setCode(generatedCode);
  }, [components]);

  // Helper function to generate component code
  const generateComponentCode = (component, indentLevel) => {
    const { type, props } = component;
    const indent = ' '.repeat(indentLevel);
    
    switch (type) {
      case 'button':
        return `${indent}<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">\n${indent}  ${props.label || 'Button'}\n${indent}</button>\n`;
      
      case 'input':
        return `${indent}<input\n${indent}  type="text"\n${indent}  placeholder="${props.placeholder || 'Enter text...'}"\n${indent}  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"\n${indent}/>\n`;
      
      case 'card':
        return `${indent}<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm">\n${indent}  <h3 className="text-lg font-bold mb-2">${props.title || 'Card Title'}</h3>\n${indent}  <p className="text-gray-600 dark:text-gray-300">${props.content || 'Card content goes here'}</p>\n${indent}</div>\n`;
      
      case 'navbar':
        return `${indent}<nav className="bg-white dark:bg-gray-800 shadow-md p-4">\n${indent}  <div className="flex justify-between items-center">\n${indent}    <div className="font-bold text-xl">${props.title || 'Site Name'}</div>\n${indent}    <div className="flex space-x-4">\n${indent}      {['Home', 'About', 'Contact'].map((link, i) => (\n${indent}        <a key={i} href="#" className="hover:text-blue-500">{link}</a>\n${indent}      ))}\n${indent}    </div>\n${indent}  </div>\n${indent}</nav>\n`;
      
      case 'form':
        return `${indent}<form className="space-y-4 max-w-md">\n${indent}  <div>\n${indent}    <label className="block text-sm font-medium mb-1">Email</label>\n${indent}    <input type="email" className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />\n${indent}  </div>\n${indent}  <div>\n${indent}    <label className="block text-sm font-medium mb-1">Password</label>\n${indent}    <input type="password" className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />\n${indent}  </div>\n${indent}  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">\n${indent}    ${props.submitText || 'Submit'}\n${indent}  </button>\n${indent}</form>\n`;
      
      case 'hero':
        return `${indent}<div className="text-center py-12 px-4">\n${indent}  <h1 className="text-4xl font-bold mb-4">${props.title || 'Welcome to our site'}</h1>\n${indent}  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">${props.subtitle || 'This is a hero section for your website'}</p>\n${indent}  <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">\n${indent}    ${props.buttonText || 'Get Started'}\n${indent}  </button>\n${indent}</div>\n`;
      
      case 'gallery':
        return `${indent}<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">\n${indent}  {[1, 2, 3].map((item, i) => (\n${indent}    <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">\n${indent}      <span className="text-gray-500 dark:text-gray-400">Image {item}</span>\n${indent}    </div>\n${indent}  ))}\n${indent}</div>\n`;
      
      case 'testimonial':
        return `${indent}<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">\n${indent}  <p className="italic mb-4 text-gray-600 dark:text-gray-300">"${props.quote || 'This product is amazing! I would definitely recommend it to anyone.'}"</p>\n${indent}  <div className="flex items-center">\n${indent}    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>\n${indent}    <div>\n${indent}      <p className="font-medium">${props.author || 'Jane Doe'}</p>\n${indent}      <p className="text-sm text-gray-500 dark:text-gray-400">${props.role || 'Customer'}</p>\n${indent}    </div>\n${indent}  </div>\n${indent}</div>\n`;
      
      default:
        return `${indent}<!-- Unknown component type: ${type} -->\n`;
    }
  };

  return (
    <div className="relative">
      <pre className="text-sm text-indigo-100 bg-slate-800/70 rounded-lg overflow-x-auto p-5 neumorphic-inset">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-3 right-3 p-2 rounded-md glassmorphism text-white hover:bg-indigo-500/30 transition-colors"
        title="Copy code"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    </div>
  );
};

export default CodePreview; 