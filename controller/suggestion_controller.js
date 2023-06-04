import Suggestion from '../model/suggestion_model.js';

export const createSuggestion = async (req, res) => {
  try {
    const { name,description } = req.body;
    const newSuggestion = new Suggestion({name, description });
    await newSuggestion.save();
    res.status(201).json(newSuggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const suggestions = await Suggestion.paginate({}, options);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSuggestionById = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.status(200).json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateSuggestion = async (req, res) => {
  try {
    const { name,description } = req.body;
    const updatedSuggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      {name},
      { description },
      { new: true }
    );
    if (!updatedSuggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.status(200).json(updatedSuggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSuggestion = async (req, res) => {
  try {
    const deletedSuggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!deletedSuggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.status(200).json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const deleteAllSuggestions = async (req, res) => {
  try {
    await Suggestion.deleteMany({});
    res.status(200).json({ message: "All suggestions deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something n went wrong" });
  }
};
