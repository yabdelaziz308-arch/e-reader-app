import { useState } from 'react';
import './App.css';

// Initial default library database records
const INITIAL_BOOKS = [
  {
    id: 1,
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    description: "The world's most famous detective stories investigating mysterious crimes.",
    content: "Introduction:\nOne morning, Sherlock Holmes sat at the breakfast table analyzing a new mystery that arrived via a cryptic letter...\n\nChapter One:\nThe storm was battering London furiously when a man wearing a soaked overcoat knocked on the door, begging for help with a strange disappearance case..."
  },
  {
    id: 2,
    title: "You Are Mine",
    author: "Dr. Mona Al-Marshoud",
    description: "A widely popular Arabic romantic and social novel translated for global readers.",
    content: "The Beginning:\nThe little girl looked at me with her wide, innocent eyes and said in her stuttering accent: 'You are mine'...\n\nYears passed and circumstances changed, but that single phrase remained etched deep in my heart through all the hardships we endured."
  }
];

function App() {
  // App view controls & data structures state tracking
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [currentReadingBook, setCurrentReadingBook] = useState(null);
  const [fontSize, setFontSize] = useState(1.25); // Font scale base mapping

  // Form entries active data tracking state configuration
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newContent, setNewContent] = useState('');

  // Function to download book content as a client-side localized text file
  const downloadBookText = (book) => {
    const element = document.createElement("a");
    const file = new Blob(
      [`Book: ${book.title}\nAuthor: ${book.author}\n\n${book.content}`], 
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${book.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Font modifiers handler actions
  const increaseFont = () => setFontSize(prev => Math.min(prev + 0.15, 2.5));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 0.15, 0.9));

  // Form Submit Handler to inject custom books into active library state array
  const handleAddBook = (e) => {
    e.preventDefault();
    
    // Basic verification check to ensure required elements are present
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
      alert("Please fill out Title, Author, and Book Content fields!");
      return;
    }

    const createdBook = {
      id: Date.now(), // Generate a unique timestamp identifier code
      title: newTitle,
      author: newAuthor,
      description: newDescription || "No custom description was supplied for this entry.",
      content: newContent
    };

    // Append newly compiled record to state array structure smoothly
    setBooks([createdBook, ...books]);

    // Reset input fields completely to prepare form for future updates
    setNewTitle('');
    setNewAuthor('');
    setNewDescription('');
    setNewContent('');
  };

  return (
    <div className="app-container">
      {/* View 1: Active Document E-Reader Simulation Frame */}
      {currentReadingBook ? (
        <div className="reader-container">
          <div className="reader-header">
            <div>
              <h2>{currentReadingBook.title}</h2>
              <p style={{ color: '#bb86fc' }}>By: {currentReadingBook.author}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="font-controls">
                <button className="btn font-btn" onClick={decreaseFont}>A-</button>
                <span className="font-indicator">{Math.round(fontSize * 80)}%</span>
                <button className="btn font-btn" onClick={increaseFont}>A+</button>
              </div>
              <button className="btn back-btn" onClick={() => setCurrentReadingBook(null)}>
                🔙 Back to Library
              </button>
            </div>
          </div>

          <div className="reader-content" style={{ fontSize: `${fontSize}rem` }}>
            {currentReadingBook.content}
          </div>
        </div>
      ) : (
        /* View 2: Complete Interactive Dashboard (Creation Form + Catalog Deck) */
        <>
          <header>
            <h1>📚 MY DIGITAL LIBRARY</h1>
            <p>Your professional platform to read, upload, and download e-books seamlessly</p>
          </header>

          {/* New Book Creation Console Framework Panel */}
          <div className="form-container">
            <h2>Add a New E-Book to Library</h2>
            <form onSubmit={handleAddBook}>
              <div className="form-group-row">
                <input 
                  type="text" 
                  placeholder="Book Title (Required)" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Author Name (Required)" 
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </div>
              <input 
                type="text" 
                placeholder="Short Description or Genre Summary" 
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <textarea 
                placeholder="Paste or write the entire book text or chapters here... (Required)" 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button type="submit" className="btn submit-form-btn">✨ Publish E-Book to Shelf</button>
            </form>
          </div>

          {/* Active Interactive Cards Repository Grid View Layout */}
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <div>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p>{book.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn" onClick={() => setCurrentReadingBook(book)}>
                    📖 Read
                  </button>
                  <button className="btn" style={{ backgroundColor: '#03dac6' }} onClick={() => downloadBookText(book)}>
                    📥 Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;