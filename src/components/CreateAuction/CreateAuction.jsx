import { useState } from "react";
import { AiOutlinePicture, AiOutlineDelete } from "react-icons/ai";
import { postAuction, postAuctionImages } from "../../helpers/api";
import { getUserLS } from "../../helpers/localStorage";
import { toast } from "react-toastify";
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
  const [file, setFile] = useState([]);
  const { email } = getUserLS();

  const handleImageChangeOrDrop = async (e, index) => {
    const file = e.target.files?.[0] ?? e.dataTransfer.files?.[0];

    if (file) {
      setFile((prevFile) => [...prevFile, file]);

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
      const auction = await toast.promise(
        postAuction({ userEmail: email, data: formData }),
        {
          pending: "Request in progress",
          success: "Auction created successfully!",
          error: "Auction was not created",
        },
      );
      if (images.length > 0) {
        const formImages = new FormData();
        file.forEach((item) => {
          formImages.append("image", item);
        });
        await postAuctionImages({ auctionId: auction, data: formImages });
      }
    } catch (e) {
      console.log(e);
    }

    closeModal();
  };

  return (
    <div>
      <h2 className="mb-4 mt-10 text-center text-[40px]">Створення аукціону</h2>
      <form className="flex gap-5" onSubmit={handleSubmit}>
        <div className="w-1/2">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Назва лота"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-[18px] border border-gray-300 p-3"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Стартова ціна"
              id="startPrice"
              name="startPrice"
              value={formData.startPrice}
              onChange={handleChange}
              className="w-full rounded-[18px] border border-gray-300 p-3"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="datetime-local"
              placeholder="Початок аукціону"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-[18px] border border-gray-300 p-3"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              placeholder="Опис"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="max-h-[205px] w-full rounded-[18px] border border-gray-300 p-3"
            />
          </div>
          <button
            type="submit"
            className="rounded-[18px] bg-gray-400 px-8 py-3 text-2xl text-white hover:bg-gray-500"
          >
            {auction ? "Оновити лот" : "Опублікувати лот"}
          </button>
        </div>
        <ImageList images={images} handleImageChangeOrDrop={handleImageChangeOrDrop} />
      </form>
      <p className="mb-4 text-right text-gray-600">
        Перше фото буде на обкладинці лота. <br />
        Перетягніть, щоб змінити порядок фото
      </p>
    </div>
  );
};

export default CreateAuction;
