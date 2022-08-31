import React from 'react'
import "./index.less"
export default function Index() {
    const [listClick, setListClick] = React.useState(0);


    let navList = ["综合",
        "关注",
        "后端",
        "前端",
        "Android",
        "iOS",
        "人工智能",
        "开发工具",
        "代码人生",
        "阅读"]
    return (
        <div className='nav-list'>
            <div className='nav-list-container'>
                <div>
                    {navList.map((item, index) => {
                        return <a className={listClick == index ? "a-click" : ""} key={index} onClick={() => { setListClick(index) }}>{item}</a>
                    })}
                </div>
                <div><a className={listClick == -1 ? "a-click" : ""} onClick={() => { setListClick(-1) }}>标签管理</a></div>
            </div>
        </div>
    )
}
