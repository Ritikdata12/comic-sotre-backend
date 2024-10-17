const Comic = require("../models/comicModel");

const createComic = async (req, res) => {
    try {
        const comic = new Comic(req.body);
        const savedComic = await comic.save();
        res.status(201).json(savedComic);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create comic book' });
    }
};


const getComics = async (req, res) => {
    const { author, year, price , condition , sortBy } = req.query;
    let filter = {};
    if (author) filter.authorName = author;
    if (year) filter.yearOfPublication = year;
    if(price) filter.price = price;
    if(condition) filter.condition = condition
    
  

    try {
        const comics = await Comic.find(filter).sort(sortBy || 'bookName').exec();
        return res.send(comics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comics' });
    }
};

const getComicById = async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json(comic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comic details' });
    }
};

const updateComic = async (req, res) => {
    const{id} = req.params;
    
    try {
        const comic = await Comic.findByIdAndUpdate(id, req.body, { new: true });
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json(comic);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update comic book' });
    }
};

const deleteComic = async (req, res) => {
    const{id} = req.params;
    try {
        const comic = await Comic.findByIdAndDelete(id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json({ message: 'Comic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comic book' });
    }
};

module.exports = { createComic, getComics, getComicById, updateComic, deleteComic };
