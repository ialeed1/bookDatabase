package com.project.DAOs;

import com.project.models.Book;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository //marks this file as repository so Spring does proper steps
public interface BookDAO extends JpaRepository<Book, Integer>{
    List<Book> findByTitle(String title);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM book WHERE ISBN = :isbn", nativeQuery = true)
    void deleteByISBN(int isbn);

    @Transactional
    @Query(value = "SELECT * FROM book " +
            "WHERE (:genre IS NULL OR genre = :genre) " +
            "AND (:minPrice IS NULL OR :maxPrice IS NULL OR price BETWEEN :minPrice AND :maxPrice)",
            nativeQuery = true)
    List<Book> findBooksByGenreAndPriceRange(String genre, Double minPrice, Double maxPrice);

    @Transactional
    @Query(value = "SELECT AVG(price) AS averagePrice, SUM(price) AS totalPrice " +
            "FROM book " +
            "WHERE (:genre IS NULL OR genre = :genre) " +
            "AND (:minPrice IS NULL OR price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR price <= :maxPrice)",
            nativeQuery = true)
    Map<String, Object> getFilteredBookPriceStats(String genre, Double minPrice, Double maxPrice);

}