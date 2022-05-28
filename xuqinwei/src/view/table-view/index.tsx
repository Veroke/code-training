import SimpleTable from '@/components/simpleTable';
import SimpleColumn from '@/components/simpleColumn'
import { defineComponent, ref } from "vue";
import { ListItemType } from "@/types/table";
import { PaginationProps } from "@/types/pagination";
import axios from 'axios'

/*
*   table组件的简单使用
*
*/
export default defineComponent({
  name: 'TableView',
  components: {
    SimpleTable,
    SimpleColumn
  },

  setup() {
    let current = ref<Number>()
    let dataSource = ref<ListItemType[]>([])
    let pagination = ref<PaginationProps>({})

    function getList(cur: number = 1) {
      current.value = cur
      axios.post('/user/list', {
        current: cur
      }
      ).then(({ data }) => {
        console.log('dada', data);

        dataSource.value = data.list
        pagination.value = {
          total: data.total,
          pageSize: data.pageSize,
          current: data.current,
        }
      }).catch(() => {
        console.trace('信息获取失败')
      })
    }

    getList()
    return () => {
      return (
        <simple-table data={dataSource.value}
          pagination={pagination.value}
          onChange={getList} >
          <simple-column prop="name" label="姓名" />
          <simple-column prop="sex" label="性别" />
          <simple-column prop="age" label="年龄" />
          <simple-column prop="address" label="地址" />
        </simple-table>
      )
    }
  }
})