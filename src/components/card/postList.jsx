import PostCard from './postCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PostList({ posts, isLoading }) {

    return (
        <div className="row">
            {isLoading ? (
                Array(6).fill(0).map((_, index) => (
                    <div key={index} className="col-sm-6 col-lg-4 mb-4">
                        <div className="card shadow post-card user-select-auto">
                            <div className="card-header p-0 border-0">
                                <Skeleton height={200} />
                            </div>
                            <div className="card-body p-3 max-h-md">
                                <h5 className="card-title"><Skeleton width={150} /></h5>
                                <p className="small text-muted"><Skeleton count={3} /></p>
                            </div>
                            <div className="card-footer mt-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-2">
                                        <Skeleton circle={true} width={30} height={30} />
                                        <div className="d-flex flex-column">
                                            <small><Skeleton width={100} /></small>
                                            <small><Skeleton width={80} /></small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Skeleton width={30} height={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                posts?.map((post, index) => (
                    <PostCard post={post}/>
                ))
            )}
        </div>
    );
}

export default PostList;
