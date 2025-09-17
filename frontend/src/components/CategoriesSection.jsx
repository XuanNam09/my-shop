import React from 'react';

function CategoriesSection({ isVisible, showSection, setSelectedCategory }) {
  return (
    <section id="categoriesSection" className={`py-20 bg-white ${isVisible ? '' : 'hidden'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Danh mục sản phẩm</h2>
          <p className="text-xl text-gray-600">Tìm kiếm theo từng danh mục yêu thích</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="category-card p-8 text-center cursor-pointer" onClick={() => { showSection('products'); setSelectedCategory('clothing'); }}>
            <div className="text-5xl mb-4">👔</div>
            <h3 className="text-xl font-bold mb-2">Quần áo</h3>
            <p className="text-sm text-gray-600">Áo vest, jeans, váy</p>
          </div>
          <div className="category-card p-8 text-center cursor-pointer" onClick={() => { showSection('products'); setSelectedCategory('shoes'); }}>
            <div className="text-5xl mb-4">👟</div>
            <h3 className="text-xl font-bold mb-2">Giày</h3>
            <p className="text-sm text-gray-600">Thể thao, cao gót, lười</p>
          </div>
          <div className="category-card p-8 text-center cursor-pointer" onClick={() => { showSection('products'); setSelectedCategory('bags'); }}>
            <div className="text-5xl mb-4">👜</div>
            <h3 className="text-xl font-bold mb-2">Túi xách</h3>
            <p className="text-sm text-gray-600">Balo, túi đeo chéo</p>
          </div>
          <div className="category-card p-8 text-center cursor-pointer" onClick={() => { showSection('products'); setSelectedCategory('accessories'); }}>
            <div className="text-5xl mb-4">⌚</div>
            <h3 className="text-xl font-bold mb-2">Phụ kiện</h3>
            <p className="text-sm text-gray-600">Đồng hồ, trang sức</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;