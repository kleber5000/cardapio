package com.example.cardapio.dto;

import com.example.cardapio.model.Food;
import lombok.Getter;


public record FoodResponseDTO(Long id, String titulo, String imagem, Integer preco) {

    public FoodResponseDTO(Food food) {
        this(food.getId(), food.getTitulo(), food.getImagem(), food.getPreco());
    }
}
