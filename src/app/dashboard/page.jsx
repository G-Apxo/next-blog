"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleImagesChange = (e) => {
    setFile([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesURL = await Promise.all(
      Array.from(file).map(async (image) => {
        console.log(image);
        const imageRef = ref(storage, `images/${image.name}`);
        const uploadResult = await uploadBytes(imageRef, image);
        return getDownloadURL(uploadResult.ref);
      })
    );
    console.log(imagesURL);

    await addDoc(collection(db, "blogs"), {
      title,
      description,
      smallDescription,
      imagesURL,
    });
    setFile(null);
    setTitle("");
    setDescription("");
    setSmallDescription("");
  };

  return (
    <div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-mb-5">
              <label htmlFor="email" className="formbold-form-label">
                Send files to this email:
              </label>
              <input
                type="text"
                name="text"
                id="tet"
                placeholder="Enter your Blog Title"
                className="formbold-form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="text"
                id="tet"
                placeholder="Enter your Blog Small Description"
                className="formbold-form-input"
                value={smallDescription}
                onChange={(e) => setSmallDescription(e.target.value)}
              />
              <input type="checkbox" />
              <textarea
                name="text"
                id="tet"
                placeholder="Enter your Blog  Description"
                className="formbold-form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-6 pt-4">
              <label className="formbold-form-label formbold-form-label-2">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="formbold-form-input"
                onChange={handleImagesChange}
              />
            </div>
            <div>
              <button className="formbold-btn w-full" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
