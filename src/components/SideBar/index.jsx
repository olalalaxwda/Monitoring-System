import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './index.less';
import getTimeState from '../../utils/getTimeState';


function SideBar() {
  const timeStates = ['早上好', '下午好', '晚上好'];
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    const timeState = timeStates[getTimeState()];
    setGreeting(timeState);
  }, []);

  return (
    <div className='side-box'>
      <div className='side-block side-tips'>
        <div className='first-line'>
          <div className='icon-text'>
            <span>
              <CalendarOutlined />
            </span>
            <span className='greeting'>{ greeting }</span>
          </div>
          <Button type='primary' shape='round'>
            去签到
          </Button>
        </div>
        <div className='second-line'>点亮你在社区的每一天</div>
      </div>
      <div className='side-block side-ads'>
        <img
          src='https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d76f050f2f6d48f8890e4036ac4fdfb2~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?'
          alt='广告'
        />
      </div>
      <div className='side-block side-ads'>
        <img
          src='https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d76f050f2f6d48f8890e4036ac4fdfb2~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?'
          alt='广告'
        />
      </div>
      <div className='side-block side-app-download'>
        <img
          src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png'
          alt=''
        />
        <div className='content-box'>
          <div className='headline'>下载稀土掘金APP</div>
          <div className='desc'>一个帮助开发者成长的社区</div>
        </div>
      </div>
      <div className='side-block side-recommend-auther-block'>
        <header className='user-block-header'>作者榜</header>
        <div className='user-list'>
          <div className='item'>
            <img
              src='https://p6-passport.byteacctimg.com/img/user-avatar/6e8c293f951b44ce73ce7906de82686d~300x300.image'
              alt=''
            />
            <div className='user-info'>
              <a href=''>阿里云云原生</a>
              <div className='user-desc'>阿里云云原生公众号 @ 阿里巴巴集团</div>
            </div>
          </div>
          <div className='item'>
            <img
              src='https://p6-passport.byteacctimg.com/img/user-avatar/71175455eb2ef6f4f67065569e6304dc~300x300.image'
              alt=''
            />
            <div className='user-info'>
              <a href=''>程序员小鹿</a>
              <div className='user-desc'>
                🏆 掘金签约作者 @ 公众号：小鹿动画学编程
              </div>
            </div>
          </div>
          <div className='item'>
            <img
              src='https://p6-passport.byteacctimg.com/img/user-avatar/ddd95876f23c6e8ab56cab355f78a059~300x300.image'
              alt=''
            />
            <div className='user-info'>
              <a href=''>ShowMeAI</a>
              <div className='user-desc'>资深算法专家</div>
            </div>
          </div>
        </div>
        <div className='more'>
          <a href=''>完整榜单</a>
        </div>
      </div>
      <div className='side-block side-link-block'>
        <div className='link-item'>
          <img
            src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-tutu.d58819c.png'
            alt=''
          />{' '}
          稀土掘金漫游指南
        </div>
        <div className='link-item'>
          <img
            src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-extension-icon.4b79fb4.png'
            alt=''
          />{' '}
          安装掘金浏览器插件
        </div>
        <div className='link-item'>
          <img
            src='//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-miner.b78347c.png'
            alt=''
          />{' '}
          前往掘金翻译计划
        </div>
      </div>
      <div className='side-block aside-footer'></div>
    </div>
  );
}

export default SideBar;
