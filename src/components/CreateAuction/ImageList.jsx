import React from 'react'
import { AiOutlineDelete, AiOutlinePicture } from 'react-icons/ai';

const ImageList = ({images, handleImageChangeOrDrop}) => {
  return (
    <div className="grid w-1/2 grid-cols-2 gap-4">
      {[...Array(4)].map((_, index) => (
        <section key={index} className="flex items-center justify-center" style={{ height: 'fit-content' }}>
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
    </div>
  )
}

export default ImageList;