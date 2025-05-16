import { useState } from 'react'
import GeneratedUI from './components/GeneratedUI'
import CodePreview from './components/CodePreview'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [prompt, setPrompt] = useState('')
  const [components, setComponents] = useState([])
  const [activeTab, setActiveTab] = useState('preview')
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleGenerateUI = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true)
    // Simulate loading
    setTimeout(() => {
      const generatedComponents = parsePrompt(prompt)
      setComponents(generatedComponents)
      setIsGenerating(false)
    }, 500)
  }

  const parsePrompt = (promptText) => {
    const newComponents = []

    if (promptText.toLowerCase().includes('button')) {
      const label = extractProperty(promptText, 'button', 'label') ||
        extractProperty(promptText, 'button', 'text')
      newComponents.push({ type: 'button', props: { label } })
    }

    if (promptText.toLowerCase().includes('input')) {
      const placeholder = extractProperty(promptText, 'input', 'placeholder')
      newComponents.push({ type: 'input', props: { placeholder } })
    }

    if (promptText.toLowerCase().includes('card')) {
      const title = extractProperty(promptText, 'card', 'title')
      const content = extractProperty(promptText, 'card', 'content') ||
        extractProperty(promptText, 'card', 'text')
      newComponents.push({ type: 'card', props: { title, content } })
    }

    if (promptText.toLowerCase().includes('navbar') || promptText.toLowerCase().includes('navigation')) {
      const title = extractProperty(promptText, 'navbar', 'title')
      newComponents.push({ type: 'navbar', props: { title } })
    }

    if (promptText.toLowerCase().includes('form')) {
      const submitText = extractProperty(promptText, 'form', 'submit') ||
        extractProperty(promptText, 'form', 'button')
      newComponents.push({ type: 'form', props: { submitText } })
    }

    if (promptText.toLowerCase().includes('hero')) {
      const title = extractProperty(promptText, 'hero', 'title')
      const subtitle = extractProperty(promptText, 'hero', 'subtitle')
      const buttonText = extractProperty(promptText, 'hero', 'button')
      newComponents.push({ type: 'hero', props: { title, subtitle, buttonText } })
    }

    if (promptText.toLowerCase().includes('gallery') || promptText.toLowerCase().includes('image')) {
      newComponents.push({ type: 'gallery', props: {} })
    }

    if (promptText.toLowerCase().includes('testimonial') || promptText.toLowerCase().includes('review')) {
      const quote = extractProperty(promptText, 'testimonial', 'quote') ||
        extractProperty(promptText, 'testimonial', 'text')
      const author = extractProperty(promptText, 'testimonial', 'author') ||
        extractProperty(promptText, 'testimonial', 'name')
      newComponents.push({ type: 'testimonial', props: { quote, author } })
    }

    if (newComponents.length === 0 && promptText.trim().length > 0) {
      if (promptText.toLowerCase().includes('welcome') || promptText.toLowerCase().includes('landing')) {
        newComponents.push({ type: 'hero', props: { title: 'Welcome', subtitle: promptText } })
      } else {
        newComponents.push({ type: 'card', props: { title: 'Generated Content', content: promptText } })
      }
    }

    return newComponents
  }

  const extractProperty = (prompt, componentType, propName) => {
    const regex = new RegExp(`${componentType}\\s+(?:with|having)?\\s+${propName}[:\\s]+["']?([^"']+)["']?`, 'i')
    const match = prompt.match(regex)
    return match ? match[1].trim() : null
  }

  return (
    <div className="min-h-screen text-white font-inter flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 glassmorphism">
        <div className="container mx-auto px-4 md:px-12 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">Prompt-to-UI</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 md:px-12 py-6 flex flex-col md:flex-row gap-8">
        {/* Left column */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Describe Your UI</h2>
          <p className="text-sm text-slate-300 mb-4">
            Use natural language to describe UI components you want to create
          </p>
          <div className="glassmorphism rounded-2xl mb-4 flex-grow">
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              className="w-full h-64 md:h-80 p-5 bg-transparent rounded-2xl focus:outline-none text-white placeholder-slate-400 neumorphic-inset resize-none"
              placeholder="E.g., Create a navbar with title 'My App', a hero section with title 'Welcome' and subtitle 'This is my awesome site', and a button with label 'Get Started'"
            />
          </div>
          <button
            onClick={handleGenerateUI}
            disabled={isGenerating}
            className={`gradient-button py-3 px-6 text-lg ${isGenerating ? 'opacity-70' : ''}`}
          >
            {isGenerating ? 'Generating...' : 'Generate UI'}
          </button>

          <div className="mt-6 glassmorphism rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2">Tips:</h3>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
              <li>Specify component types: button, input, navbar, card, form, hero, gallery, testimonial</li>
              <li>Add properties like "button with label 'Click Me'" or "card with title 'Features'"</li>
              <li>The more details you provide, the better the result</li>
              <li>You can combine multiple components in one prompt</li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full md:w-1/2 flex flex-col fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Generated Output</h2>
          <div className="mb-4 flex space-x-1 border-b border-slate-700/50">
            <button
              className={`py-2 px-4 rounded-t-lg font-medium ${activeTab === 'preview' ? 'bg-slate-800/50 text-white' : 'text-slate-400'}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg font-medium ${activeTab === 'code' ? 'bg-slate-800/50 text-white' : 'text-slate-400'}`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
          </div>

          <div className="flex-grow glassmorphism rounded-2xl p-5 overflow-auto neumorphic">
            {activeTab === 'preview' ? (
              <GeneratedUI prompt={prompt} />
            ) : (
              <CodePreview components={components} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glassmorphism py-4 mt-8">
        <div className="container mx-auto px-4 md:px-12 text-center text-sm text-slate-400">
          <a
            href="https://github.com/Pranav-Sharma-Official/Prompt-to-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white underline transition"
          >
            Prompt-to-UI
          </a>{' '}
          is built with React, TailwindCSS, and v0-based component patterns by{' '}
          <a
            href="https://www.linkedin.com/in/-pranav--sharma-/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white underline transition"
          >
            Pranav Sharma
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
