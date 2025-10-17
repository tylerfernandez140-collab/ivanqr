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
  const a = document.createElement("a");
  a.href = qrSrc;
  a.download = "ivanqr.png";
  a.click();
}