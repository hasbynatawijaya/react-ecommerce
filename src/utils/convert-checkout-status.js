const checkoutStatusConvert = (status) => {
  if (status === "process") {
    return "Menunggu Pembayaran";
  } else if (status === "paid") {
    return "Menunggu Konfirmasi Penjual";
  } else if (status === "accepted") {
    return "Pesanan sudah dikirim";
  } else return "-";
};
export default checkoutStatusConvert;
