import { useState } from "react";
import { createLostPet } from "../services/lost_pet";

const Lostpet = () => {
  const [formData, setFormData] = useState({
    breed: "",
    age: "",
    gender: "male",
    description: "",
    title: "",
    help: false,
    account_number: [],
    location: "",
    aggresive: false,
    status: "lost",
    languageCode: "en",
    userId: 2,
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setImages(Array.from(files));
    } else if (name === "videos") {
      setVideos(Array.from(files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("breed", formData.breed);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("description", formData.description);
    data.append("title", formData.title);
    data.append("help", formData.help);
    data.append("account_number", formData.account_number.join(", "));
    data.append("location", formData.location);
    data.append("aggresive", formData.aggresive);
    data.append("status", formData.status);
    data.append("languageCode", formData.languageCode);
    data.append("userId", formData.userId);

    images.forEach((file) => {
      data.append("images", file);
    });

    videos.forEach((file) => {
      data.append("videos", file);
    });

    try {
      const resp = await createLostPet(data);
      console.log(resp);
    } catch (error) {
      console.error("Failed to create lost pet:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add Lost Pet</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Breed:
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="ხვადი">ხვადი</option>
              <option value="ძუ">ძუ</option>
            </select>
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </label>
          <label className="block mb-2">
            Help Needed:
            <input
              type="checkbox"
              name="help"
              checked={formData.help}
              onChange={handleChange}
              className="ml-2"
            />
          </label>
          {formData.help && (
            <label className="block mb-2">
              Account Numbers:
              <input
                type="text"
                name="account_number"
                value={formData.account_number.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    account_number: e.target.value.split(", "),
                  })
                }
                className="mt-1 block w-full"
              />
            </label>
          )}
          <label className="block mb-2">
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Aggressive:
            <input
              type="checkbox"
              name="aggresive"
              checked={formData.aggresive}
              onChange={handleChange}
              className="ml-2"
            />
          </label>
          <label className="block mb-2">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </label>
          <label className="block mb-2">
            Language Code:
            <input
              type="text"
              name="languageCode"
              value={formData.languageCode}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Images:
            <input
              type="file"
              name="images"
              id="images"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </label>
          <label className="block mb-2">
            Videos:
            <input
              type="file"
              name="videos"
              id="videos"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lostpet;
