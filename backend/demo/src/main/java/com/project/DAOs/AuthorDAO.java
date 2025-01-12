package com.project.DAOs;

import com.project.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorDAO extends JpaRepository<Author, Integer> {
    // Corrected method name to match the 'authorID' property in Author
    Author findByAuthorID(int authorID);

    Author findByFirstNameAndLastName(String firstName, String lastName);
}
