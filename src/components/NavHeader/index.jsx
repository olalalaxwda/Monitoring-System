import React from 'react'
import "./index.less"
import { BellFilled } from '@ant-design/icons';
export default function Index() {
  let navHeaderList = ["首页", "沸点", "课程", "直播", "活动", "商城", "APP", "插件"];

  const [navHeaderListIndex, setnavHeaderListIndex] = React.useState(0);

  let navHeaderListClick = (index) => {
    return () => {
      setnavHeaderListIndex(index)
    }
  }
  const searchNode = React.useRef()



  return (
    <div className='nav-header'>
      <div className='nav-header-container'>
        <div className='nav-header-container-left'>
          <a href="">
            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt="" />
          </a>
          {
            navHeaderList.map((item, index) => {
              return <div key={index}><a className={navHeaderListIndex == index ? "a-click" : ""} onClick={navHeaderListClick(index)}>{item}</a></div>
            })
          }

        </div>
        <div className='nav-header-container-right'>
          <div>
            <div className='search' ref={searchNode}>
              <input type="text" placeholder='稀土掘金' onFocus={() => searchNode.current.classList.add("search-focus")} onBlur={() => searchNode.current.classList.remove("search-focus")} />
              <div>
                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/1e8ab9a22f0ddc36349f60b38900d0bd.svg" alt="" />
              </div>
            </div>
            <div className='framer'>
              <div>
                创作者中心
              </div>
              <div>
                <div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/24127194d5b158d7eaf8f09a256c5d01.svg" alt="" />
              <span>会员</span>
            </div>
            <div>
            <BellFilled className="my-bellFilled" />
            </div>
            <div>
              <img src="https://p3-passport.byteacctimg.com/img/user-avatar/4785d175e153e9f6098b14c2387f088c~300x300.image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
