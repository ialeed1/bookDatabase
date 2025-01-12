package com.project.services;

import com.project.DAOs.AuthorDAO;
import com.project.models.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    private AuthorDAO authorDAO;

    @Autowired //injects authorDAO into authorService (allows use here)
    public AuthorService(AuthorDAO authorDAO) {
     this.authorDAO = authorDAO;
    }

    public Author addAuthor(Author author) throws Exception{
        return authorDAO.save(author);
    }

    public Author getAuthorByName(String firstName, String lastName) {
        return authorDAO.findByFirstNameAndLastName(firstName, lastName);
    }

    public int deleteAuthor(int authorID) {
        if (authorDAO.existsById(authorID)) {
            authorDAO.deleteById(authorID);
            return 0;
        }
        return 1;
    }

    public List<Author> getAllAuthors() {
        return authorDAO.findAll();
    }


}
