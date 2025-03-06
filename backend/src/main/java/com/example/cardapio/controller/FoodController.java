package com.example.cardapio.controller;

import com.example.cardapio.dto.FoodRequestDTO;
import com.example.cardapio.dto.FoodResponseDTO;
import com.example.cardapio.model.Food;
import com.example.cardapio.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodController {
    @Autowired
    FoodRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<FoodResponseDTO> getAll() {
        List<FoodResponseDTO> lista = repository.findAll().stream().map(FoodResponseDTO::new).toList();
        return lista;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFood(@RequestBody FoodRequestDTO data) {
        Food foodData = new Food(data);
        repository.save(foodData);
    }
    
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public Food updateFood(@PathVariable Long id, @RequestBody FoodRequestDTO data) {
        Food food = repository.findById(id).orElseThrow(() -> new RuntimeException("Comida não encontrada"));

        food.setTitulo(data.titulo());
        food.setImagem(data.imagem());
        food.setPreco(data.preco());

        return repository.save(food);
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
