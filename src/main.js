import { createApp } from 'vue'
import './style2.css'
import App from './App.vue'
import router from '@/router'
import 'lib-flexible/flexible'
import 'vant/es/toast/style'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

import {
    ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay,
    Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup,
    Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button,
    Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, Tabbar, TabbarItem,
    SubmitBar, Toast, Skeleton, GridItem, Grid, Col, Row, Sidebar, SidebarItem,
} from 'vant'


const app = createApp(App)

// 注册路由
app.use(router)
app.use(ElementPlus)
app.use(createPinia())

app.use(ActionBarButton)
    .use(ActionBarIcon)
    .use(ActionBar)
    .use(Divider)
    .use(Popup)
    .use(Overlay)
    .use(Loading)
    .use(Dialog)
    .use(Toast)
    .use(ContactCard)
    .use(Form)
    .use(AddressEdit)
    .use(AddressList)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(SwipeCell)
    .use(Icon)
    .use(Stepper)
    .use(Card)
    .use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(List)
    .use(Tab)
    .use(Tabs)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Skeleton)
    .use(Grid)
    .use(GridItem)
    .use(Col)
    .use(Row)
    .use(SidebarItem)
    .use(Sidebar)
    .use(Tabbar)
    .use(TabbarItem)


app.mount('#app')
