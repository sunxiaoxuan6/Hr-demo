import Vue from 'vue'

// 导入element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button, Form, FormItem, Input, Checkbox,
  // 导入弹框提示组件
  Message,
  Container, Header, Aside, Main,
  Dropdown, DropdownMenu, DropdownItem, MessageBox,
  Menu, Submenu, MenuItem,
  Breadcrumb, BreadcrumbItem,
  Tabs,TabPane,
  Table,TableColumn,Dialog,Tag,
  Select,Option,
  Radio,RadioGroup,Popover,Tree,DatePicker,
  Switch,
  Collapse,CollapseItem,Card,
  Steps,Step,Loading,Image,Pagination,Upload
} from 'element-ui'

Vue.use(Loading)
Vue.use(Upload)
Vue.use(Image)
Vue.use(Pagination)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Card)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Tree)
Vue.use(Popover)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

// 把Messag挂载到Vue的原型对象上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm