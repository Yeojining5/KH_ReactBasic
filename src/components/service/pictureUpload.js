class PictureUpload {
  async upload(file) {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "crfzo1sf") // preset name 
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/drxxdsv01/upload", // coud name 
      {
        method: "POST",
        body: data,
      }
    )
    return await result.json()
  }
}
export default PictureUpload