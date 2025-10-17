document.addEventListener("DOMContentLoaded", () => {
  const qrDiv = document.getElementById("qrcode");
  const input = document.getElementById("qr-input");
  const generateBtn = document.getElementById("generate-btn");
  const downloadBtn = document.getElementById("download-btn");

  let qrCode; // hold the QRCode instance

  if (generateBtn && downloadBtn && input && qrDiv) {
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

      // --- Settings ---
      const scale = 4; // quality multiplier
      const padding = 100; // white margin around QR

      const size = qrCanvas.width * scale + padding * 2;

      // --- Create export canvas ---
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = size;
      exportCanvas.height = size;
      const ctx = exportCanvas.getContext("2d");

      // White background (including margin)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);

      // Disable smoothing to keep sharp edges
      ctx.imageSmoothingEnabled = false;

      // Draw QR centered with white border
      ctx.drawImage(
        qrCanvas,
        padding,
        padding,
        qrCanvas.width * scale,
        qrCanvas.height * scale
      );

      // Generate filename with timestamp
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0];
      const filename = `ivanqr-${timestamp}.png`;

      // Convert and download
      exportCanvas.toBlob(
        (blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        },
        "image/png",
        1.0
      );
    });
  }
});