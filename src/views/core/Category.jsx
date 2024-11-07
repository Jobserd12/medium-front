import { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePostStore from "../../store/usePostStore";
import PostList from "../../components/card/postList";
import PaginationPost from "../../components/card/paginationPost";
import CategoryCard from "../../components/card/categoryCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCategories } from "../../hooks/useCategories";
import { usePostsByCategory } from "../../hooks/usePostsByCategory";

function Category() {
  const { slug } = useParams();
  const { totalPagesCategory, currentPageCategory, setCurrentPageCategory } = usePostStore();

  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: postsByCategory = [], isLoading: isPostsByCategoryLoading } = usePostsByCategory(slug, currentPageCategory);

  const isLoading = isCategoriesLoading || isPostsByCategoryLoading;

  useEffect(() => {
    setCurrentPageCategory(1);
  }, [slug]);

  return (
    <>
      <div className="container">
        <div className="mb-5 text-center">
          <h1 style={{ textTransform: "capitalize", letterSpacing: '-2px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
            {isLoading ? (
              <Skeleton width={500} />
            ) : (
              <>
                {slug.replace(/-/g, ' ')}  
                <span style={{ letterSpacing: '0', fontSize: '1rem', marginLeft: '10px' }}>
                  ({postsByCategory.length} Articles)
                </span>
              </>
            )}
          </h1>
        </div>
      </div>

      <section className="my-2">
        <div className="container col-10" style={{ borderBottom: "1px solid rgba(0,0,0,.10)" }}>
          <CategoryCard categories={categories} />
        </div>
      </section>

      <section className="container mt-5">
        <PostList posts={postsByCategory} isLoading={isLoading} />
        <PaginationPost totalPages={totalPagesCategory} currentPage={currentPageCategory} setCurrentPage={setCurrentPageCategory} />
      </section>
    </>
  );
}

export default Category;
