package com.example.cardapio.model;

import com.example.cardapio.dto.FoodRequestDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "foods")
@EqualsAndHashCode(of = "id")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String imagem;
    private Integer preco;

    public Food() {

    }

    public Food (Long id, String titulo, String imagem, Integer preco) {
        this.id = id;
        this.titulo = titulo;
        this.imagem = imagem;
        this.preco = preco;
    }

    public Food (FoodRequestDTO data) {
        this.titulo = data.titulo();
        this.imagem = data.imagem();
        this.preco = data.preco();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Integer getPreco() {
        return preco;
    }

    public void setPreco(Integer preco) {
        this.preco = preco;
    }
}
