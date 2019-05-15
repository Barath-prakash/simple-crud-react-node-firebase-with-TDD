import Loadable from 'react-loadable';
import Loading from 'components/common/Loader';
  
const EmloyeePageRoute = Loadable({
    loader: () => import('./EmployeePage'),
    loading: Loading
});

export default EmloyeePageRoute;