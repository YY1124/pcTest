// Container
import PageContainer from './Container/PageContainer'
import TableContainer from './Container/TableContainer'
import TableHeader from './Container/TableHeader'
import FormContainer from './Container/FormContainer'

// RichEditor
import RichEditor from './RichEditor/RichEditor'
import RichContent from './RichEditor/RichContent'

// Search
import KeywordSearch from './Search/KeywordSearch'

// Map
import { selectLocation } from './Map/dialog'

// OrgTree
import OrgTree from './OrgTree/OrgSelector.vue'
import RemoteTree from './RemoteTree/Index.vue'
import OrgSelect from './Org/OrgSelect.vue'

// FileUpload
import FileUpload from './Upload/FileUpload'
import ImageUpload from './Upload/ImageUpload'

// VideoUpload
import VideoUpload from './Upload/VideoUpload'

// List
import { selectList } from './List/dialog'

// AreaSelect
import AreaSelect from './Area/AreaSelector'

export default {
  install: Vue => {
    // Container
    Vue.component('X-PageContainer', PageContainer)
    Vue.component('X-TableContainer', TableContainer)
    Vue.component('X-TableHeader', TableHeader)
    Vue.component('X-FormContainer', FormContainer)

    //RichEditor
    Vue.component('X-RichEditor', RichEditor)
    Vue.component('X-RichContent', RichContent)

    // Search
    Vue.component('X-KeywordSearch', KeywordSearch)

    // Map
    Vue.prototype.$selectLocation = selectLocation

    // OrgTree
    Vue.component('OrgTree', OrgTree)
    Vue.component('X-RemoteTree', RemoteTree)
    Vue.component('X-OrgSelect', OrgSelect)

    // FileUpload
    Vue.component('X-FileUpload', FileUpload)
    Vue.component('X-ImageUpload', ImageUpload)

    // VideoUpload
    Vue.component('X-VideoUpload', VideoUpload)

    // List
    Vue.prototype.$selectList = selectList

    // AreaSelect
    Vue.component('X-AreaSelect', AreaSelect)
  },
}
