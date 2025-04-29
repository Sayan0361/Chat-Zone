// Importing mongoose for defining schema and interacting with MongoDB
const mongoose = require('mongoose');

// Importing bcryptjs for hashing (encrypting) passwords
const bcrypt = require('bcryptjs');

// Creating the schema (blueprint) for users
const userSchema = mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true, // must be provided
    },

    // User's email address (must be unique)
    email: {
      type: String,
      required: true, // cannot be empty
      unique: true,   // no two users can have the same email
    },

    // User's password (will be encrypted before saving to database)
    password: {
      type: String,
      required: true,
    },

    // Optional profile picture for the user, default is a URL
    pic: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F50384089573792871%2F&psig=AOvVaw2zOpyVQ_vUbiWPUZKXCnlI&ust=1745063811399000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCKw7jD4YwDFQAAAAAdAAAAABAE"
    }
  },
  {
    // Adds createdAt and updatedAt fields automatically
    timestamps: true,
  }
);

// ===============================
// 🔒 METHOD: Match Password
// This method will be used during login to check if the entered password matches the hashed one stored in the DB
// ===============================
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ===============================
// 🔐 PRE-SAVE MIDDLEWARE: Hash password before saving
// This function runs *before* saving the document to DB
// Only runs if password is newly created or modified
// ===============================
userSchema.pre('save', async function (next) {
  // If password field hasn't changed, skip hashing
  if (!this.isModified('password')) return next();

  // Generate salt (random value added to password before hashing)
  const salt = await bcrypt.genSalt(8); // higher number means stronger encryption

  // Hash the password using the salt and replace the plain password
  this.password = await bcrypt.hash(this.password, salt);
});

// ===============================
// 🔐 PRE-SAVE MIDDLEWARE: Hash password before saving
// This function runs *before* saving the document to DB
// Only runs if password is newly created or modified
// ===============================
userSchema.pre('save', async function (next) {
  // If password field hasn't changed, skip hashing
  if (!this.isModified('password')) return next();

  // Generate salt (random value added to password before hashing)
  const salt = await bcrypt.genSalt(8); // higher number means stronger encryption

  // Hash the password using the salt and replace the plain password
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating the model from the schema
const User = mongoose.model("User", userSchema);

// Exporting the model so it can be used in routes and controllers
module.exports = User;
