import React, { useState, useEffect } from 'react';

const ProductOverview = ({ product, onAddToCart, onBack, onCheckout }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('100g'); // Default size for spices
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setActiveImageIndex(0);
  }, [product]);

  const productImages = product.images
    ? [product.image, ...product.images.filter(img => img !== product.image)]
    : [product.image, product.image, product.image, product.image];

  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'increase') {
      setQuantity(quantity + 1);
    }
  };

  const availableSizes = Object.keys(product.pricing);

  useEffect(() => {
    if (product && product.defaultSize) {
      setSelectedSize(product.defaultSize);
    }
  }, [product]);

  const currentPriceNum = product.pricing[selectedSize] || product.pricing[product.defaultSize];
  const displayPrice = `Rs ${currentPriceNum}`;
  const oldPriceDisplay = `Rs ${Math.round(currentPriceNum * 1.25)}`;

  return (
    <div className="w-full bg-[#FAF5EC] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#e6b753] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Column - Images */}
          <div className="flex flex-row gap-4 md:gap-5 h-fit">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 md:gap-3 w-16 md:w-20 shrink-0">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 p-1 ${activeImageIndex === index ? 'bg-gradient-to-br from-[#e6b753] to-[#d6993a] shadow-lg scale-105' : 'bg-white/50 hover:bg-white opacity-70 hover:opacity-100 border border-[#EADFC8]'}`}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#faf8f5] flex items-center justify-center">
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[4/5] md:aspect-square bg-[#fcf5e5] rounded-[2rem] border border-[#f5e8cd] shadow-lg relative overflow-hidden group">
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#EADFC8] rounded-tl-xl pointer-events-none"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#EADFC8] rounded-br-xl pointer-events-none"></div>
              <img src={productImages[activeImageIndex]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 relative z-10" />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col pt-2 md:pl-2">

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-black text-[#2a2a2a] tracking-tight">{product.name}</h1>
              <span className="bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-6 bg-white/60 backdrop-blur-md w-fit px-6 py-3 rounded-2xl border border-white shadow-sm">
              <span className="text-3xl font-black text-shine">{displayPrice}</span>
              <span className="text-base text-[#9A9286] font-bold line-through mb-1">{oldPriceDisplay}</span>
            </div>

            <p className="text-[#9A9286] font-bold mb-6 leading-relaxed text-sm md:text-base max-w-lg">
              Experience the authentic taste of Sri Lankan spices. {product.description}. Carefully harvested and processed to maintain natural oils and maximum flavor. Perfect for elevating your everyday cooking.
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-[11px] font-black tracking-widest text-[#2a2a2a] uppercase mb-4 flex items-center gap-4">
                Select Size
                <span className="flex-1 h-[1.5px] bg-gradient-to-r from-[#EADFC8] to-transparent"></span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${selectedSize === size
                      ? 'bg-gradient-to-r from-[#e6b753] to-[#d6993a] text-white shadow-[0_10px_20px_rgba(230,183,83,0.3)] border-transparent scale-105'
                      : 'bg-white/80 backdrop-blur-sm border-2 border-[#EADFC8]/60 text-[#9A9286] hover:border-[#e6b753] hover:text-[#2a2a2a] shadow-sm hover:shadow-md'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-5 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-black tracking-widest text-[#2a2a2a] uppercase">Quantity</span>
                <div className="flex items-center bg-white/80 border border-[#EADFC8]/60 rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => handleQuantityChange('decrease')} className="px-4 py-2 text-[#9A9286] hover:bg-white hover:text-[#2a2a2a] transition-colors font-bold text-lg">-</button>
                  <span className="px-4 font-black text-sm text-[#2a2a2a] w-12 text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange('increase')} className="px-4 py-2 text-[#9A9286] hover:bg-white hover:text-[#2a2a2a] transition-colors font-bold text-lg">+</button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => onAddToCart && onAddToCart(product, selectedSize, quantity)}
                  className="bg-[#2a2a2a] btn-shine text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(42,42,42,0.2)] hover:bg-black hover:-translate-y-1 transition-all duration-300 flex-1 md:flex-none"
                >
                  Add To Cart
                </button>

              <button 
                onClick={() => {
                  if (onCheckout) onCheckout({ product, size: selectedSize, quantity });
                }}
                className="bg-gradient-to-r btn-shine from-[#e6b753] to-[#d6993a] text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(230,183,83,0.3)] hover:shadow-[0_15px_30px_rgba(230,183,83,0.4)] hover:-translate-y-1 transition-all duration-300 flex-1 md:flex-none">
                Buy Now
              </button>
            </div>
          </div>

            {/* Meta Info */}
            <div className="flex flex-col gap-3 pt-6 border-t-[1.5px] border-[#EADFC8]/60 text-sm">
              <div className="flex items-center">
                <span className="font-black text-[#2a2a2a] w-24 text-[10px] uppercase tracking-widest">Tags:</span>
                <span className="font-bold text-xs uppercase tracking-wider text-transparent bg-clip-text text-shine inline-block w-fit">Spices, Organic, Sri Lanka</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="font-black text-[#2a2a2a] w-24 text-[10px] uppercase tracking-widest">Share:</span>
                <div className="flex gap-3 text-[#9A9286]">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/80 border border-[#EADFC8] flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors shadow-sm"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out ' + product.name + ' at ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/80 border border-[#EADFC8] flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors shadow-sm"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductOverview;
