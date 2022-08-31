import React from 'react';
import { Divider, Space} from 'antd'
import Articles from '../Articles';
import './index.less';
import SideBar from '../SideBar';

const ArticlesMain = () => {

  let catagory = ["推荐", "最新", "热榜"];
  const [catagoryIndex, setCategoryIndex] = React.useState(0);

  let catagoryClick = (index) => {
    return () => {
      setCategoryIndex(index)
    }
  }

  return (
 
      <div className='articles-container'>
        
          <header className='articles-header'>
              <Space className='articles-category-container' split={<Divider className='ant-header-divider' type="vertical" />}>
              {
                catagory.map((item, index) => {
                return <div key={index}><a className={catagoryIndex == index ? "a-click" : ""} onClick={catagoryClick(index)}>{item}</a></div>
                })
              }

              </Space>
          </header>
          <Divider className='ant-h-a-divider'/>
          <Articles/>
          
      </div>
      
  )
}

export default ArticlesMain