
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast';
import { PostsSection } from '../../components/dashboard/post/postsSection';
import { CommentsSection } from '../../components/dashboard/comment/commentsSection';
import { NotificationsSection } from '../../components/dashboard/notification/notificationsSection';
import { StatsSection } from '../../components/dashboard/stat/statsSection';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const userId = useUserData()?.user_id;

  const fetchDashboardData = async () => {
    try {
      const statsRes = await apiInstance.get(`author/dashboard/stats/${userId}/`);
      const postsRes = await apiInstance.get(`author/dashboard/post-list/${userId}/`);
      const commentsRes = await apiInstance.get('author/dashboard/comment-list/');
      const notificationsRes = await apiInstance.get(`author/dashboard/noti-list/${userId}/`);

      setStats(statsRes.data[0]);
      setPosts(postsRes.data);
      setComments(commentsRes.data);
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Toast('error', 'Failed to load data', '');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleMarkNotificationAsSeen = async (notificationId) => {
    try {
      const response = await apiInstance.post('author/dashboard/noti-mark-seen/', { noti_id: notificationId });
      console.log(response.data);
      fetchDashboardData();
      Toast('success', 'Notification seen', '');
    } catch (error) {
      console.error('Error marking notification as seen:', error);
      Toast('error', 'Failed to mark notification as seen', '');
    }
  }

  return (
    <>
      <main className="py-4">
        <div className="container">
          <h1 className="mb-4">Dashboard</h1>

          {/* Stats Section */}
          <StatsSection stats={stats} /> 

          {/* Posts Section */}
          <PostsSection posts={posts} />

          {/* Comments Section */}
          <CommentsSection comments={comments} />

          {/* Notifications Section */}
          {/* <NotificationsSection notifications={notifications} handleMarkNotificationAsSeen={handleMarkNotificationAsSeen} /> */}

          {/* Blog Posts Table */}
          {/* <BlogPostsTable posts={posts} /> */}
        </div>
      </main>
    </>
  );
};




export default Dashboard;