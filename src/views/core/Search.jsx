import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostList from "../../components/card/postList";
import PaginationPost from "../../components/card/paginationPost";
import usePostStore from "../../store/usePostStore";
import { useSearchPosts } from "../../hooks/post/useSearchPosts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get('query');
  const { currentPageSearch, setCurrentPageSearch, totalPagesSearch } = usePostStore();

  const { data: searchResults = [], isLoading } = useSearchPosts(query, currentPageSearch);

  useEffect(() => {
    if (query) {
      setCurrentPageSearch(1);
    }
  }, [query]);

  return (
    <>
      <section className="p-0">
        <div className="container">
          <h2 className="text-start d-block mt-1">
            Resultados para "{query}"
          </h2>
        </div>
      </section>
      <section className="container mt-5">
        {searchResults.length > 0 ? (
          <>
            <PostList posts={searchResults} isLoading={isLoading} />
            <PaginationPost
              totalPages={totalPagesSearch}
              currentPage={currentPageSearch}
              setCurrentPage={setCurrentPageSearch}
            />
          </>
        ) : (
          <div>No results found</div>
        )}
      </section>
    </>
  );
}

export default Search;
