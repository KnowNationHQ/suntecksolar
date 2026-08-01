const sharp = require("sharp")
const { join } = require("path")
const fs = require("fs")

const out = "public/splash"
fs.mkdirSync(out, { recursive: true })

const BG = "#fdf8ee"
const LOGO = "public/assets/suntecksolar-logo.png"
const LOGO_W = 1920
const LOGO_H = 695

// [name, logicalWidth, logicalHeight, dpr]
const devices = [
  ["iphone-pro-max", 430, 932, 3],
  ["iphone-pro", 402, 874, 3],
  ["iphone", 393, 852, 3],
  ["iphone-12", 390, 844, 3],
  ["iphone-se", 375, 667, 2],
  ["ipad-pro-12", 1024, 1366, 2],
  ["ipad-pro-11", 834, 1194, 2],
  ["ipad", 810, 1080, 2],
  ["ipad-mini", 744, 1133, 2],
]

async function splash(name, w, h) {
  const lw = Math.round(w * 0.66)
  const lh = Math.round((lw * LOGO_H) / LOGO_W)
  const left = Math.round((w - lw) / 2)
  const top = Math.round((h - lh) / 2)
  const overlay = await sharp(LOGO).resize(lw, lh, { fit: "fill" }).png().toBuffer()
  await sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .composite([{ input: overlay, left, top }])
    .png()
    .toFile(join(out, name))
  console.log("wrote", name, w + "x" + h)
}

async function main() {
  for (const [n, lw, lh, dpr] of devices) {
    await splash(`${n}.png`, lw * dpr, lh * dpr)
    await splash(`${n}-landscape.png`, lh * dpr, lw * dpr)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
