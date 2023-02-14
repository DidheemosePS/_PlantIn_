const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const { sign, verify } = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
dotenv.config({ path: "./.env" });
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);
const db = client.db("PlantIn");
const collectionPost = db.collection("Posts");
const collectionLogin = db.collection("Users");
const collectionAdmin = db.collection("Admin");
const collectionComments = db.collection("PostComments");
const collectionReplays = db.collection("CommentsReplays");
const collectionCategorys = db.collection("Categorys");

app.get("/", async (req, res) => {
  try {
    const data = await collectionPost.find().toArray();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await collectionPost.findOne({
      _id: ObjectId(id),
    });
    res.json({ success: "Success", post });
  } catch (err) {
    res.json({ error: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await collectionLogin.findOne({
      email: email,
      password: password,
    });
    if (login) {
      const accessToken = sign(
        { id: login._id, username: login.name, role: login.role },
        "oieutrnstadasdhj"
      );
      res.json(accessToken);
    } else {
      res.json({ error: "LoginError" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const login = await collectionLogin.findOne({ email: email });

    if (login) {
      res.json("user already exist");
    } else {
      const convert = name.charAt(0).toUpperCase() + name.slice(1);
      await collectionLogin.insertOne({
        name: convert,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: "user",
      }),
        res.json("Success");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/upload", async (req, res) => {
  try {
    const { userid, title, description, category, imageurl, fileurl } =
      req.body;
    if (fileurl) {
      try {
        await collectionPost.insertOne({
          userid,
          title,
          description,
          category,
          imageurl,
          fileurl,
        });
        res.json({ success: "Success" });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await collectionPost.insertOne({
          userid,
          title,
          description,
          category,
          imageurl,
          fileurl: null,
        });
        res.json({ success: "Success" });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    res.json(err);
  }
});

app.get("/category/fetch", async (req, res) => {
  try {
    const response = await collectionCategorys.find().toArray();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/category/add", async (req, res) => {
  try {
    const { addcategory } = req.body;
    const convert = addcategory.charAt(0).toUpperCase() + addcategory.slice(1);
    const exist = await collectionCategorys.findOne({ category: convert });
    if (!exist) {
      try {
        await collectionCategorys.insertOne({ category: convert });
        const response = await collectionCategorys.find().toArray();
        res.json({ success: response });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.send("Already Exists");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/validate", (req, res) => {
  const { sessionStorageToken } = req.body;
  try {
    if (sessionStorageToken) {
      const validToken = verify(sessionStorageToken, "oieutrnstadasdhj");
      if (validToken) {
        res.json({ success: "Logined Successfully", validToken });
      } else {
        res.json({ error: "User not logged in!" });
      }
    } else {
      res.json({ error: "User not logged in!" });
    }
  } catch (err) {
    res.json({ error: "User not logged in!" });
  }
});

app.post("/AdminLogin", async (req, res) => {
  try {
    const { adminId, adminPassword } = req.body;
    const admin = await collectionAdmin.findOne({
      adminid: adminId,
      adminpassword: adminPassword,
    });
    if (admin) {
      const accessToken = sign(
        { id: admin._id, adminname: admin.adminname, role: admin.role },
        "oieutrnstadasdhj"
      );
      res.json(accessToken);
    } else {
      res.json({ error: "LoginError" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin/fetchpost", async (req, res) => {
  try {
    const data = await collectionPost.find().sort({ _id: -1 }).toArray();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/admin/removepost", async (req, res) => {
  try {
    const { id } = req.body;
    const { imageurl, fileurl } = await collectionPost.findOne({
      _id: ObjectId(id),
    });
    await collectionPost.deleteOne({
      _id: ObjectId(id),
    });
    const data = await collectionPost.find().sort({ _id: -1 }).toArray();
    res.json(data);
    await collectionComments.deleteMany({ postid: id });
    await collectionReplays.deleteMany({ postid: id });
    const deleteImage = imageurl.slice(62, -4);
    cloudinary.uploader.destroy(deleteImage);
    if (fileurl) {
      const deleteFile = fileurl.slice(60);
      cloudinary.uploader.destroy(deleteFile, { resource_type: "raw" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/removepost", async (req, res) => {
  try {
    const { id, userid } = req.body;
    const { imageurl, fileurl } = await collectionPost.findOne({
      _id: ObjectId(id),
    });
    await collectionPost.deleteOne({
      _id: ObjectId(id),
    });
    const data = await collectionPost
      .find({ userid: userid })
      .sort({ _id: -1 })
      .toArray();
    data.length ? res.json(data) : res.json({ error: "Not Found" });
    await collectionComments.deleteMany({ postid: id });
    await collectionReplays.deleteMany({ postid: id });
    const deleteImage = imageurl.slice(62, -4);
    cloudinary.uploader.destroy(deleteImage);
    if (fileurl) {
      const deleteFile = fileurl.slice(60);
      cloudinary.uploader.destroy(deleteFile, { resource_type: "raw" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/editpost", async (req, res) => {
  try {
    const {
      postid,
      userid,
      title,
      description,
      category,
      updateimageurl,
      updatefileurl,
    } = req.body;
    if (!updateimageurl && updatefileurl) {
      try {
        const { fileurl } = await collectionPost.findOne({
          _id: ObjectId(postid),
        });
        await collectionPost.updateOne(
          { _id: ObjectId(postid) },
          { $set: { title, description, category, fileurl: updatefileurl } }
        );
        const editPost = await collectionPost
          .find({ userid })
          .sort({ _id: -1 })
          .toArray();
        res.json(editPost);
        const deleteFile = fileurl.slice(60);
        cloudinary.uploader.destroy(deleteFile, { resource_type: "raw" });
      } catch (err) {
        console.log(err);
      }
    } else if (!updatefileurl && updateimageurl) {
      try {
        const { imageurl } = await collectionPost.findOne({
          _id: ObjectId(postid),
        });
        await collectionPost.updateOne(
          { _id: ObjectId(postid) },
          { $set: { title, description, category, imageurl: updateimageurl } }
        );
        const editPost = await collectionPost
          .find({ userid })
          .sort({ _id: -1 })
          .toArray();
        res.json(editPost);
        const deleteImage = imageurl.slice(62, -4);
        cloudinary.uploader.destroy(deleteImage);
      } catch (err) {
        console.log(err);
      }
    } else if (!updatefileurl && !updateimageurl) {
      try {
        await collectionPost.updateOne(
          { _id: ObjectId(postid) },
          { $set: { title, description, category } }
        );
        const editPost = await collectionPost
          .find({ userid })
          .sort({ _id: -1 })
          .toArray();
        res.json(editPost);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { imageurl, fileurl } = await collectionPost.findOne({
          _id: ObjectId(postid),
        });
        await collectionPost.updateOne(
          { _id: ObjectId(postid) },
          {
            $set: {
              title,
              description,
              category,
              imageurl: updateimageurl,
              fileurl: updatefileurl,
            },
          }
        );
        const editPost = await collectionPost
          .find({ userid })
          .sort({ _id: -1 })
          .toArray();
        res.json(editPost);
        const deleteImage = imageurl.slice(62, -4);
        cloudinary.uploader.destroy(deleteImage);
        const deleteFile = fileurl.slice(60);
        cloudinary.uploader.destroy(deleteFile, { resource_type: "raw" });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/profile", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await collectionPost
      .find({ userid: id })
      .sort({ _id: -1 })
      .toArray();
    data.length ? res.json(data) : res.json({ error: "Not Found" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments", async (req, res) => {
  try {
    const { postid, userid, username, comments } = req.body;
    await collectionComments.insertOne({ postid, userid, username, comments });
    const commentsData = await collectionComments
      .find({ postid })
      .sort({ _id: -1 })
      .toArray();
    res.json(commentsData);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/fetch", async (req, res) => {
  try {
    const { id } = req.body;
    const response = await collectionComments
      .find({ postid: id })
      .sort({ _id: -1 })
      .toArray();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/delete", async (req, res) => {
  try {
    const { id, postid } = req.body;
    await collectionComments.deleteOne({ _id: ObjectId(id) });
    const response = await collectionComments.find({ postid }).toArray();
    res.json(response);
    await collectionReplays.deleteMany({ commentid: id });
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/edit", async (req, res) => {
  try {
    const { commentid, postid, comments } = req.body;
    await collectionComments.updateOne(
      { _id: ObjectId(commentid) },
      { $set: { comments } }
    );
    const updatedComment = await collectionComments.find({ postid }).toArray();
    res.json(updatedComment);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/replays", async (req, res) => {
  try {
    const { postid, commentid, userid, username, replay } = req.body;
    if (commentid && username && replay) {
      try {
        await collectionReplays.insertOne({
          postid,
          commentid,
          userid,
          username,
          replay,
        });
        const replayData = await collectionReplays
          .find({ commentid })
          .toArray();
        res.json(replayData);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/replays/fetch", async (req, res) => {
  try {
    const { id } = req.body;
    const response = await collectionReplays.find({ postid: id }).toArray();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/replays/delete", async (req, res) => {
  try {
    const { id, commentid } = req.body;
    await collectionReplays.deleteOne({ _id: ObjectId(id) });
    const response = await collectionReplays.find({ commentid }).toArray();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/comments/replays/edit", async (req, res) => {
  try {
    const { replayid, commentid, replay } = req.body;
    await collectionReplays.updateOne(
      { _id: ObjectId(replayid) },
      { $set: { replay } }
    );
    const updatedReplay = await collectionReplays.find({ commentid }).toArray();
    res.json(updatedReplay);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3004, () => console.log("Connected Successfully"));
