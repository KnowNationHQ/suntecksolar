const sharp = require("sharp")
const { join } = require("path")
const fs = require("fs")

const out = "public"
const LOGO = "public/assets/suntecksolar-logo.png"
const LOGO_W = 1920
const LOGO_H = 695
const BG = "#fdf8ee"

const apple = [76, 120, 152, 167, 180, 512]
const fav = [16, 32, 48, 64]
const anyPwa = [192, 512]
const mask = [192, 512]

async function renderIcon(size, scale) {
  const lw = Math.round(size * scale)
  const lh = Math.round((lw * LOGO_H) / LOGO_W)
  const overlay = await sharp(LOGO).resize(lw, lh, { fit: "fill" }).png().toBuffer()
  return sharp({ create: { width: size, height: size, channels: 3, background: BG } })
    .composite([{ input: overlay, left: Math.round((size - lw) / 2), top: Math.round((size - lh) / 2) }])
    .png()
    .toFile(join(out, "tmp-icon.png"))
    .then(() => "public/tmp-icon.png")
}

async function main() {
  for (const s of apple) {
    await renderIcon(s, 0.76)
    const n = s === 180 ? "apple-touch-icon.png" : `apple-touch-icon-${s}.png`
    await sharp("public/tmp-icon.png").flatten({ background: BG }).png().toFile(join(out, n))
  }
  for (const s of fav) {
    await renderIcon(s, 0.8)
    const name = s === 64 ? "favicon.png" : `favicon-${s}.png`
    await sharp("public/tmp-icon.png").png().toFile(join(out, name))
  }
  for (const s of anyPwa) {
    await renderIcon(s, 0.76)
    await sharp("public/tmp-icon.png").png().toFile(join(out, `icon-${s}.png`))
  }
  for (const s of mask) {
    await renderIcon(s, 0.76)
    await sharp("public/tmp-icon.png").png().toFile(join(out, `maskable-${s}.png`))
  }
  fs.unlinkSync("public/tmp-icon.png")
  console.log("icons regenerated from logo")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
