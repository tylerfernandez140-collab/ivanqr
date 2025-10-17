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
  const qrCanvas = document.querySelector("#qrcode canvas");

  if (!qrCanvas) {
    alert("Please generate a QR code first!");
    return;
  }

  // 🕒 Filename with timestamp
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0];
  const filename = `ivanqr-${timestamp}.png`;

  // 🧾 Create a white background (fixes transparency issues)
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = qrCanvas.width;
  canvas.height = qrCanvas.height;

  // White background to ensure scannability
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrCanvas, 0, 0);

  // 💾 Save as PNG using Blob (safe for Android/iOS)
  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, "image/png");
}