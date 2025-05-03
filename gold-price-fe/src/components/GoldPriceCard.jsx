const GoldPriceCard = ({ title, buy, sell, updatedAt }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition">
    <h2 className="text-lg font-bold text-yellow-700 mb-2">{title}</h2>
    <p className="text-green-600 font-semibold">Mua vào: {buy} VND</p>
    <p className="text-red-500 font-semibold">Bán ra: {sell} VND</p>
    {updatedAt && (
      <p className="text-xs text-gray-500 mt-2">
        Cập nhật: {formatDate(updatedAt)}
      </p>
    )}
  </div>
  );
};

export default GoldPriceCard;
