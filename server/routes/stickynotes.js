const express = require("express");
const multer = require("multer");
const router = express.Router();
const fetch = require("node-fetch");
const StickyNote = require("../models/StickyNote");

const upload = multer();

//Get stickynote by id, route /api/stickynotes/property/:id
router.get("/propertyStickyNotes", async (req, res) => {
  try {
    const { propertyIds } = req.query;
    let propertyNotes;
    if (propertyIds?.length > 0) {
      propertyNotes = await StickyNote.find({
        propertyId: { $in: propertyIds },
      }).populate("userId", "username -_id");
    } else {
      propertyNotes = await StickyNote.find()
        .sort({ _id: -1 })
        .limit(5)
        .populate("propertyId", "name -_id")
        .populate("userId", "username -_id");
    }

    if (!propertyNotes) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(propertyNotes);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    // const file = req.file;
    const { date, time, propertyId, userId, description } = req.body;
    // const response = await fetch(
    //   "https://content.dropboxapi.com/2/files/upload",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
    //       "Dropbox-API-Arg": JSON.stringify({
    //         path: `/myfiles/${file.originalname}`,
    //         mode: "add",
    //         autorename: true,
    //         mute: false,
    //         strict_conflict: false,
    //       }),
    //       "Content-Type": "application/octet-stream",
    //     },
    //     body: file.buffer, // Use the Buffer of the file for upload
    //   }
    // );
    // const data = await response.json();
    // console.log("*data: ", data);

    // if (!data?.name) {
    //   console.error("Failed to upload file.");
    //   res.status(500).json({ message: "Failed to upload file." });
    //   return;
    // }

    // // Create a shared link for the uploaded file
    // const sharedLinkResponse = await fetch(
    //   "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       path: `/myfiles/${file.originalname}`,
    //       settings: {
    //         requested_visibility: "public",
    //       },
    //     }),
    //   }
    // );

    // const sharedLinkData = await sharedLinkResponse.json();
    // console.log("*sharedLinkData: ", sharedLinkData);

    // if (!sharedLinkData.url) {
    //   console.error("Failed to create shared link.");
    //   res.status(500).json({ message: "Failed to create shared link." });
    //   return;
    // }

    // Save the note in the database, including the Dropbox file path and shared link URL
    const newNote = new StickyNote({
      date,
      time,
      propertyId,
      userId,
      description,
      //   filePath: `/myfiles/${file.originalname}`,
      //   sharedLink: sharedLinkData.url,
    });

    const savedNote = await newNote.save();

    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update sticky note route, route: /api/stickynotes/update
router.put("/update", upload.single("file"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData?._id) {
      const updatedNote = await StickyNote.findByIdAndUpdate(
        updateData._id,
        updateData,
        {
          new: true,
        }
      );
      res.json(updatedNote);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Read
router.get("/stickynotes", async (req, res) => {
  try {
    const notes = await StickyNote.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
