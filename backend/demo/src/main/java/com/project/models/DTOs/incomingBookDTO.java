package com.project.models.DTOs;

public class incomingBookDTO {
    private String title;
    private String genre;
    private double price;
    private int authorID;

    public incomingBookDTO(String genre, String title, double price, int authorID) {
        this.genre = genre;
        this.title = title;
        this.price = price;
        this.authorID = authorID;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAuthorID() {
        return authorID;
    }

    public void setAuthorID(int authorID) {
        this.authorID = authorID;
    }

    public incomingBookDTO() {

    }
}
