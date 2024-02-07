export default function getImage(byteArr) {
  const byteImageArray = JSON.parse(byteArr.image); // "image": "[-119, 80, 78, 71...]"

  const blob = new Blob([new Uint8Array(byteImageArray)], { type: 'image/png' });

  const imageUrl = URL.createObjectURL(blob);

  return imageUrl
}