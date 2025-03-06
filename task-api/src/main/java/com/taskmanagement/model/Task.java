package com.taskmanagement.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank; // Updated import
import jakarta.validation.constraints.Size;     // Updated import

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    private String id;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be at most 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    private String status; // "TODO", "IN_PROGRESS", "COMPLETED"
}