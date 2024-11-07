import {StatCard} from "./statCard";

export const StatsSection = ({ stats }) => (
    <section className="row g-4 mb-4">
      <StatCard  title="Total Views" value={stats.views} icon="fa-solid fa-users" color="success" />
      <StatCard title="Total Posts" value={stats.posts} icon="fa-solid fa-newspaper" color="secondary" />
      <StatCard title="Total Likes" value={stats.likes} icon="fa-solid fa-thumbs-up" color="primary" />
      <StatCard title="Total Bookmarks" value={stats.bookmarks} icon="bi bi-suit-heart-fill " color="danger" />
    </section>
  );
