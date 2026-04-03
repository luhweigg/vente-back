const Item = require('../models/item.model');

exports.getOneItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Objet non trouvé" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMyItems = async (req, res) => {
  try {
    const myItems = await Item.find({ sellerId: req.userId });
    res.status(200).json(myItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    
    let filter = { sellerId: { $ne: req.userId } };

    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    const items = await Item.find(filter).populate('sellerId', 'username').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    if (error.message !== "Accès refusé. Veuillez vous connecter.") {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    let imageUrl = 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=300&q=80';
    
    if (req.file) {
      imageUrl = req.file.secure_url || req.file.url || req.file.path;
    }

    const newItem = new Item({
      title,
      description,
      price,
      imageUrl,
      sellerId: req.userId
    });

    await newItem.save();
    res.status(201).json({ message: "Objet mis en vente avec succès", item: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ 
      _id: req.params.itemId, 
      sellerId: req.userId 
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Objet non trouvé ou vous n'êtes pas autorisé à le supprimer." });
    }

    res.status(200).json({ message: "Objet retiré de la vente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};