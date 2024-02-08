import { useState } from "react";
import { AiOutlinePicture, AiOutlineDelete } from "react-icons/ai";
import { postAuction, postAuctionImages } from "../helpers/api";

const CreateAuction = ({closeModal}) => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    lotName: '',
    startPrice: '',
    auctionTime: '',
    description: '',
  });
  const formImages = new FormData();
  const user = getUser();

  const handleImageChangeOrDrop = async (e, index) => {
    console.log(e.target?.files, e.dataTransfer?.files)
    const file = e.target.files?.[0] ?? e.dataTransfer.files?.[0];

    if (file) {
      console.log("file", file);
      
      formImages.append("images", file);

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
    const auction = await postAuction(user.email, formData);
    if(formImages) {
      await postAuctionImages(auction.id, formImages);
    }
    
    console.log(formData);
    console.log(images);
    // closeModal()
  }

  return (
    <div>
      <h2 className="mt-10 mb-4 text-center text-[40px]">Створення аукціону</h2>
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
              id="auctionTime"
              name="auctionTime"
              value={formData.auctionTime}
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
            // onClick={() => closeModal()}
          >
            Опублікувати лот
          </button>
        </div>
        <div className="grid w-1/2 grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <section key={index} className="flex items-center justify-center">
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  handleImageChangeOrDrop(e, index);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <label
                  htmlFor={`fileInput${index}`}
                  className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg border border-gray-300"
                >
                  {images[index] ? (
                    <img src={images[index]} alt="Uploaded" />
                  ) : index === 0 ? (
                    <p className="text-gray-400">Додати фото</p>
                  ) : (
                    <AiOutlinePicture className="cursor-pointer text-8xl text-gray-200" />
                  )}
                </label>
                <input
                  id={`fileInput${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChangeOrDrop(e, index)}
                  style={{ display: "none" }}
                />
                {images[index] ? (
                  <div className="" onClick={() => {}}>
                    <AiOutlineDelete />
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </form>
      <p className="text-right text-gray-600 mb-4">
        Перше фото буде на обкладинці лота. <br />
        Перетягніть, щоб змінити порядок фото
      </p>
    </div>
  );
};

export default CreateAuction;
