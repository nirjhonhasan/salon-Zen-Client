// Upload an image and return its public URL.
// The image goes to OUR server route (/api/upload), which talks to ImgBB.
// The ImgBB key stays on the server, so the browser never sees it.
// Used by the sign-up form, the profile form and the service form.
export async function uploadImageToImgBB(
  file: File,
  purpose?: "service"
): Promise<string> {
  const formData = new FormData()
  formData.append("image", file)

  // "service" tells the server this is a service picture (admin only).
  if (purpose) {
    formData.append("purpose", purpose)
  }

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Image upload failed. Please try again.")
  }

  return data.url
}
