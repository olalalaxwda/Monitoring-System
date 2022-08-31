import React, {useCallback, useEffect, useState} from 'react'
import './index.less';
import {List, Skeleton, Divider} from 'antd'
import {EyeOutlined, LikeOutlined, MessageOutlined, } from '@ant-design/icons';
import datasource from '../../datasource.json'


const Articles = () => {

  const initListOptions = {loading: false, dataSource: []};
  const [listOptions, setListOptions] = useState(initListOptions);
  

  const getData = useCallback(async () => {
    setListOptions(v => ({...v, loading: true}));
    setTimeout(() => {
        setListOptions(v => ({
            ...v,
            loading: false,
            dataSource: datasource.articles
        }));
      }, 1000);
    }, []);

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <div className='articles'>
      <main className="articles-wrap">
      {
        listOptions.loading
          ? <Skeleton active className='list-item' />
          : <List itemLayout="vertical"
              size="large"
              dataSource={listOptions.dataSource}
              renderItem={item => (
                  <List.Item className='list-item'
                              key={item.key}>
                      <section className='title-wrap'>
                          {/* 列表的头部 */}
                          <header className="list-item-header-wrap">
                              <section className="list-item-header-wrap-item user">{item.id}</section>
                              <Divider className='list-item-header-wrap-item-divider' type="vertical"/>
                              <section className="list-item-header-wrap-item time">{item.time}</section>
                              <Divider className='list-item-header-wrap-item-divider' type="vertical"/>
                              <section className="list-item-header-wrap-item tag">{item.tag}</section>
                          </header>
                          {/* 列表的标题 */}
                          <section className="list-item-title">
                          <span>
                              {item.title}
                          </span>
                          </section>
                          {/* 列表的概览 */}
                          <section className="list-item-overview">
                          <span>
                              {item.overview}
                          </span>
                          </section>



                          {/* 列表的操作 */}
                          <section className="list-item-action-wrap">
                              <div className="item view">
                                  <EyeOutlined className='list-item-action-wrap-icon'/>
                                  <span>{item.viewNums}</span>
                              </div>
                              <div className="item like">
                                  <LikeOutlined className='list-item-action-wrap-icon'/>
                                  <span>{item.likeNums}</span>
                              </div>
                              <div className="item comment">
                                  <MessageOutlined className='list-item-action-wrap-icon'/>
                                  <span>{item.commentNums}</span>
                              </div>     
                          </section>
                      </section>
                      {item.imageUrl &&
                      <section className="image-wrap" style={{backgroundImage: `url(${item.imageUrl})`}} />}
                  </List.Item>
    )} />
  }                
                                    
                    
      </main>
        
    </div>
  )
}

export default Articles