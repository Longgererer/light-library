import {
  Button,
  FormModel,
  Form,
  Input,
  Radio,
  Select,
  Skeleton,
  Icon,
  Modal,
  Pagination,
  message,
  Table,
  Tabs,
  Badge,
  Divider,
  DatePicker,
  Checkbox,
  Spin
} from 'ant-design-vue'

const antd = {
  install(Vue) {
    Vue.prototype.$message = message
    Vue.prototype.$confirm = Modal.confirm
    Vue.prototype.$warning = Modal.warning
    Vue.use(Button)
    Vue.use(FormModel)
    Vue.use(Form)
    Vue.use(Input)
    Vue.use(Radio)
    Vue.use(Select)
    Vue.use(Skeleton)
    Vue.use(Icon)
    Vue.use(Pagination)
    Vue.use(Table)
    Vue.use(Tabs)
    Vue.use(Badge)
    Vue.use(Divider)
    Vue.use(DatePicker)
    Vue.use(Checkbox)
    Vue.use(Spin)
    Vue.component(Modal.name, Modal)
  },
}

export default antd
