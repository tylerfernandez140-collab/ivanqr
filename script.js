const qrDiv = document.getElementById("qrcode");
const input = document.getElementById("qrText"); // Changed from qr-input to qrText
const generateBtn = document.getElementById("generateBtn"); // Changed from generate-btn to generateBtn
const downloadBtn = document.getElementById("downloadBtn"); // Changed from download-btn to downloadBtn

let qrCode; // hold the QRCode instance

generateBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) {
    alert("Please enter text or URL!");
    return;
  }

  // Clear previous QR
  qrDiv.innerHTML = "";

  // Force fixed, high-res QR
  qrCode = new QRCode(qrDiv, {
    text: text,
    width: 512, // high resolution for clear edges
    height: 512,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
});

downloadBtn.addEventListener("click", () => {
  const qrCanvas = qrDiv.querySelector("canvas");

  if (!qrCanvas) {
    alert("Please generate a QR code first!");
    return;
  }

  // --- Create high-resolution export ---
  const exportCanvas = document.createElement("canvas");
  const size = 1024; // 2x the original for clarity
  exportCanvas.width = size;
  exportCanvas.height = size;
  const ctx = exportCanvas.getContext("2d");

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Draw scaled QR exactly
  ctx.imageSmoothingEnabled = false; // crucial: prevents blur
  ctx.drawImage(qrCanvas, 0, 0, size, size);

  // Filename
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0];
  const filename = `ivanqr-${timestamp}.png`;

  // Save clean PNG
  exportCanvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, "image/png");
});