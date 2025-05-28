import { HiOutlineHome, HiOutlineUserCircle } from 'react-icons/hi'
import { MdOutlineLeaderboard, MdOutlineQuiz } from 'react-icons/md'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { BsLightning } from 'react-icons/bs'

const sidebarNavItems = [
  {
    title: 'Lessons',
    path: '/lessons',
    icon: <HiOutlineHome className="sidebar-btn-icon" />,
  },
  {
    title: 'Practice',
    path: '/practice',
    icon: <BsLightning className="sidebar-btn-icon" />,
  },
  {
    title: 'Quiz',
    path: '/quiz',
    icon: <MdOutlineQuiz className="sidebar-btn-icon" />,
  },
  {
    title: 'Leaderboards',
    path: '/leaderboards',
    icon: <MdOutlineLeaderboard className="sidebar-btn-icon" />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <HiOutlineUserCircle className="sidebar-btn-icon" />,
  },
]

const socialLinks = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/your-profile',
    icon: <FaTwitter className="social-link" />,
  },
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/your-profile',
    icon: <FaLinkedin className="social-link" />,
  },
  {
    title: 'Facebook',
    url: 'https://facebook.com/your-page',
    icon: <FaFacebook className="social-link" />,
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com/your-profile',
    icon: <FaInstagram className="social-link" />,
  },
]

export { sidebarNavItems, socialLinks }
