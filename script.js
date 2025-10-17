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
  const qrCanvas = document.querySelector('#qrcode canvas');
  if (!qrCanvas) return alert("Please generate a QR code first!");

  // Create a temporary high-res canvas
  const tempCanvas = document.createElement('canvas');
  const scale = 4; // makes it 4x sharper
  tempCanvas.width = qrCanvas.width * scale;
  tempCanvas.height = qrCanvas.height * scale;

  const ctx = tempCanvas.getContext('2d');

  // Fill white background for better contrast
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw scaled QR
  ctx.drawImage(qrCanvas, 0, 0, tempCanvas.width, tempCanvas.height);

  // Automatic filename
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0];
  const filename = `qrcode-ivanqr-${timestamp}.png`;

  // Create download link
  const link = document.createElement('a');
  link.href = tempCanvas.toDataURL('image/png', 1.0); // 1.0 = full quality
  link.download = filename;
  link.click();
}