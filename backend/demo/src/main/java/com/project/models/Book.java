package com.project.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity // This makes a Class a DB table in your Database
@Table(name="book") // This lets us set attribute like the name of the table
@Component // Make this class a Bean

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ISBN;
    @Column(nullable = false, name = "Title")
    private String title;
    @Column(nullable = false, name = "Genre")
    private String genre;
    @Column(nullable = false, name = "Price")
    private double price;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AuthorID", nullable = false)
    private Author author;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getISBN() {
        return ISBN;
    }

    public void setISBN(int ISBN) {
        this.ISBN = ISBN;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Book(int ISBN, String title, String genre, double price, Author author) {
        this.author =  author;
        this.price = price;
        this.genre = genre;
        this.title = title;
        this.ISBN = ISBN;
    }

    public Book() {

    }
}
