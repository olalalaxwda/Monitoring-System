import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import "./index.less"
export default function Index() {
    //  js同步异常
    let jsSE = () => {
        console.log("js同步异常")
        let nm = Math.ceil(Math.random() * 5);
        switch (nm) {
            case 0:
                eval(`console.log(a);`);
                break;
            case 1:
                eval(`console.log(b);`);
                break;
            case 2:
                eval(`console.log(c);`);
                break;
            case 3:
                eval(`console.log(d);`);
                break;
            case 4:
                eval(`console.log(e);`);
                break;

        }

    }


    //  js异步异常
    let jsAE = () => {

        setTimeout(() => {
            console.log("js异步异常")
            let nm = Math.ceil(Math.random() * 5);
            switch (nm) {
                case 0:
                    eval(`console.log(a1);`);
                    break;
                case 1:
                    eval(`console.log(b1);`);
                    break;
                case 2:
                    eval(`console.log(c1);`);
                    break;
                case 3:
                    eval(`console.log(d1);`);
                    break;
                case 4:
                    eval(`console.log(e1);`);
                    break;

            }
        }, 100);

    }

    // api请求失败
    let apiFailed = () => {
        axios.get("https://www.baiddasdasu.com/")
    }

    // api请求成功
    let apiSucceeds = () => {
        axios.get("https://4.ipw.cn/")
    }

    // 资源加载错误    
    const [resourceState, setResourceState] = useState(false)
    console.log(resourceState)
    let resourceError = () => {
        setResourceState(!resourceState)
    }

    // 未捕获reject错误
    let notCatchReject = () => {
        new Promise((resolve, reject) => {
            reject("415")
        })
    }



    return (
        <div className='monitoring'>
            <div>
                <Button type="primary" onClick={jsSE}>js同步异常</Button>
            </div>
            <div>
                <Button type="primary" onClick={jsAE}>js异步异常</Button>
            </div>
            <div>
                <Button type="primary" onClick={apiFailed}>api请求失败</Button>
            </div>
            <div>
                <Button type="primary" onClick={apiSucceeds}>api请求成功</Button>
            </div>
            <div>
                <Button type="primary" onClick={resourceError}>资源加载错误</Button>
            </div>
            <div>
                <Button type="primary" onClick={notCatchReject}>未捕获reject错误</Button>
            </div>
            {
                resourceState ? <img className="rse" src='https://p9-juejin.bcom/tos-cn-i-k3u1fbpfcp/10ab6c57bb104e6592e48cc0e7f1e49b~tplv-k3u1fbpfcp-no-mark:720:720:720:480.awebp?'></img>
                    : ""
            }
        </div>
    )
}
