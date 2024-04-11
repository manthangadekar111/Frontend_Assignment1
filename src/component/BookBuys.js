import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Book = ({ book }) => {
  const [openbook, setopenbook] = useState(false);

  const handleView = () => {
    setopenbook(true);
  };

  const handleClose = () => {
    setopenbook(false);
  };

  return (
    <div className="book-card">
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />
      )}
      <h3 className="book-title">Title: {book.volumeInfo.title}</h3>
      <p className="book-info">Authors: {book.volumeInfo.authors.join(', ')}</p>
      <button className="view-button" onClick={handleView}>View Book Details</button>

      {openbook && (
        <div className="popup">
          <div className="popup-content">
            <h2> Title :{book.volumeInfo.title}</h2>
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="thumbnail-image" />
            )}
            <p><strong>Subtitle:</strong> {book.volumeInfo.subtitle}</p>
            {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 && (
              <p><strong>Authors:</strong> {book.volumeInfo.authors.join(', ')}</p>
            )}

            <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
            <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
            <p><strong>Language:</strong> {book.volumeInfo.language}</p>
            <p><strong>Preview Link:</strong> <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Preview</a></p>
            <p><strong>Info Link:</strong> <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">More Info</a></p>
            <p><strong>Canonical Volume Link:</strong> <a href={book.volumeInfo.canonicalVolumeLink} target="_blank" rel="noopener noreferrer">View on Google Books</a></p>
            <p><strong>Reading Modes:</strong> {book.volumeInfo.readingModes.text ? 'Text' : 'No Text'}, {book.volumeInfo.readingModes.image ? 'Image' : 'No Image'}</p>
            <p><strong>ISBN-13:</strong> {book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier}</p>
            <p><strong>ISBN-10:</strong> {book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10')?.identifier}</p>
            <p><strong>Page Count:</strong> {book.volumeInfo.pageCount}</p>
            <p><strong>Print Type:</strong> {book.volumeInfo.printType}</p>
            {book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && (
              <p><strong>Categories:</strong> {book.volumeInfo.categories.join(', ')}</p>
            )}


            <p><strong>Average Rating:</strong> {book.volumeInfo.averageRating}</p>
            <p><strong>Ratings Count:</strong> {book.volumeInfo.ratingsCount}</p>
            <p><strong>Maturity Rating:</strong> {book.volumeInfo.maturityRating}</p>
            <p><strong>Allow Anonymous Logging:</strong> {book.volumeInfo.allowAnonLogging ? 'Yes' : 'No'}</p>
            <p><strong>Content Version:</strong> {book.volumeInfo.contentVersion}</p>
            <p><strong>Panelization Summary:</strong></p>
            <p>&emsp;<strong>Contains Epub Bubbles:</strong> {book.volumeInfo.panelizationSummary && book.volumeInfo.panelizationSummary.containsEpubBubbles !== undefined ? book.volumeInfo.panelizationSummary.containsEpubBubbles.toString() : 'No'}</p>
            <p>&emsp;<strong>Contains Image Bubbles:</strong> {book.volumeInfo.panelizationSummary && book.volumeInfo.panelizationSummary.containsImageBubbles !== undefined ? book.volumeInfo.panelizationSummary.containsImageBubbles.toString() : 'No'}</p>
            <p><strong>Sale Country:</strong> {book.saleInfo.country}</p>
            <p><strong>Saleability:</strong> {book.saleInfo.saleability}</p>
            <p><strong>Is Ebook:</strong> {book.saleInfo.isEbook ? 'Yes' : 'No'}</p>
            {/* <p><strong>List Price:</strong> {book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}</p> */}
            {/* <p><strong>Retail Price:</strong> {book.saleInfo.retailPrice.amount} {book.saleInfo.retailPrice.currencyCode}</p> */}

            {book.saleInfo.listPrice && (
              <p><strong>List Price:</strong> {book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}</p>
            )}
            {book.saleInfo.retailPrice && (
              <p><strong>Retail Price:</strong> {book.saleInfo.retailPrice.amount} {book.saleInfo.retailPrice.currencyCode}</p>
            )}
            {book.saleInfo.buyLink && (
              <p><strong>Buy Link:</strong> <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">Buy Now</a></p>
            )}

            {book.saleInfo.offers && book.saleInfo.offers.map((offer, index) => (
              <div key={index}>
                <p><strong>Offer Type:</strong> {offer.finskyOfferType}</p>
                {offer.listPrice && (
                  <p><strong>List Price:</strong> {offer.listPrice.amountInMicros / 1000000} {offer.listPrice.currencyCode}</p>
                )}
                {offer.retailPrice && (
                  <p><strong>Retail Price:</strong> {offer.retailPrice.amountInMicros / 1000000} {offer.retailPrice.currencyCode}</p>
                )}
              </div>
            ))}


            <p><strong>Country:</strong> {book.accessInfo.country}</p>
            <p><strong>Viewability:</strong> {book.accessInfo.viewability}</p>
            <p><strong>Embeddable:</strong> {book.accessInfo.embeddable ? 'Yes' : 'No'}</p>
            <p><strong>Public Domain:</strong> {book.accessInfo.publicDomain ? 'Yes' : 'No'}</p>
            <p><strong>Text to Speech Permission:</strong> {book.accessInfo.textToSpeechPermission}</p>
            <p><strong>Epub Availability:</strong> {book.accessInfo.epub && book.accessInfo.epub.isAvailable ? 'Available' : 'Not Available'}</p>
            <p><strong>PDF Availability:</strong> {book.accessInfo.pdf && book.accessInfo.pdf.isAvailable ? 'Available' : 'Not Available'}</p>
            <p><strong>Web Reader Link:</strong> <a href={book.accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">Read on Web</a></p>
            <p><strong>Access View Status:</strong> {book.accessInfo.accessViewStatus}</p>
            <p><strong>Quote Sharing Allowed:</strong> {book.accessInfo.quoteSharingAllowed ? 'Yes' : 'No'}</p>
            {book.searchInfo && book.searchInfo.textSnippet && (
              <p><strong>Text Snippet:</strong> {book.searchInfo.textSnippet}</p>
            )}

            <p className='description'><strong>Description:</strong> {book.volumeInfo.description}</p>

            <button onClick={handleClose} className="close-button" style={{ color: 'white' }}>x</button>
          </div>
        </div>


      )}


    </div>
  );
};

