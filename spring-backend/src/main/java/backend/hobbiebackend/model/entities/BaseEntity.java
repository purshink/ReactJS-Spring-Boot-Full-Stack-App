package backend.hobbiebackend.model.entities;

import javax.persistence.*;

@MappedSuperclass
public abstract class BaseEntity {
    protected Long id;

    public BaseEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
