import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        <div>
          <h2>Kategori populer</h2>
          <p>Pilih kategori untuk memfilter daftar thread dari sisi front-end.</p>
        </div>
      </div>

      <div className="chip-group">
        <button
          type="button"
          className={`chip ${selectedCategory === 'all' ? 'chip--active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${selectedCategory === category ? 'chip--active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </section>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
