package com.javatraining.todomanagement.service;

import ch.qos.logback.core.model.Model;
import com.javatraining.todomanagement.dto.TodoDto;
import com.javatraining.todomanagement.exception.ResourceNotFoundException;
import com.javatraining.todomanagement.model.Todo;
import com.javatraining.todomanagement.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class TodoService {

    private TodoRepository todoRepository;

    private ModelMapper modelMapper;

    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepository
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Todo Id is not found"));

        return modelMapper.map(todo, TodoDto.class);
    }

    public List<TodoDto> getTodoList(){
        return todoRepository.findAll()
                .stream()
                .map((todo) -> modelMapper.map(todo, TodoDto.class))
                .collect(Collectors.toList());
    }

    public TodoDto addTodo(TodoDto todoDto){
        Todo todo = modelMapper.map(todoDto, Todo.class);

        todoRepository.save(todo);

        return modelMapper.map(todo, TodoDto.class);
    }

    public TodoDto updateTodo(Long id, TodoDto todoDto){
        Todo todo = todoRepository
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Todo Id is not found"));

        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());

        todoRepository.save(todo);

        return modelMapper.map(todo, TodoDto.class);
    }

    public void deleteTodo(Long id) {
        Todo todo = todoRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo Id is not found"));

        todoRepository.deleteById(id);
    }

    public TodoDto completeTodo(Long id){
        Todo todo = todoRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo Id is not found"));

        todo.setCompleted(Boolean.TRUE);

        todoRepository.save(todo);

        return modelMapper.map(todo, TodoDto.class);
    }


    public TodoDto inCompleteTodo(Long id){
        Todo todo = todoRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo Id is not found"));

        todo.setCompleted(Boolean.FALSE);

        todoRepository.save(todo);

        return modelMapper.map(todo, TodoDto.class);
    }


}
