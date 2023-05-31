import Flavour from "../model/flavour_Model.js";


// Create a new flavour
async function createFlavour(req, res, next) {
  try {
    const newFlavour = new Flavour(req.body);
    const savedFlavour = await newFlavour.save();
    res.status(200).send({ success: true, data: savedFlavour });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
}

//get by id 


async function  getFlavourById (req, res) {
    try {
      const flavour = await Flavour.findById(req.params.id);
      if (!flavour) {
        return res.status(404).json({ message: "Flavour not found" });
      }
      res.status(200).json(flavour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// Get all flavours with pagination
const getFlavours = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const filters = {};
  
      if (req.query.name) {
        filters.name = { $regex: new RegExp("^" + req.query.name, "i") };
      }
  
      const flavours = await Flavour.paginate(filters, { page, limit });
  
      if (!flavours.docs.length) {
        throw new NotFoundError(`No flavour found`);
      }
  
      return res.status(200).json({
        success: true,
        data: flavours,
      });
    } catch (error) {
      next(error);
    }
  };
// Get a flavour by name
async function getFlavourByName(req, res, next) {
  try {
    const name = req.params.name;
    const regex = new RegExp(name, "i");
    const flavour = await Flavour.findOne({ name: regex });
    if (!flavour) {
      return res
        .status(404)
        .send({ success: false, error: "Flavour not found" });
    }
    res.status(200).send({ success: true, data: flavour });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

// Update a flavour by ID
async function updateFlavour(req, res, next) {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const flavour = await Flavour.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!flavour) {
      throw new Error("Flavour not found");
    }
    res.status(200).send({ success: true, data: flavour });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

// Delete a flavour by ID
async function deleteFlavour(req, res, next) {
  try {
    const id = req.params.id;
    const flavour = await Flavour.findByIdAndRemove(id);
    if (!flavour) {
      return res
        .status(404)
        .send({ success: false, error: "Flavour not found" });
    }
    res.status(200).send({
      success: true,
      message: "Flavour deleted successfully",
      data: flavour,
    });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

export { createFlavour, getFlavours, getFlavourByName, updateFlavour, deleteFlavour , getFlavourById };
