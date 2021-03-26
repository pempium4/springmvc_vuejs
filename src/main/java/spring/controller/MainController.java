package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import spring.DAO.NoteDAO;
import spring.model.Note;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/notes")
public class MainController {

    private final NoteDAO noteDAO;

    @Autowired
    public MainController(NoteDAO noteDAO){
        this.noteDAO = noteDAO;
    }

    @GetMapping
    public List<Note> show(){
        return noteDAO.show();
    }

    @GetMapping("/{id}")
    public Note index(@PathVariable("id") int id){
        return noteDAO.index(id);
    }

    @PostMapping
    public void create(@RequestBody Note note,
                       BindingResult bindingResult){
        if(!bindingResult.hasErrors()){
            noteDAO.save(note);
        }
    }

    @PatchMapping("/{id}")
    public void update(@RequestBody @Valid Note note,
                         @PathVariable("id") int id,
                       BindingResult bindingResult){
        if(!bindingResult.hasErrors()){
            noteDAO.update(id, note);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        noteDAO.delete(id);
    }
}
