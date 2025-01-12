package com.project.services;

import com.project.DAOs.BookDAO;
import com.project.models.Book;
import com.project.DAOs.AuthorDAO;
import com.project.models.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.project.models.DTOs.incomingBookDTO;

@Service
public class BookService {
    private BookDAO bookDAO;
    private AuthorDAO authorDAO;

    @Autowired
    public BookService(AuthorDAO authorDAO, BookDAO bookDAO) {
        this.bookDAO = bookDAO;
        this.authorDAO = authorDAO;
    }

    public Book addBook(incomingBookDTO newBook) {
        Book book = new Book(0, newBook.getTitle(), newBook.getGenre(), newBook.getPrice(), null);
        Optional<Author> author = authorDAO.findById(newBook.getAuthorID());

        if(author.isPresent()) {
            book.setAuthor(author.get());
            return bookDAO.save(book);
        }
        else {
            return null;
        }
    }

    public List<Book> getBookByTitle(String title) {
        return bookDAO.findByTitle(title);
    }

    public Book updateBookPrice(int ISBN, double newPrice) {
        Optional<Book> existingBook = bookDAO.findById(ISBN);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setPrice(newPrice);
            return bookDAO.save(book);
        }
        return null;
    }

    public int deleteBook(int ISBN) {
        if (bookDAO.existsById(ISBN)) {
            bookDAO.deleteByISBN(ISBN);
            return 0;
        }
        return 1;
    }

    public List<Book> getAllBooks() {
        return bookDAO.findAll();
    }

    public List<Book> getBooksFiltered(String genre, Double minPrice, Double maxPrice) {
        return bookDAO.findBooksByGenreAndPriceRange(genre, minPrice, maxPrice);
    }

    public Map<String, Object> getFilteredBookPriceStats(String genre, Double minPrice, Double maxPrice) {
        return bookDAO.getFilteredBookPriceStats(genre, minPrice, maxPrice);
    }
}
