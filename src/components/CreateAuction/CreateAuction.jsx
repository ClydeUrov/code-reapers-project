import { useState } from "react";
import {
  postAuction,
  postAuctionImages,
  updateAuction,
} from "../../helpers/api";
import { getUserLS } from "../../helpers/localStorage";
import getImage from "../../helpers/bitToImg";
import ImageList from "./ImageList";

const CreateAuction = ({ closeModal, auction }) => {
  const [images, setImages] = useState(
    auction?.photos.length > 0
      ? auction.photos.map((item) => getImage(item.image))
      : [],
  );
  const [formData, setFormData] = useState({
    title: auction?.title ?? "",
    startPrice: auction?.startPrice ?? "",
    startTime: auction?.startTime ?? "",
    description: auction?.description ?? "",
  });
  const [imgFiles, setImgFiles] = useState([]);
  const { email } = getUserLS();

  const data = new Date();
  data.setHours(data.getHours() + 2);
  const currentData = data.toISOString().slice(0, 16);

  const handleImageChangeOrDrop = async (e, index) => {
    const file = e.target.files?.[0] ?? e.dataTransfer.files?.[0];

    if (file) {
      setImgFiles((prevFile) => [...prevFile, file]);

      try {
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auctionId;
      formData.startTime = formData.startTime.slice(0, -2) + "00";
      if (auction) {
        formData.id = auction.id;
        auctionId = await updateAuction({ data: formData });
      } else {
        auctionId = await postAuction({ userEmail: email, data: formData });
      }

      if (imgFiles && imgFiles.length > 0 && images.length > 0) {
        const formImages = new FormData();
        imgFiles.forEach((item) => {
          formImages.append("image", item);
        });
        await postAuctionImages({ auctionId: auctionId, data: formImages });
      }
      closeModal();
    } catch (e) {
      closeModal();
      console.log(e);
    }
  };

  return (
    <div>
      <h2 className="mb-6  text-center text-[40px]">
        {auction ? "Оновлення аукціону" : "Створення аукціону"}
      </h2>
      <form className="flex h-fit gap-5" onSubmit={handleSubmit}>
        <div className="w-1/2">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Назва лота"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-[18px] border border-gray-300 p-3"
              maxLength={64}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Стартова ціна"
              id="startPrice"
              max={5000}
              name="startPrice"
              value={formData.startPrice}
              onChange={handleChange}
              className="w-full rounded-[18px] border border-gray-300 p-3"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="datetime-local"
              placeholder="Початок аукціону"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-[18px] border border-gray-300 p-3"
              step="3600"
              min={currentData}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              id="description"
              placeholder="Опис"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="max-h-[205px] w-full rounded-[18px] border border-gray-300 p-3"
              maxLength={256}
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-[18px] bg-gray-400 px-8 py-3 text-2xl text-white hover:bg-gray-500"
          >
            {auction ? "Оновити лот" : "Опублікувати лот"}
          </button>
        </div>
        <ImageList
          images={images}
          handleImageChangeOrDrop={handleImageChangeOrDrop}
        />
      </form>
    </div>
  );
};

export default CreateAuction;
