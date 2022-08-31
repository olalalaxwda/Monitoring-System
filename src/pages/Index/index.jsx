import NavHeader from '../../components/NavHeader';
import NavList from '../../components/NavList';
import SideBar from '../../components/SideBar';
import ArticlesMain from '../../components/ArticlesMain';
import Monitoring from "../../components/Monitoring"
import './index.less';

export default function index() {
  // 未捕获reject示例
  // new Promise((_,reject)=> reject("888"))
  
  return (
    <div>
      
      {/* 资源加载错误示例 */}
      {/* <img src="dasd.png" className='dw' alt="" /> */}


      <NavHeader></NavHeader>
      <NavList></NavList>
      <div className='content-main'>
        <ArticlesMain />
        <SideBar></SideBar>
      </div>
      <Monitoring></Monitoring>
    </div>
  );
}
