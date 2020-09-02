const notesRouter = require('express').Router()
const NoteEntry = require('../models/note')

notesRouter.get('/', (req, res, next) => {
  NoteEntry.find({})
    .then(notes => {
      notes ? res.json(notes) : res.status(204).end()
    })
    .catch(e => next(e))
})

notesRouter.get('/:id', (req, res, next) => {
  NoteEntry.find({ _id: req.params.id })
    .then(note => {
      note ? res.json(note) : res.status(404).end()
    })
    .catch(e => next(e))
})

notesRouter.delete('/:id', (req, res, next) => {
  NoteEntry.findByIdAndDelete(req.params.id)
    .then(note => {
      note ? res.json(note) : res.status(204).end()
    })
    .catch(e => next(e))
})

notesRouter.post('/', (req, res, next) => {
  if (!req.body.content)
    return res.status(400).json({
      error: 'Content missing',
    })

  const note = new NoteEntry({
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(e => next(e))
})

notesRouter.put('/:id', (req, res, next) => {
  if (!req.body.content)
    return res.status(400).json({
      error: 'Content missing',
    })

  NoteEntry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedNote => {
      updatedNote ? res.json(updatedNote) : res.status(204).end()
    })
    .catch(e => next(e))
})

module.exports = notesRouter
