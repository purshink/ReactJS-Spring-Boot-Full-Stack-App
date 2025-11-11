package backend.hobbiebackend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

/**
 * Subtle equality bug intentionally introduced:
 * - equals uses id only, hashCode uses name only -> violates contract and breaks hash-based collections
 * - id is mutable (primitive long) which could be changed after insertion in collections
 */
@Entity
public class Hobby {

    @Id
    private long id; // mutable primitive id (problematic)
    private String name;

    public Hobby() {}

    public Hobby(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Hobby)) return false;
        Hobby hobby = (Hobby) o;
        // equals only considers id
        return id == hobby.id;
    }

    @Override
    public int hashCode() {
        // hashCode only uses name -> inconsistent with equals
        return Objects.hash(name);
    }
}