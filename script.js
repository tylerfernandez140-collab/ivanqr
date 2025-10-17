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

function downloadQR(qrSrc) {
  const qrImage = document.querySelector('#qrcode img');
  if (qrImage) {
    fetch(qrImage.src)
      .then(res => res.blob())
      .then(blob => {
        // 🕒 Create a readable timestamp (YYYY-MM-DD_HH-MM-SS)
        const now = new Date();
        const formattedDate = now.toISOString().replace('T', '_').split('.')[0].replace(/:/g, '-');

        // 🏷️ Automatic name + your brand
        const filename = `qrcode-ivanqr-${formattedDate}.png`;

        // 💾 Download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  }
}