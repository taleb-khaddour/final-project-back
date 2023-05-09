import Model from '../model/Admin_Model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const PAGE_SIZE = 10;



 
async function getAll(req, res) {
  try {
    const pageNumber = req.query.page || 1;
    const skipCount = (pageNumber - 1) * PAGE_SIZE;

    const totalAdmin = await Model.countDocuments();
    const totalPages = Math.ceil(totalAdmin / PAGE_SIZE);

    const Admin = await Model.find().skip(skipCount).limit(PAGE_SIZE);

    return res.status(200).json({
      success: true,
      data: Admin,
      pageNumber: pageNumber,
      totalPages: totalPages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



const createAdmin = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { fullname, email, password } = req.body;

    // Validate user input
    if (!(email && password && fullname)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Model.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Model.create({
     fullname:fullname,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    });

    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
  
};





const login = async (req, res) => {
  // Get user input
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await Model.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    res.cookie("auth-token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // user
    return res.status(200).send(user);
  }
  return res.status(400).send("Invalid Credentials");
};





   
  async function getById(req, res, next) {
    try {
      const id = req.params.id
      const event = await Model.findOne({ _id: id })
      if (!event) {
        return res.status(404).send({ success: false, error: 'Event not found' })
      }
      res.status(200).send({ success: true, event })
    } catch (err) {
      res.status(500).send({ success: false, error: err.message })
    }
  }

  function edit(req, res, next) {
    const id = req.params.id;
    const body = req.body;
  
    Model.updateOne({ _id: id }, { $set: body })
      .then(response => {
        if (response.nModified === 0) {
          return res.status(404).send({ success: false, message: "No matching document found." });
        }
        res.status(200).send({ success: true, message: "Document updated successfully.",body,response });
      })
      .catch(err => {
        return next(err);
      });
  }
  
  
  function Delete(req, res, next) {
    const id = req.params.id
    {console.log(id)};
   Model
      .findByIdAndRemove(id)
      .then((response) => {
        if (!response) {
          return res
            .status(404)
            .send({ success: false, message: 'No matching document found.' })
        }
        res
          .status(200)
          .send({
            success: true,
            message: 'Document deleted successfully.',
            response,
          })
      })
      .catch((err) => {
        return next(err)
      })
  }



  async function deleteAll(req, res, next) {
    try {
      const response = await Model.deleteMany();
      res.status(200).send({
        success: true,
        message: "All documents deleted successfully.",
        response,
      });
    } catch (err) {
      return next(err);
    }
  }

  

  const admin = { getAll,createAdmin,edit,Delete,getById,login,deleteAll};
export default admin;