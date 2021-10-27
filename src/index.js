// import axios
import axios from "axios";
import VueRouter from "vue-router";
import mixins from "./js/mixins/mixins";


/* ================= Element UI =================== */
import './scss/element-variables.scss'
import { Button, Select, DatePicker } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/vi'
import locale from 'element-ui/lib/locale'
// language
locale.use(lang)
// global config
Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };
Vue.use(Button)
Vue.use(Select)
Vue.use(DatePicker)

/* ================= Element UI End =================== */

// load scss
import './scss/style.scss';

// axios
Vue.prototype.$http = axios;

axios.interceptors.request.use(request => {
    if(request.method == "get" || request.method == "GET") {
        // startLoading();
    }
    return request
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    // endLoading();
    return response
}, err => {
    // endLoading();
    return Promise.reject(err);
});


// filters
// Vue.filter("numberFormat", function(string) {
//     if (string == null) return 0;
//     var val = new Intl.NumberFormat("en-US", {
//         style: "decimal"
//     }).format(string.toString());
//     return val != "NaN" ? val : 0;
// });

window.mixins = mixins;
window.EventHub = new Vue();

// vue options
const vueOptions = {
    el: "#main",
    data: {
        // user: {
        //     walkthrough: null
        // },
        // signupContext: "signup"
    },
    components: {
        HelloWorld: () => import("./js/components/helloworld.vue"),
    },
    beforeCreate() {
    }
};

if (document.querySelector(".vue-routes")) {
    window.router = new VueRouter({
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 };
        }
    });
    vueOptions["router"] = router;
}

window.Dididi = new Vue(vueOptions);
