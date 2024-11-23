import { Link } from "react-router-dom";
import { useRef } from "react";

function CategoryCard({ categories = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="position-relative my-2">
      <button 
        className="btn btn-light position-absolute top-50 start-0 py-0 translate-middle-y" 
        onClick={() => scroll("left")}
        style={{ zIndex: 1 }}
      >
        &#8249;
      </button>

      <div 
        className="d-flex gap-2 mx-4" 
        ref={scrollRef} 
        style={{ overflowX: "hidden", whiteSpace: "nowrap", scrollBehavior: "smooth" }}
      >
        {categories.length > 0 ? (
          categories.map(({ slug, name }) => (
            <div className="d-inline-block" key={slug}>
              <Link to={`/category/${slug}/`} className="text-decoration-none">
                <span className="px-3 py-2 text-black">
                  {name}
                </span>
              </Link>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      <button 
        className="btn btn-light position-absolute top-50 end-0 py-0 translate-middle-y" 
        onClick={() => scroll("right")}
        style={{ zIndex: 1 }}
      >
        &#8250;
      </button>
    </div>
  );
}

export default CategoryCard;
