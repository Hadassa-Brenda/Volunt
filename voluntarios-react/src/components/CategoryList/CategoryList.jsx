import { POPULAR_CATEGORIES } from '../../constants/categories';
import './CategoryList.css';

export default function CategoryList({ activeCategory, onCategorySelect }) {
  return (
    <section className="category-list" id="categorias">
      <h2>Categorias populares</h2>

      <div className="category-list__strip">
        {POPULAR_CATEGORIES.map(({ name, value, icon: Icon, tone }) => {
          const categoryValue = value || name;
          const isActive = activeCategory === categoryValue;

          return (
            <button
              className={`category-list__item ${isActive ? 'category-list__item--active' : ''}`}
              key={name}
              type="button"
              onClick={() => onCategorySelect(categoryValue)}
            >
              <span className={`category-list__icon category-list__icon--${tone}`}>
                <Icon size={20} />
              </span>
              <small>{name}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
