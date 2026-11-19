// Upload an image to ImgBB and return its public URL.
// Used by the sign-up form and the profile form.
export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_IMGBB_API_KEY is missing from .env")
  }

  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await response.json()

  if (!data.success) {
    throw new Error("Image upload failed. Please try again.")
  }

  return data.data.url
}
