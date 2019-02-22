import './config';
import Home from './routes/Home';
import Show from './routes/Show';
import rem from '@utils/rem';
rem(1440, 1920);
const acanalRouter = [
  {
    path: 'index',
    component: Home,
  },
  {
    path: 'show',
    component: Show,
  },
];

export default acanalRouter;
