import { getCurrentUser } from "@/lib/session"

// Only these image types, up to 5 MB, can be uploaded.
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024

// Receives an image from our own pages and uploads it to ImgBB.
// The ImgBB key stays here on the server. The browser never sees it.
export async function POST(request: Request) {
  // Step 1: read the form data sent by the browser.
  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return Response.json({ message: "Invalid upload." }, { status: 400 })
  }

  const file = formData.get("image")
  const purpose = formData.get("purpose")

  // Step 2: who is uploading? (null means not logged in)
  // Visitors who are not logged in may upload only a sign-up picture.
  const user = await getCurrentUser()

  if (user?.isBlocked) {
    return Response.json(
      { message: "Your account is blocked." },
      { status: 403 }
    )
  }

  // Service pictures can be uploaded by an admin only.
  if (purpose === "service" && user?.role !== "admin") {
    return Response.json({ message: "Admin access only." }, { status: 403 })
  }

  // Step 3: check the file itself.
  if (!(file instanceof File)) {
    return Response.json(
      { message: "Please choose an image." },
      { status: 400 }
    )
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json(
      { message: "Only JPG, PNG or WEBP images are allowed." },
      { status: 400 }
    )
  }

  if (file.size > MAX_SIZE) {
    return Response.json(
      { message: "The image must be smaller than 5 MB." },
      { status: 400 }
    )
  }

  // Step 4: send the image to ImgBB with our secret key.
  const apiKey = process.env.IMGBB_API_KEY

  if (!apiKey) {
    console.error("IMGBB_API_KEY is missing from .env")
    return Response.json(
      { message: "Image upload is not set up on the server." },
      { status: 500 }
    )
  }

  const imgbbForm = new FormData()
  imgbbForm.append("image", file)

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body: imgbbForm }
    )
    const data = await response.json()

    if (!data.success) {
      return Response.json(
        { message: "Image upload failed. Please try again." },
        { status: 502 }
      )
    }

    // Send back only the public link, never the key.
    return Response.json({ url: data.data.url })
  } catch (error) {
    console.error("ImgBB upload error:", error)
    return Response.json(
      { message: "Image upload failed. Please try again." },
      { status: 502 }
    )
  }
}
