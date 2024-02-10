import React from "react";
import { AiOutlinePicture } from "react-icons/ai";

const ImageList = ({ images, handleImageChangeOrDrop }) => {
  return (
    <div className="grid h-fit w-fit grid-cols-2 gap-4">
      {[...Array(4)].map((_, index) => (
        <section
          key={index}
          className="flex items-center justify-center"
          style={{ height: "fit-content" }}
        >
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleImageChangeOrDrop(e, index);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <label
              htmlFor={`fileInput${index}`}
              className="flex h-36 w-36 cursor-pointer items-center justify-center rounded-lg border border-gray-300"
            >
              {images[index] ? (
                <img
                  src={images[index]}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
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
          </div>
        </section>
      ))}
      <p className="col-span-full mb-4 text-right text-gray-600">
        Перше фото буде на обкладинці лота. <br />
        Перетягніть, щоб змінити порядок фото
      </p>
    </div>
  );
};

export default ImageList;
