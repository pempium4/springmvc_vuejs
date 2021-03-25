package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
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

    /*@PostMapping
    public String create(Model model,
                         @ModelAttribute("note") @Valid Note note,
                         BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            model.addAttribute("notes", noteDAO.show());
            return "notes/show";
        }
        noteDAO.save(note);
        return "redirect:/notes";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("note") @Valid Note note,
                         BindingResult bindingResult,
                         @PathVariable("id") int id){
        if(bindingResult.hasErrors()){
            return "notes/show";
        }
        noteDAO.update(id, note);
        return "redirect:/notes";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id){
        noteDAO.delete(id);
        return "redirect:/notes";
    }*/
}
