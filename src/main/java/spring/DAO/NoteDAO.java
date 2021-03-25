package spring.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import spring.model.Note;

import java.util.List;

@Component
public class NoteDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public NoteDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Note> show(){
        return jdbcTemplate.query("SELECT * FROM notes", new BeanPropertyRowMapper(Note.class));
    }
    public Note index(int id){
        for (Note note: jdbcTemplate.query("SELECT * FROM notes WHERE id=?", new Object[]{id}, new BeanPropertyRowMapper<>(Note.class))) {
            if(note.getId() == id){
                return note;
            }
        }
        return null;
    }
    public void save(Note note){
        jdbcTemplate.update("INSERT  INTO notes (title, description) VALUES (?, ?)", note.getTitle(), note.getDescription());
    }
    public void update(int id, Note note){
        jdbcTemplate.update("UPDATE notes SET title=?, description=? WHERE id=?", note.getTitle(), note.getDescription(), id);
    }
    public void delete(int id){
        jdbcTemplate.update("DELETE FROM notes WHERE id=?", id);
    }
}