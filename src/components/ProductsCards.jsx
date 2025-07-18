 const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <img
        src={product.productImage}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2 text-green-800">
        {product.title}
      </h3>
      <h3 className="text-lg font-semibold mt-2 text-green-800">
        {product.description}
      </h3>
      <p className="text-gray-600">{product.price}$</p>

      <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add to Cart
      </button>
      <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        buy now
      </button>
    </div>
  );
};
