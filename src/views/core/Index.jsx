import { useEffect } from "react";
import PaginationPost from "../../components/card/paginationPost";
import PostList from "../../components/card/postList";
import CategoryCard from "../../components/card/categoryCard";
import usePostStore from "../../store/usePostStore";
import { useCategories } from "../../hooks/post/useCategories";
import { usePopularPosts } from "../../hooks/post/usePopularPosts";
import { usePosts } from "../../hooks/post/usePosts";

function Index() {
  const { currentPagePosts, setCurrentPagePosts, totalPagesPosts } = usePostStore();

  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: popularPosts = [], isLoading: isPopularPostsLoading } = usePopularPosts();
  const { data: posts = [], isLoading: isPostsLoading } = usePosts(currentPagePosts);

  const isLoading = isCategoriesLoading || isPopularPostsLoading || isPostsLoading;

  useEffect(() => {
    setCurrentPagePosts(1);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="mb-5 text-center">
          <h1 style={{ letterSpacing: '-2px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Blogers</h1>
        </div>
      </div>
      <section className="my-2">
        <div className="container col-10" style={{ borderBottom: "1px solid rgba(0,0,0,.10)" }}>
          <CategoryCard categories={categories} />
        </div>
      </section>
      <section className="container mt-5">
        <div className="section-title">
          <h2><span>Artículos más populares</span></h2>
        </div>
        <PostList posts={popularPosts} isLoading={isLoading} />
      </section>
      <section className="container mt-5">
        <div className="section-title">
          <h2><span>Todos los Artículos</span></h2>
        </div>
        <div>
          <PostList posts={posts} isLoading={isLoading} />
          <PaginationPost totalPages={totalPagesPosts} currentPage={currentPagePosts} setCurrentPage={setCurrentPagePosts} />
        </div>
      </section>
    </div>
  );
}

export default Index;