const BookBuys = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchyourbook, setsearchyourbook] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://d1krvzwx5oquy1.cloudfront.net/books.json');
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    const filtered = books.filter(
      (book) =>
        book.volumeInfo.title.toLowerCase().includes(searchyourbook.toLowerCase()) ||
        book.volumeInfo.authors.some(author => author.toLowerCase().includes(searchyourbook.toLowerCase()))
    );
    setFilteredBooks(filtered);
  };

  const showAllBooks = () => {
    setFilteredBooks(books);
    setsearchyourbook('');
  };

  return (
    <div className="book-explorer">
      <h1 className="heading">Book Buying E-commerce Web Application</h1>
      <div className="search-section">
        <input
          type="text"
          value={searchyourbook}
          onChange={(e) => setsearchyourbook(e.target.value)}
          placeholder="Enter Book Name here..."
          className="input"
          style={{ height: '22px', padding: '5px', borderRadius: '5px', width: '65%', marginLeft: '-9px' }}
        />
        <button onClick={handleSearch}
          style={{ padding: '8px 16px', cursor: 'pointer', width: '102px', borderRadius: '5px', margin: '5px -3px' , backgroundColor:'rgb(167 126 152)' , color:'white'  }}
        >Search</button>
        <button onClick={showAllBooks}
          style={{ padding: '8px 16px', cursor: 'pointer', width: '180px', borderRadius: '5px', marginLeft: '10px',backgroundColor:'rgb(167 126 152)' , color:'white' }}

        >See All Books Here</button>
      </div>
      <div className="book-list">
        {filteredBooks.map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookBuys;
