package com.project.controllers;

import com.project.models.Author;
import com.project.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/author")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorController {
    private AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @PostMapping
    public ResponseEntity<Author> addAuthor(@RequestBody Author requestAuthor) {
        try {
            Author author = authorService.addAuthor(requestAuthor);
            return ResponseEntity.status(200).body(author);
        }
        catch(Exception e) {
            return ResponseEntity.status(400).body(null);
        }

    }
    @GetMapping("/{firstName}/{lastName}")
    public ResponseEntity<Author> getAuthor(@PathVariable String firstName, @PathVariable String lastName) {
        return ResponseEntity.ok(authorService.getAuthorByName(firstName, lastName));
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }

    @DeleteMapping("/{authorID}")
    public ResponseEntity<Integer> deleteAuthor(@PathVariable int authorID) {
        int result = authorService.deleteAuthor(authorID);
        if (result == 0) {
            return ResponseEntity.ok(0);
        }
        return  ResponseEntity.status(200).body(null);
    }

}
