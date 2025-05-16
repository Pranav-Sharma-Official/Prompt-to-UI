import { useState, useEffect } from 'react';

const templates = {
  button: (props) => (
    <button className="px-6 py-3 rounded-xl text-white font-medium gradient-button">
      {props.label || 'Button'}
    </button>
  ),
  input: (props) => (
    <input
      type="text"
      placeholder={props.placeholder || 'Enter text...'}
      className="p-3 glassmorphism rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-400 neumorphic-inset"
    />
  ),
  card: (props) => (
    <div className="glassmorphism rounded-xl p-6 max-w-sm neumorphic">
      <h3 className="text-xl font-bold mb-3 gradient-text">{props.title || 'Card Title'}</h3>
      <p className="text-slate-300">{props.content || 'Card content goes here'}</p>
    </div>
  ),
  navbar: (props) => (
    <nav className="glassmorphism rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl gradient-text">{props.title || 'Site Name'}</div>
        <div className="flex space-x-6">
          {(props.links || ['Home', 'About', 'Contact']).map((link, i) => (
            <a key={i} href="#" className="text-slate-300 hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </nav>
  ),
  form: (props) => (
    <form className="space-y-4 max-w-md glassmorphism rounded-xl p-6 neumorphic">
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
        <input type="email" className="p-3 bg-slate-800/40 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white neumorphic-inset" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
        <input type="password" className="p-3 bg-slate-800/40 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white neumorphic-inset" />
      </div>
      <button type="submit" className="w-full gradient-button py-3 px-6 rounded-xl text-white font-medium">
        {props.submitText || 'Submit'}
      </button>
    </form>
  ),
  hero: (props) => (
    <div className="text-center py-12 px-4 glassmorphism rounded-xl mb-6 neumorphic">
      <h1 className="text-4xl font-bold mb-4 gradient-text">{props.title || 'Welcome to our site'}</h1>
      <p className="text-lg text-slate-300 mb-8">{props.subtitle || 'This is a hero section for your website'}</p>
      <button className="gradient-button px-8 py-3 rounded-xl text-white font-medium">
        {props.buttonText || 'Get Started'}
      </button>
    </div>
  ),
  gallery: (props) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {[1, 2, 3].map((item, i) => (
        <div key={i} className="aspect-square glassmorphism rounded-xl flex items-center justify-center neumorphic">
          <span className="text-slate-400">Image {item}</span>
        </div>
      ))}
    </div>
  ),
  testimonial: (props) => (
    <div className="glassmorphism rounded-xl p-6 neumorphic">
      <p className="italic mb-5 text-slate-300">"{props.quote || 'This product is amazing! I would definitely recommend it to anyone.'}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-indigo-500/30 rounded-full mr-4 flex items-center justify-center">
          <span className="text-white font-bold">{props.author ? props.author.charAt(0) : 'J'}</span>
        </div>
        <div>
          <p className="font-medium gradient-text">{props.author || 'Jane Doe'}</p>
          <p className="text-sm text-slate-400">{props.role || 'Customer'}</p>
        </div>
      </div>
    </div>
  )
};

const GeneratedUI = ({ prompt }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (!prompt) {
      setComponents([]);
      return;
    }

    // Simple parsing logic to detect components from prompt
    const newComponents = [];
    
    if (prompt.toLowerCase().includes('button')) {
      const label = extractProperty(prompt, 'button', 'label') || 
                    extractProperty(prompt, 'button', 'text');
      newComponents.push({ type: 'button', props: { label } });
    }
    
    if (prompt.toLowerCase().includes('input')) {
      const placeholder = extractProperty(prompt, 'input', 'placeholder');
      newComponents.push({ type: 'input', props: { placeholder } });
    }
    
    if (prompt.toLowerCase().includes('card')) {
      const title = extractProperty(prompt, 'card', 'title');
      const content = extractProperty(prompt, 'card', 'content') || 
                      extractProperty(prompt, 'card', 'text');
      newComponents.push({ type: 'card', props: { title, content } });
    }
    
    if (prompt.toLowerCase().includes('navbar') || prompt.toLowerCase().includes('navigation')) {
      const title = extractProperty(prompt, 'navbar', 'title');
      newComponents.push({ type: 'navbar', props: { title } });
    }
    
    if (prompt.toLowerCase().includes('form')) {
      const submitText = extractProperty(prompt, 'form', 'submit') || 
                         extractProperty(prompt, 'form', 'button');
      newComponents.push({ type: 'form', props: { submitText } });
    }
    
    if (prompt.toLowerCase().includes('hero')) {
      const title = extractProperty(prompt, 'hero', 'title');
      const subtitle = extractProperty(prompt, 'hero', 'subtitle');
      const buttonText = extractProperty(prompt, 'hero', 'button');
      newComponents.push({ type: 'hero', props: { title, subtitle, buttonText } });
    }
    
    if (prompt.toLowerCase().includes('gallery') || prompt.toLowerCase().includes('image')) {
      newComponents.push({ type: 'gallery', props: {} });
    }
    
    if (prompt.toLowerCase().includes('testimonial') || prompt.toLowerCase().includes('review')) {
      const quote = extractProperty(prompt, 'testimonial', 'quote') || 
                    extractProperty(prompt, 'testimonial', 'text');
      const author = extractProperty(prompt, 'testimonial', 'author') || 
                     extractProperty(prompt, 'testimonial', 'name');
      newComponents.push({ type: 'testimonial', props: { quote, author } });
    }
    
    // Default fallback
    if (newComponents.length === 0 && prompt.trim().length > 0) {
      // Try to guess what component fits best
      if (prompt.toLowerCase().includes('welcome') || prompt.toLowerCase().includes('landing')) {
        newComponents.push({ type: 'hero', props: { title: 'Welcome', subtitle: prompt } });
      } else {
        newComponents.push({ type: 'card', props: { title: 'Generated Content', content: prompt } });
      }
    }
    
    setComponents(newComponents);
  }, [prompt]);

  // Helper function to extract properties from the prompt
  const extractProperty = (prompt, componentType, propName) => {
    const regex = new RegExp(`${componentType}\\s+(?:with|having)?\\s+${propName}[:\\s]+["']?([^"']+)["']?`, 'i');
    const match = prompt.match(regex);
    return match ? match[1].trim() : null;
  };

  // Render components based on templates
  return (
    <div className="space-y-6 fade-in">
      {components.map((component, index) => {
        const Template = templates[component.type];
        return Template ? (
          <div key={index} className="component-wrapper">
            {Template(component.props)}
          </div>
        ) : null;
      })}
      {components.length === 0 && (
        <div className="text-center text-slate-400 p-10 glassmorphism rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-slate-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p>Enter a UI description to generate components</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedUI; 