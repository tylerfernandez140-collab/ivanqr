let qrcode;

function generateQR() {
  const qrText = document.getElementById("qrText").value;
  const qrContainer = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("downloadBtn");

  qrContainer.innerHTML = "";

  if (qrText.trim() === "") {
    alert("Please enter text or URL first!");
    return;
  }

  qrcode = new QRCode(qrContainer, {
    text: qrText,
    width: 200,
    height: 200
  });

  setTimeout(() => {
    const qrImage = qrContainer.querySelector("img");
    if (qrImage) {
      downloadBtn.style.display = "inline-block";
      downloadBtn.onclick = () => downloadQR(qrImage.src);
    }
  }, 300);
}

function downloadQR() {
  const qrDiv = document.getElementById("qrcode");
  if (!qrDiv.querySelector("canvas")) {
    alert("Please generate a QR code first!");
    return;
  }

  // Rebuild a clean QR for saving
  const qrCanvas = document.createElement("canvas");
  const size = 500; // high-quality output
  qrCanvas.width = size;
  qrCanvas.height = size;
  const ctx = qrCanvas.getContext("2d");

  // Fill with white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Get text from input
  const text = document.getElementById("qrText").value.trim();
  if (!text) {
    alert("Please enter text or URL to generate QR code first!");
    return;
  }

  // Use qrcode.js to rebuild high-res QR
  const tempDiv = document.createElement("div");
  new QRCode(tempDiv, {
    text: text,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Copy QR from temp canvas to new one
  const tempCanvas = tempDiv.querySelector("canvas");
  ctx.drawImage(tempCanvas, 0, 0, size, size);

  // Create automatic filename
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0];
  const filename = `ivanqr-${timestamp}.png`;

  // Use Blob method for safe downloading (works on Android)
  qrCanvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, "image/png", 1.0);
}