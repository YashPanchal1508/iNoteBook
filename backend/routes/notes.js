const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Route: 1 Fetch All Notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//Route: 2 Add New Note
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 2 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Note({
            title, description , tag, user: req.user.id
        })
    
        const saveNotes = await note.save();
        res.json(saveNotes);
        
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "some error has occured" });
      }
  }
);

//Route: 3 Update a Note
router.put(
'/updatenote/:id',
    fetchuser,async (req, res) => {
        const {title, description, tag}  = req.body;
        //create a newNote object
        try {
          
          let newNote = {}
          if(title){newNote.title = title;}
          if(description){newNote.description = description;}
          if(tag){newNote.tag = tag;}
  
          //find a note to be updated and update it
          let note = await Note.findById(req.params.id);
          if(!note){return res.status(404).send("Not Found ")}
  
          if(note.user.toString() !== req.user.id){
              return res.status(401).send("Not Allowed");
          }
  
          note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, {new:true})
          res.json({note})
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
    })

    //Route: 3 delete a Note
        router.delete('/deletenote/:id', fetchuser , async (req, res) => {
            const {title, description, tag}  = req.body;
            try {
                let note = await Note.findById(req.params.id);
                if(!note){return res.status(404).send("Not Found ")}
        
                if(note.user.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }
        
                note = await Note.findByIdAndDelete(req.params.id);
                res.json({"Success": "Your note has been deleted", note:note})
                
            } catch (error) {
                console.error(error.message);
                res.status(500).send({ error: "some error has occured" });
              }
            //find a note to be deleted and delete it
        })
module.exports = router;
