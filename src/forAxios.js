import axios from "axios";
const ax = axios.create();
const axApi = axios.create();

function sendMonitoring(ob, address) {
    ax.post(apiMonitoring + "/" + address, { ...ob, stateAr: getState() }).then((succeed) => {
        console.log(succeed)
    }, (fail) => {
        console.log(fail)
    })
}
axApi.interceptors.response.use(
    // 2xx 范围内的状态码都会触发该函数，请求正常
    function (response) {
        console.log(response)
        let succeed = {
            status: response.status + "",
            url: response.config.url
        }
        sendMonitoring(succeed, "apisucceed")
        console.log(succeed)
        return response;
    },
    // 超出 2xx 范围的状态码都会触发该函数，请求异常(失败)
    function (error) {
        console.log(error)
        let er = {

            code: error.code, // 请求异常状态
            message: error.message, // 请求异常信息
            url: error.config.url // 请求异常url
        }
        sendMonitoring(er, "apifailed")
        console.log(er)
        return error
    });


export { ax, axApi }