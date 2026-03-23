const Item = require('../models/item.model');
const User = require('../models/user.model');

exports.updateBuy = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const buyerId = req.userId;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "L'objet n'existe plus." });
    }

    if (item.sellerId.toString() === buyerId) {
      return res.status(400).json({ message: "Vous ne pouvez pas acheter votre propre objet." });
    }

    const buyer = await User.findById(buyerId);
    const seller = await User.findById(item.sellerId);

    if (buyer.money < item.price) {
      return res.status(400).json({ message: "Fonds insuffisants pour cet achat." });
    }

    buyer.money -= item.price;
    seller.money += item.price;

    await buyer.save();
    await seller.save();

    await Item.findByIdAndDelete(itemId);

    res.status(200).json({ 
      message: "Achat effectué avec succès !",
      boughtItem: item,
      newBalance: buyer.money
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};