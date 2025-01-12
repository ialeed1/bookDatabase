package com.project.controllers;

import com.project.models.Book;
import com.project.services.BookService;
import com.project.models.Author;
import com.project.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

import com.project.models.DTOs.incomingBookDTO;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private BookService bookService;
    private AuthorService authorService;

    @Autowired
    public BookController(BookService bookService, AuthorService authorService) {
        this.bookService = bookService;
        this.authorService = authorService;
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody incomingBookDTO requestBook) {
        try {
            Book book = bookService.addBook(requestBook);
            return ResponseEntity.status(200).body(book);
        }
        catch(Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }
    @GetMapping("/{title}")
    public ResponseEntity<List<Book>> getBook(@PathVariable String title) {
        return ResponseEntity.ok(bookService.getBookByTitle(title));
    }


    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @DeleteMapping("/{ISBN}")
    public ResponseEntity<Integer> deleteBook(@PathVariable int ISBN) {
        int result = bookService.deleteBook(ISBN);
        if (result == 0) {
            return ResponseEntity.ok(0);
        }
        return ResponseEntity.status(200).body(null);
    }


    @PatchMapping("/{ISBN}")
    public ResponseEntity<Object> updatePrice(@RequestBody double price, @PathVariable int ISBN) {
        Book book = bookService.updateBookPrice(ISBN, price);
        if (book == null) {
            return ResponseEntity.status(400).body("no book found");
        }
        else {
            return ResponseEntity.ok(book);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Book>> getBooksFiltered(
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "minPrice", required = false) Double minPrice,
            @RequestParam(value = "maxPrice", required = false) Double maxPrice) {

        // Call the service layer to retrieve the filtered books
        List<Book> books = bookService.getBooksFiltered(genre, minPrice, maxPrice);

        // Return the list of books in the response
        return ResponseEntity.ok(books);
    }


    @GetMapping("/filtered-price-stats")
    public ResponseEntity<Map<String, Object>> getFilteredBookPriceStats(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        try {
            Map<String, Object> stats = bookService.getFilteredBookPriceStats(genre, minPrice, maxPrice);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
